/* Side-effect-free catalog, lifecycle, and value rules shared with tests. */
(function (root) {
  const key = (id) => String(id);
  const STATUS = Object.freeze({
    REQUESTED: "requested",
    PENDING: "pending",
    WITHDRAWN: "withdrawn",
  });
  const isActive = (record) => !!record && record.status !== STATUS.WITHDRAWN;
  function normalizeState(value) {
    const v = value && typeof value === "object" ? value : {};
    const records = (name) => (Array.isArray(v[name]) ? v[name] : []);
    return {
      ...v,
      ...(["claims", "listings", "saved"].some(
        (name) =>
          Array.isArray(v[name]) &&
          v[name].some((record) =>
            name === "claims"
              ? !(
                  record &&
                  typeof record === "object" &&
                  record.id != null &&
                  record.asset != null
                )
              : name === "listings"
                ? !(
                    record &&
                    record.id != null &&
                    typeof record.title === "string" &&
                    typeof record.school === "string"
                  )
                : !(typeof record === "string" || typeof record === "number"),
          ),
      )
        ? {
            unrecognizedRecords: {
              ...v.unrecognizedRecords,
              ...Object.fromEntries(
                ["claims", "listings", "saved"]
                  .filter((name) => Array.isArray(v[name]))
                  .map((name) => [name, v[name]]),
              ),
            },
          }
        : {}),
      claims: records("claims")
        .filter(
          (c) => c && typeof c === "object" && c.id != null && c.asset != null,
        )
        .map((c) => ({
          ...c,
          status: Object.values(STATUS).includes(c.status)
            ? c.status
            : c.type === "swap"
              ? STATUS.PENDING
              : STATUS.REQUESTED,
        })),
      saved: records("saved").filter(
        (id) => typeof id === "string" || typeof id === "number",
      ),
      listings: records("listings")
        .filter(
          (a) =>
            a &&
            a.id != null &&
            typeof a.title === "string" &&
            typeof a.school === "string",
        )
        .map((a) => ({
          ...a,
          image:
            typeof a.image === "string"
              ? a.image
              : "assets/resource-fallback.svg",
          qty: String(a.qty || "Quantity unspecified"),
          local: true,
        })),
      read: !!v.read,
      started: v.started || Date.now(),
    };
  }
  function requestFor(state, id) {
    return state.claims.find((c) => key(c.asset) === key(id) && isActive(c));
  }
  function catalog(seed, state) {
    return [...state.listings, ...seed].filter((a) => !a.archived);
  }
  function searchCorrection(query, assets) {
    const normalize = s => s.toLowerCase().replace(/white\s+boards?/g, "whiteboard").replace(/[^a-z0-9 ]/g, " ").trim();
    const words = [...new Set(assets.flatMap(a => normalize(`${a.title} ${a.school} ${a.qty}`).split(/\s+/)))];
    const distance = (a,b) => { let row = Array.from({length:b.length+1},(_,i)=>i); for(let i=1;i<=a.length;i++){let next=[i];for(let j=1;j<=b.length;j++) next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return row[b.length]; };
    return normalize(query).split(/\s+/).map(w => {
      if(w.length<5 || words.includes(w) || words.includes(w.replace(/s$/, ""))) return w;
      const candidates = words.filter(t=>t.length>=5 && t[0]===w[0]).map(t=>[t,distance(w,t)]).sort((a,b)=>a[1]-b[1]);
      return candidates[0]?.[1]<=1 ? candidates[0][0] : w;
    }).join(" ");
  }
  function recommendations(assets, preferences = {}) {
    const {grade, subject, category} = preferences;
    if (!grade || !subject || !category) return [];
    return assets.filter(a => !a.archived && !a.swap &&
      (category === "any" || a.cat === Number(category)) &&
      (subject === "any" || (subject === "art" ? /\b(art|arts|music)\b/i.test(`${a.department || ""} ${a.title}`) : `${a.department || ""} ${a.title}`.toLowerCase().includes(subject))) &&
      (grade === "any" || a.school.includes(grade))).slice(0,3);
  }
  function selectResources(assets, state, filters = {}) {
    const q = filters.literal ? (filters.query || "").trim().toLowerCase() : searchCorrection(filters.query || "", assets);
    return assets
      .filter(
        (a) =>
          !a.archived &&
          (!filters.category || a.cat === Number(filters.category)) &&
          (!q ||
            `${a.title} ${a.school} ${a.qty} ${a.department || ""} ${a.notes || ""}`
              .toLowerCase()
              .replace(/white\s+boards?/g, "whiteboard").includes(q.replace(/s$/, ""))) &&
          (!filters.school || a.school === filters.school) &&
          (!filters.condition || a.condition === filters.condition) &&
          (!filters.method ||
            (filters.method === "pickup" ? a.selfPickup : !a.selfPickup)) &&
          (!filters.kind || (filters.kind === "swap" ? a.swap : !a.swap)) &&
          (!filters.available || !requestFor(state, a.id)),
      )
      .sort((a, b) =>
        filters.sort === "value"
          ? b.value - a.value
          : filters.sort === "name"
            ? a.title.localeCompare(b.title)
            : (b.createdAt || 0) - (a.createdAt || 0),
      );
  }
  function paginate(assets, page, size = 8) {
    const pages = Math.max(1, Math.ceil(assets.length / size));
    const current = Math.min(Math.max(1, Math.trunc(Number(page)) || 1), pages);
    return {
      page: current,
      pages,
      total: assets.length,
      first: (current - 1) * size,
      items: assets.slice((current - 1) * size, current * size),
    };
  }
  function validateRequest(asset, data, state, schools, editingId) {
    if (!asset || asset.archived)
      return "This resource is unavailable. Restore archived listings before requesting.";
    if (
      state.claims.some(
        (c) =>
          isActive(c) && key(c.asset) === key(asset.id) && c.id !== editingId,
      )
    )
      return "You already have a request for this resource. Open Your Items to review it.";
    if (
      !data.name?.trim() ||
      !data.department?.trim() ||
      !/^\S+@\S+\.\S+$/.test(data.email || "")
    )
      return "Enter your name, department, and a valid email address.";
    if (!schools.includes(data.campus) || !data.room?.trim())
      return "Choose a destination school and enter the room.";
    if (!["Cluster courier", "Self-pickup"].includes(data.method))
      return "Choose a transfer method.";
    if (asset.selfPickup && data.method !== "Self-pickup")
      return "This bulky resource requires self-pickup.";
    if (asset.swap && !data.offer?.trim())
      return "Describe the resource you would offer in exchange.";
    return "";
  }
  function createRequest(asset, data, state, schools, id, date) {
    const error = validateRequest(asset, data, state, schools);
    if (error) throw new Error(error);
    return {
      ...data,
      name: data.name.trim(),
      room: data.room.trim(),
      id: "CS-" + id,
      trackingHash: id,
      asset: asset.id,
      type: asset.swap ? "swap" : "claim",
      status: asset.swap ? STATUS.PENDING : STATUS.REQUESTED,
      date,
    };
  }
  function reviseRequest(asset, existing, data, state, schools, date) {
    if (!isActive(existing))
      throw new Error(
        "Withdrawn records cannot be revised. Create a new request.",
      );
    const error = validateRequest(asset, data, state, schools, existing.id);
    if (error) throw new Error(error);
    return {
      ...existing,
      name: data.name.trim(),
      department: data.department,
      email: data.email.trim(),
      campus: data.campus,
      room: data.room.trim(),
      method: data.method,
      offer: data.offer || "",
      date,
      updatedAt: Date.now(),
    };
  }
  function withdrawRequest(state, id) {
    return {
      ...state,
      claims: state.claims.map((c) =>
        c.id === id
          ? { ...c, status: STATUS.WITHDRAWN, updatedAt: Date.now() }
          : c,
      ),
    };
  }
  function requestLabel(c) {
    return !isActive(c)
      ? "Withdrawn"
      : c.type === "swap"
        ? "Swap proposed · pending"
        : "Transfer requested";
  }
  function fallbackImage(category) {
    return `assets/resource-category-${[1,2,3,4].includes(Number(category)) ? Number(category) : 4}.svg`;
  }
  function validPhoto(value) {
    return !value || /^https:\/\//i.test(value) || (value.length <= 500000 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value));
  }
  function browseRecommendations(assets, state, filters = {}) {
    if (["query", "category", "school", "condition", "method", "kind", "available"].some(k => filters[k])) return [];
    return recommendations(assets, state.preferences).filter(a => !a.local && !requestFor(state, a.id));
  }
  function saveListing(state, data, schools, id) {
    const existing = state.listings.find((a) => key(a.id) === key(id)),
      count = Number(data.count),
      unitValue = Number(data.unitValue),
      cat = Number(data.cat);
    if (
      !["title", "unit", "teacher", "room"].every(
        (k) => typeof data[k] === "string" && data[k].trim(),
      ) ||
      !schools.includes(data.school) ||
      ![1, 2, 3, 4].includes(cat)
    )
      throw new Error(
        "Complete the resource, quantity description, educator, room, category, and campus.",
      );
    if (
      !Number.isInteger(count) ||
      count < 1 ||
      count > 1000 ||
      !Number.isFinite(unitValue) ||
      unitValue < 0 ||
      unitValue > 100000
    )
      throw new Error("Check quantity and replacement estimate.");
    if (
      ![
        "Excellent condition",
        "Good condition",
        "Gently used",
        "Serviceable",
      ].includes(data.condition)
    )
      throw new Error("Choose a valid condition.");
    if (!validPhoto(data.photo?.trim()))
      throw new Error("Choose a JPEG, PNG or WebP photo under the local storage limit.");
    const now = Date.now();
    const listing = {
      ...existing,
      id,
      title: data.title.trim(),
      unit: data.unit.trim(),
      cat,
      school: data.school,
      qty: count + " " + data.unit.trim(),
      condition: data.condition,
      count,
      unitValue,
      value: Math.round(count * unitValue * 100) / 100,
      image: data.photo?.trim() || fallbackImage(cat),
      teacher: data.teacher.trim(),
      room: data.room.trim(),
      swap: data.kind === "swap",
      selfPickup: cat === 3 || data.method === "pickup",
      department: ["", "SCIENCE", "LITERACY", "CLASSROOM", "CLASSROOM"][cat],
      assetId: existing?.assetId || "LOCAL-" + id.slice(-8).toUpperCase(),
      notes: String(data.notes || "").trim(),
      local: true,
      archived: !!existing?.archived,
      createdAt: existing?.createdAt || now,
      updatedAt: existing ? now : undefined,
    };
    // Keep active handoffs coherent when the owner changes a resource to bulky or swap-only.
    if (
      existing &&
      state.claims.some((c) => key(c.asset) === key(id) && isActive(c)) &&
      (listing.swap !== existing.swap ||
        listing.selfPickup !== existing.selfPickup)
    )
      throw new Error(
        "Withdraw active requests before changing transfer type or handoff requirements.",
      );
    return {
      ...state,
      listings: existing
        ? state.listings.map((a) => (key(a.id) === key(id) ? listing : a))
        : [listing, ...state.listings],
    };
  }
  function archiveListing(state, id) {
    return {
      ...state,
      listings: state.listings.map((a) =>
        key(a.id) === key(id)
          ? { ...a, archived: !a.archived, updatedAt: Date.now() }
          : a,
      ),
    };
  }
  function valueBreakdown(assets, state) {
    const ids = new Set(
      state.claims
        .filter((c) => isActive(c) && c.type === "claim")
        .map((c) => key(c.asset)),
    );
    return assets.filter((a) => ids.has(key(a.id)));
  }
  function requestedValue(assets, state) {
    return valueBreakdown(assets, state).reduce(
      (n, a) => n + (Number(a.value) || 0),
      0,
    );
  }
  function routeEligibility(asset, request, routes) {
    if (request.method === "Self-pickup" || asset?.selfPickup)
      return "Self-pickup: agree on timing and suitable transport directly with the school.";
    const matching = routes.find((r) =>
      [asset?.school, request.campus].every((s) =>
        r.stops.some(([, school]) => school === s),
      ),
    );
    return matching
      ? `${matching.day} sample loop includes both campuses. Confirm permission, actual service, and timing externally; no booking exists.`
      : "Outside a shared sample loop. Arrange separate campus coordination or self-pickup; no courier booking exists.";
  }
  const api = {
    fallbackImage,
    validPhoto,
    browseRecommendations,
    searchCorrection,
    recommendations,
    STATUS,
    isActive,
    normalizeState,
    requestFor,
    catalog,
    selectResources,
    paginate,
    validateRequest,
    createRequest,
    reviseRequest,
    withdrawRequest,
    requestLabel,
    saveListing,
    archiveListing,
    valueBreakdown,
    requestedValue,
    routeEligibility,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ClusterModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
