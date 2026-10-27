const $ = (s) => document.querySelector(s),
  main = $("main"),
  drawer = $("#drawer");
const M = ClusterModel,
  PAGE_SIZE = 8,
  storageKey = "clustershare-v1";
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const initial = () => M.normalizeState({});
let state,
  storageBlocked = false,
  baseRaw = null;
try {
  const loaded = ClusterStorage.read(localStorage, storageKey);
  state = M.normalizeState(loaded.value);
  baseRaw = loaded.raw;
} catch {
  state = initial();
  storageBlocked = true;
}
const defaults = () => ({
  query: "",
  literal: false,
  category: 0,
  school: "",
  condition: "",
  method: "",
  kind: "",
  available: false,
  sort: "newest",
  page: 1,
});
let browse = defaults();
try {
  browse = {
    ...browse,
    ...JSON.parse(localStorage.getItem("clustershare-browse-v1") || "{}"),
  };
} catch {}
let view = "home",
  itemsTab = "requests",
  selected = null,
  step = 1,
  formData = {},
  swapMode = false,
  editingRequest = null,
  returnFocus = null,
  returnKey = "";
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const allAssets = () => M.catalog(seed, state),
  findAsset = (id) =>
    [...state.listings, ...seed].find((a) => String(a.id) === String(id));
const requestFor = (id) => M.requestFor(state, id);
function persist() {
  if (storageBlocked) {
    toast(
      "Existing storage could not be read. It remains untouched; this session is temporary.",
    );
    return false;
  }
  try {
    baseRaw = ClusterStorage.commit(localStorage, storageKey, baseRaw, state);
    return true;
  } catch (error) {
    if (error.message === "STORAGE_CONFLICT") {
      ensureFresh();
      throw new Error(
        "Another tab changed your data. Latest records loaded; repeat your action.",
      );
    }
    toast("Could not save to this browser. Changes remain in this session.");
    return false;
  }
}

function toast(message) {
  $("#toast").textContent = message;
  $("#toast").hidden = false;
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => ($("#toast").hidden = true), 5000);
}
function bind(selector, fn) {
  document.querySelectorAll(selector).forEach(
    (el) =>
      (el.onclick = (e) => {
        if (!ensureFresh()) return;
        try {
          fn(el, e);
        } catch (error) {
          toast(error.message);
        }
      }),
  );
}

function ensureFresh() {
  if (storageBlocked) return true;
  try {
    const { raw, value } = ClusterStorage.read(localStorage, storageKey);
    if (raw !== baseRaw) {
      state = M.normalizeState(value);
      baseRaw = raw;
      render();
      drawer.close();
      toast(
        "Data changed in another tab. Latest records loaded; please repeat your action.",
      );
      return false;
    }
  } catch {
    storageBlocked = true;
    toast("Storage is unavailable. Existing records have been left untouched.");
    return false;
  }
  return true;
}
window.addEventListener("storage", (e) => {
  if (e.key === storageKey && !drawer.open) {
    ensureFresh();
  }
});

function options(values, current, placeholder) {
  return `<option value="">${placeholder}</option>${values.map((v) => `<option value="${esc(v)}" ${v === current ? "selected" : ""}>${esc(v)}</option>`).join("")}`;
}
function localDate() {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "America/New_York",
  }).format(new Date());
}
function statusText(a) {
  if (a.archived) return "Archived · restore to share";
  const r = requestFor(a.id);
  return r
    ? r.type === "swap"
      ? "Swap proposed · pending"
      : "Transfer requested"
    : a.swap
      ? "Available for a swap"
      : a.selfPickup
        ? "Self-pickup"
        : "Pickup or proposed route";
}
function money(n) {
  return "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
}
function resourceImage(a, extra = "") {
  a = { ...a, image: !a.image || a.image.match(/resource-(fallback|category-\d)\.svg$/) ? M.fallbackImage(a.cat) : a.image };
  return `<img data-category="${esc(a.cat)}" src="${esc(a.image)}" alt="${esc(a.title)} — ${String(a.image || "assets/resource-fallback.svg").match(/resource-(fallback|category-\d)\.svg$/) ? "representative illustration" : "representative photograph"}" loading="${extra ? "eager" : "lazy"}" decoding="async" ${extra}>`;
}
function card(a, featured = false) {
  const r = requestFor(a.id),
    heading = featured || view === "home" ? "h3" : "h2";
  return `<article class="resource-card"><div class="resource-media"><button class="media-detail" data-detail="${esc(a.id)}" data-focus-key="image-${esc(a.id)}" aria-label="View details: ${esc(a.title)}">${resourceImage(a)}</button><span class="free-tag">${a.swap ? "Swap requested · no money involved" : "Free"}</span><button class="save icon-button" data-save="${esc(a.id)}" data-focus-key="save-${esc(a.id)}" aria-label="${state.saved.some((id) => String(id) === String(a.id)) ? "Unsave" : "Save"} ${esc(a.title)}" aria-pressed="${state.saved.some((id) => String(id) === String(a.id))}">${state.saved.some((id) => String(id) === String(a.id)) ? "♥" : "♡"}</button></div><div class="resource-copy"><${heading}><button data-detail="${esc(a.id)}" data-focus-key="detail-${esc(a.id)}">${esc(a.title)}</button></${heading}><p class="quantity">${esc(a.qty)}</p><div class="resource-facts"><p>${esc(a.school)}</p><span>${esc(a.condition)}</span></div><span class="resource-status ${r ? "pending" : a.archived ? "archived-status" : ""}">${r ? "◷" : a.archived ? "—" : "✓"} ${statusText(a)}</span><button class="primary" ${a.archived && !r ? "disabled" : ""} data-request="${esc(a.id)}" data-focus-key="request-${esc(a.id)}">${r ? "Review request" : a.archived ? "Archived" : a.swap ? "Propose a swap" : "Request resource"} <span aria-hidden="true">↗</span></button></div></article>`;
}
function pageHeading(kicker, title, description, action = "") {
  return `<div class="page-heading"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
}
function stats() {
  const available = allAssets().filter((a) => !requestFor(a.id)).length;
  return `<section class="intro-stats" aria-label="Demonstration statistics"><div><strong>${available}</strong><span>Resources to explore</span></div><div><strong>${Object.keys(campusCodes).length}</strong><span>Real Forsyth campuses</span></div><div><strong>$0</strong><span>Transfer price</span></div><div><strong>${money(42850)}</strong><span>Estimated replacement value recirculated</span></div><p>Sample listings & estimates · Independent student project</p></section>`;
}
function sidebarContents() {
  return `<h2>Browse by</h2><div class="category-links" role="group" aria-label="Resource category">${cats.map((c,i)=>`<button class="${Number(browse.category)===i?'active':''}" data-cat="${i}" aria-pressed="${Number(browse.category)===i}">${i===0?'All resources':c}</button>`).join('')}</div><h2>Filter by</h2><details class="sidebar-group"><summary>School</summary><select aria-label="School" data-filter="school">${options(Object.keys(campusCodes), browse.school, "All schools")}</select></details><details class="sidebar-group"><summary>Condition</summary><select aria-label="Condition" data-filter="condition">${options([...new Set(allAssets().map((a) => a.condition))], browse.condition, "Any condition")}</select></details><details class="sidebar-group"><summary>Handoff</summary><select aria-label="Handoff" data-filter="method"><option value="">Any method</option><option value="courier" ${browse.method === "courier" ? "selected" : ""}>Pickup or proposed route</option><option value="pickup" ${browse.method === "pickup" ? "selected" : ""}>Self-pickup</option></select></details><details class="sidebar-group"><summary>Resource type</summary><select aria-label="Resource type" data-filter="kind"><option value="">Transfers & swaps</option><option value="transfer" ${browse.kind === "transfer" ? "selected" : ""}>Free transfers</option><option value="swap" ${browse.kind === "swap" ? "selected" : ""}>Swaps</option></select></details><label class="check-label"><input type="checkbox" id="available-only" ${browse.available ? "checked" : ""}> Not yet requested</label>`;
}
function filterControls() {
  return `<div class="search-hub"><label for="search">Find free classroom resources</label><div class="search-field"><span aria-hidden="true">⌕</span><input id="search" type="search" value="${esc(browse.query)}" placeholder="Search resources, equipment, or schools…"></div><div id="search-correction" role="status"></div><button class="secondary mobile-filter" id="open-filters">Browse & filter</button><div id="active-filters" class="active-filters"></div></div>`;
}
function bindSidebar() {
  bind('[data-cat]',el=>{browse.category=Number(el.dataset.cat);browse.page=1;document.querySelectorAll('[data-cat]').forEach(b=>{const active=Number(b.dataset.cat)===browse.category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderGrid();saveBrowse();});
  document.querySelectorAll('[data-filter]').forEach(el=>el.onchange=()=>{browse[el.dataset.filter]=el.value;browse.page=1;renderGrid();saveBrowse();});
  const available=document.querySelector('#available-only');if(available)available.onchange=e=>{browse.available=e.target.checked;browse.page=1;renderGrid();saveBrowse();};
}
function renderInventory() {
  main.innerHTML =
    pageHeading(
      "The inventory commons",
      "Free classroom resources",
      "Free resources from real Forsyth campuses. All seeded listings are demonstration data.",
      `<button class="secondary" data-list>List resource ↗</button>`,
    ) +
    `<div class="inventory-layout"><aside class="inventory-sidebar" aria-label="Browse and filter">${sidebarContents()}</aside><div class="inventory-results">` + filterControls() +
    `<div id="recommendation-slot"></div><div class="catalogbar"><p id="result-count" role="status" aria-live="polite"></p><label>Sort by<select id="sort"><option value="newest">Recently added</option><option value="value">Replacement value</option><option value="name">Name A–Z</option></select></label></div><section class="resource-grid" id="inventoryGrid" aria-label="Resources" tabindex="-1"></section><div id="pagination"></div><p class="browse-note">Representative product photography. School names are real; availability, rooms, educators, and replacement estimates are simulated. Estimates are not offers for sale.</p></div></div>`;
  $("#sort").value = browse.sort;
  $("#search").oninput = (e) => {
    browse.query = e.target.value;
    browse.literal = false;
    browse.page = 1;
    renderGrid();
    saveBrowse();
  };
  $("#sort").onchange = (e) => {
    browse.sort = e.target.value;
    browse.page = 1;
    renderGrid();
    saveBrowse();
  };
  bindSidebar();
  $('#open-filters').onclick=()=>{
    // Move the same controls into the native modal; no duplicate IDs or divergent state.
    const side=$('.inventory-sidebar');openDrawer(dh('Browse & filter')+'<div id="mobile-filter-content"></div><button class="primary" id="done-filters">Show resources</button>');
    $('#mobile-filter-content').append(...side.childNodes);
    $('#done-filters').onclick=()=>drawer.close();
    drawer.addEventListener('close',()=>{const content=$('#mobile-filter-content');if(content)side.append(...content.childNodes);},{once:true});
  };
  renderGrid();
  bindCommon();
}
function renderGrid() {
  renderRecommendations();
  const corrected=M.searchCorrection(browse.query,allAssets());
  $('#search-correction').innerHTML=corrected && corrected!==browse.query.trim().toLowerCase() && !browse.literal ? `Showing results for <strong>${esc(corrected)}</strong>. <button class="text-link" id="literal-search">Search instead for “${esc(browse.query)}”</button>` : '';
  if($('#literal-search')) $('#literal-search').onclick=()=>{browse.literal=true;renderGrid();saveBrowse();};
  const filtered = M.selectResources(allAssets(), state, browse),
    p = M.paginate(filtered, browse.page, PAGE_SIZE);
  const clamped = browse.page !== p.page;
  browse.page = p.page;
  $("#inventoryGrid").innerHTML = p.total
    ? p.items.map((a) => card(a)).join("")
    : `<div class="empty"><h2>No resources match just yet.</h2><p>Try a broader term, choose another school, or clear your filters.</p><button class="secondary" data-clear>Clear all filters</button></div>`;
  $("#result-count").innerHTML =
    `<span>${p.total} ${p.total === 1 ? "resource" : "resources"} found</span>${p.total ? `<span class="result-range"> · Showing ${p.first + 1}–${p.first + p.items.length}</span>` : ""}`;
  $("#pagination").innerHTML =
    p.pages > 1
      ? `<nav class="pagination" aria-label="Inventory pages"><button data-page="${p.page - 1}" ${p.page === 1 ? "disabled" : ""} aria-label="Previous page">←</button>${Array.from({ length: p.pages }, (_, i) => `<button data-page="${i + 1}" aria-label="Page ${i + 1}" ${p.page === i + 1 ? 'aria-current="page"' : ""}>${i + 1}</button>`).join("")}<button data-page="${p.page + 1}" ${p.page === p.pages ? "disabled" : ""} aria-label="Next page">→</button></nav>`
      : "";
  const chips = [];
  if (browse.query) chips.push(["query", "Search: " + browse.query]);
  if (browse.category) chips.push(["category", cats[browse.category]]);
  if (browse.school) chips.push(["school", browse.school]);
  if (browse.condition) chips.push(["condition", browse.condition]);
  if (browse.method)
    chips.push([
      "method",
      browse.method === "pickup" ? "Self-pickup" : "Pickup or proposed route",
    ]);
  if (browse.kind)
    chips.push(["kind", browse.kind === "swap" ? "Swaps" : "Free transfers"]);
  if (browse.available) chips.push(["available", "Not yet requested"]);
  $("#active-filters").innerHTML = chips.length
    ? chips
        .map(
          ([key, label]) =>
            `<button class="filter-chip" data-remove-filter="${key}" aria-label="Remove filter: ${esc(label)}">${esc(label)} <span aria-hidden="true">×</span></button>`,
        )
        .join("") + '<button class="text-link" data-clear>Clear all</button>'
    : "<p>Use one filter or combine several.</p>";
  bind("[data-page]", (el) => {
    browse.page = Number(el.dataset.page);
    renderGrid();
    saveBrowse();
    $("#inventoryGrid").focus({ preventScroll: true });
    $(".catalogbar").scrollIntoView({
      block: "start",
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
  });
  bind("[data-remove-filter]", (el) => {
    const key = el.dataset.removeFilter;
    browse[key] = defaults()[key];
    browse.page = 1;
    renderInventory();
    saveBrowse();
    $("#search").focus({ preventScroll: true });
  });
  bindCommon();
  if (clamped) saveBrowse();
}
function saveBrowse() {
  try {
    localStorage.setItem("clustershare-browse-v1", JSON.stringify(browse));
  } catch {}
  if (view === "inventory") history.replaceState(null, "", inventoryHash());
}
function inventoryHash() {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(browse))
    if (value !== defaults()[key] && value !== "")
      params.set(key, String(value));
  return "#inventory" + (params.size ? "?" + params.toString() : "");
}
function navigate(target) {
  const hash = target === "inventory" ? inventoryHash() : "#" + target;
  if (location.hash === hash) readRoute(true);
  else location.hash = hash;
}
function readRoute(scroll = true) {
  const [path, search = ""] = location.hash.slice(1).split("?");
  const known = ["home", "inventory", "items", "courier", "ledger"];
  view = known.includes(path) ? path : "home";
  if (view === "inventory") {
    const params = new URLSearchParams(search);
    browse = defaults();
    for (const key of Object.keys(browse))
      if (params.has(key)) browse[key] = params.get(key);
    browse.category = Math.min(
      4,
      Math.max(0, Math.trunc(Number(browse.category)) || 0),
    );
    browse.page = Math.max(1, Number(browse.page) || 1);
    browse.literal = browse.literal === true || browse.literal === "true";
    browse.available = browse.available === true || browse.available === "true";
    if (browse.school && !campusCodes[browse.school]) browse.school = "";
    if (!["", "courier", "pickup"].includes(browse.method)) browse.method = "";
    if (!["", "transfer", "swap"].includes(browse.kind)) browse.kind = "";
    if (!["newest", "value", "name"].includes(browse.sort))
      browse.sort = "newest";
    saveBrowse();
  }
  itemsTab = new URLSearchParams(search).get("tab") || "requests";
  render();
  if (scroll) window.scrollTo({ top: 0, behavior: "instant" });
}
window.addEventListener("hashchange", () => readRoute());
function bindCommon() {
  window.ClusterReveal?.mount(main);
  document
    .querySelectorAll("[data-list]")
    .forEach((el, i) => (el.dataset.focusKey ||= `list-${view}-${i}`));
  bind("[data-list]", () => listResource());
  bind("[data-request]", (el) =>
    requestFor(el.dataset.request)
      ? reviewExisting(requestFor(el.dataset.request))
      : openClaim(el.dataset.request),
  );
  bind("[data-detail]", (el) => quickView(el.dataset.detail));
  bind("[data-save]", (el) => {
    toggleSave(el.dataset.save);
    if (view === "inventory") renderGrid();
    else if (view === "items") renderItems();
    else renderHome();
    const button = document.querySelector(
      `[data-focus-key="save-${CSS.escape(el.dataset.save)}"]`,
    );
    button?.focus({ preventScroll: true });
  });
  bind("[data-clear]", () => {
    browse = defaults();
    renderInventory();
    saveBrowse();
    $("#search").focus({ preventScroll: true });
  });
  bind("[data-sources]", () => $("#sources").click());
  setupImages();
}
function setupImages() {
  document.querySelectorAll("img").forEach((img) => {
    const container = img.closest(
      ".resource-media,.hero-asset,.quick-photo,.showcase-photo",
    );
    const ready = () => {
      img.dataset.ready = "true";
      container?.removeAttribute("aria-busy");
    };
    img.onload = ready;
    img.onerror = () => {
      if (img.dataset.fallback) {
        ready();
        return;
      }
      img.dataset.fallback = "true";
      img.src = M.fallbackImage(img.dataset.category);
      img.alt = "Classroom resource illustration; photograph unavailable.";
    };
    if (img.complete && img.naturalWidth) ready();
    else if (img.complete) img.onerror();
    else container?.setAttribute("aria-busy", "true");
  });
}

function toggleSave(id) {
  if (!ensureFresh()) return false;
  const present = state.saved.some((s) => String(s) === String(id));
  state.saved = present
    ? state.saved.filter((s) => String(s) !== String(id))
    : [...state.saved, findAsset(id)?.id || id];
  const stored = persist();
  toast(
    !stored
      ? "Saved-item change applies to this session only; browser storage is unavailable."
      : present
        ? "Resource removed from saved items."
        : "Resource saved. Find it in Your Items.",
  );
  return !present;
}
function render() {
  try { renderView(); window.ClusterStartup?.ready(); }
  catch (error) { console.error(error); window.ClusterStartup?.fail(); }
}
function renderView() {
  window.ClusterReveal?.dispose();
  heroCleanup();
  document.title =
    "ClusterShare — " +
    {
      home: "Made for the next classroom",
      inventory: "Inventory Commons",
      items: "Your Items",
      courier: "Handoff Planning",
      ledger: "Impact",
    }[view];
  document
    .querySelectorAll("[data-view]")
    .forEach((el) =>
      el.setAttribute(
        "aria-current",
        el.dataset.view === view ? "page" : "false",
      ),
    );
  $("#claimCount").textContent = state.claims.filter(M.isActive).length;
  $(".bell i").hidden = state.read;
  main.className = "view-" + view;
  ({
    home: () => renderHome(),
    inventory: () => renderInventory(),
    items: () => renderItems(),
    courier: () => renderCourier(),
    ledger: () => renderLedger(),
  })[view]();
  if(!state.preferences?.category && !state.personalizeDismissed) {
    main.insertAdjacentHTML('afterbegin','<div class="personalize-banner"><button class="text-link" id="personalize">Find resources relevant to your classroom. Personalize recommendations ↗</button><button class="icon-button" id="dismiss-personalize" aria-label="Dismiss personalization invitation">×</button></div>');
    $('#personalize').onclick=openProfile;$('#dismiss-personalize').onclick=()=>{if(!ensureFresh())return;state.personalizeDismissed=true;persist();$('.personalize-banner')?.remove();};
  }
  if (storageBlocked && !$("#storage-notice"))
    main.insertAdjacentHTML(
      "afterbegin",
      '<p id="storage-notice" class="notice" role="alert">Existing browser data could not be read and has been left untouched. This session is temporary.</p>',
    );
}
function dh(title, kicker = "ClusterShare") {
  return `<div class="dialog-head"><div><span class="eyebrow">${kicker}</span><h2 id="drawerTitle" tabindex="-1">${title}</h2></div><button class="icon-button close" aria-label="Close drawer">×</button></div>`;
}
function openDrawer(html) {
  if (!drawer.open) {
    returnFocus = document.activeElement;
    returnKey = returnFocus?.dataset?.focusKey || "";
  }
  drawer.className = html.includes('class="quick-photo"')
    ? "resource-detail"
    : "workflow-drawer";
  drawer.innerHTML = html;
  if (!drawer.open) drawer.showModal();
  $(".close")?.addEventListener("click", () => drawer.close());
  $("#drawerTitle")?.focus();
  setupImages();
  prepareValidation();
}
drawer.addEventListener("close", () => {
  const replacement = returnKey
    ? document.querySelector(`[data-focus-key="${CSS.escape(returnKey)}"]`)
    : null;
  const target = returnFocus?.isConnected
    ? returnFocus
    : replacement || document.querySelector(`[data-view="${view}"]`);
  target?.focus({ preventScroll: true });
});
function quickView(id) {
  const a = findAsset(id);
  if (!a) {
    toast("Resource not found. Try refreshing inventory.");
    return;
  }
  openDrawer(
    dh(esc(a.title), "Resource details") +
      `<div class="quick-photo">${resourceImage(a)}</div><p class="quick-quantity">${esc(a.qty)} · ${esc(a.condition)}</p><span class="resource-status">${statusText(a)}</span><div class="form-actions detail-actions"><button class="secondary" id="quickSave" aria-pressed="${state.saved.some((s) => String(s) === String(id))}">${state.saved.some((s) => String(s) === String(id)) ? "Unsave resource" : "Save resource"}</button><button class="primary" id="quickRequest">${requestFor(id) ? "Review request" : a.swap ? "Propose a swap" : "Request resource"} ↗</button></div><dl class="quick-details"><dt>Transfer price</dt><dd><strong>Free · $0</strong></dd><dt>School</dt><dd>${esc(a.school)} · Room ${esc(a.room)}</dd><dt>Educator</dt><dd>${esc(a.teacher)}${a.local ? "" : " · Fictional demo educator"}</dd><dt>Department</dt><dd>${esc(a.department)}</dd><dt>Asset ID</dt><dd>${esc(a.assetId)}</dd><dt>Replacement estimate</dt><dd>${money(a.value)} / complete lot<br><small>${a.count} × ${money(a.unitValue)} per unit. Reference estimate, not a sale price.</small></dd><dt>Handoff</dt><dd>${a.selfPickup ? "Coordinated self-pickup required for this bulky resource." : "Proposed courier or coordinated self-pickup. Confirm campus arrangements first."}</dd>${a.notes ? `<dt>Notes</dt><dd>${esc(a.notes)}</dd>` : ""}</dl><p class="notice">${a.local ? "This listing was created in this browser. It has not been published or approved by a school." : "Seeded demonstration listing. Availability, teacher identity, room, and condition are simulated."} No educator verification or real dispatch occurs.</p>`,
  );
  if (a.local) {
    $("#quickSave").remove();
    $("#quickRequest").textContent = "Edit listing";
    $("#quickRequest").onclick = () => listResource(id);
    return;
  }
  $("#quickSave").onclick = () => {
    const saved = toggleSave(id);
    $("#quickSave").textContent = saved ? "Unsave resource" : "Save resource";
    $("#quickSave").setAttribute("aria-pressed", String(saved));
    if (view === "inventory") renderGrid();
    else if (view === "items") renderItems();
    else renderHome();
  };
  $("#quickRequest").onclick = () =>
    requestFor(id) ? reviewExisting(requestFor(id)) : openClaim(id);
}
function openClaim(id, existing = null) {
  selected = findAsset(id);
  if (!selected || selected.archived)
    return toast("Restore this listing before requesting it.");
  if (requestFor(id) && !existing) return reviewExisting(requestFor(id));
  editingRequest = existing;
  swapMode = !!selected.swap;
  step = 1;
  formData = existing ? { ...existing } : {};
  drawStep();
}
function drawStep() {
  const labels = ["Educator identity", "Destination", "Review & handoff"];
  const a = selected;
  openDrawer(
    dh(
      labels[step - 1],
      `${swapMode ? "Swap proposal" : "Transfer request"} · Step ${step} of 3`,
    ) +
      `<ol class="step-index" aria-label="Request progress">${labels.map((label, i) => `<li ${i + 1 === step ? 'aria-current="step"' : ""}><b>0${i + 1}</b><span>${label}</span></li>`).join("")}</ol><div class="selected-item"><strong>${esc(a.title)}</strong><p>${esc(a.qty)} · ${esc(a.school)}</p></div><form id="claimForm"><p id="form-error" class="form-error" role="alert" hidden></p>${step === 1 ? `<label for="name">Full name</label><input id="name" name="name" required maxlength="100" autocomplete="name" value="${esc(formData.name)}"><label for="department">Department</label><select id="department" name="department" required>${options(["Mathematics", "Science", "Literacy & Languages", "Technology", "Arts & Music", "Elementary Education", "Classroom Support"], formData.department, "Select a department")}</select><label for="email">Email address</label><input id="email" name="email" required type="email" autocomplete="email" value="${esc(formData.email)}"><p class="field-help">Use demo details for judging. No email is sent or verified.</p>` : step === 2 ? `<label for="campus">Destination campus</label><select id="campus" name="campus" required>${options(Object.keys(campusCodes), formData.campus, "Choose a Forsyth campus")}</select><label for="room">Target room number</label><input id="room" name="room" required maxlength="40" value="${esc(formData.room)}" placeholder="e.g. 208">${swapMode ? `<label for="offer">Resource you would offer</label><textarea id="offer" name="offer" required maxlength="800" placeholder="Quantity, condition, and resource description…">${esc(formData.offer)}</textarea>` : ""}` : `<h3>Review your request</h3><dl class="quick-details"><dt>Educator</dt><dd>${esc(formData.name)} · ${esc(formData.department)}<br>${esc(formData.email)}</dd><dt>Destination</dt><dd>${esc(formData.campus)} · Room ${esc(formData.room)}</dd><dt>Price</dt><dd>Free · $0</dd>${swapMode ? `<dt>Proposed swap</dt><dd>${esc(formData.offer)}</dd>` : ""}</dl><fieldset class="method-options"><legend>Choose a proposed handoff</legend><label class="radio"><input type="radio" name="method" value="Cluster courier" ${a.selfPickup ? "disabled" : formData.method !== "Self-pickup" ? "checked" : ""}><span>Proposed cluster courier<small>Tuesday / Thursday sample routes. School approval and coordination are still required.</small></span></label><label class="radio"><input type="radio" name="method" value="Self-pickup" ${a.selfPickup || formData.method === "Self-pickup" ? "checked" : ""}><span>Coordinated self-pickup<small>${a.selfPickup ? "Required for this bulky item. " : ""}Arrange timing and suitable transport with the school.</small></span></label></fieldset><p class="notice">${swapMode ? "Your proposal will remain pending; this demo cannot approve a swap." : "This records a request in this browser, not a confirmed allocation or dispatch."}</p>`}<div class="form-actions">${step > 1 ? '<button type="button" class="secondary" id="back">Back</button>' : ""}<button type="submit" class="primary">${step === 3 ? (editingRequest ? "Save revised request" : swapMode ? "Submit demo proposal" : "Submit demo request") : "Continue →"}</button></div></form>`,
  );
  $("#back")?.addEventListener("click", () => {
    Object.assign(formData, Object.fromEntries(new FormData($("#claimForm"))));
    step--;
    drawStep();
  });
  $("#claimForm").onsubmit = (e) => {
    e.preventDefault();
    const next = Object.fromEntries(new FormData(e.target));
    for (const [key, val] of Object.entries(next))
      if (typeof val === "string") next[key] = val.trim();
    if (Object.values(next).some((v) => !v)) {
      showFormError(
        "Enter meaningful text for this field.",
        Object.keys(next).find((key) => !next[key]),
      );
      return;
    }
    Object.assign(formData, next);
    if (step < 3) {
      step++;
      drawStep();
    } else {
      try {
        if (!ensureFresh()) return;
        const hash =
          editingRequest?.trackingHash ||
          Array.from(crypto.getRandomValues(new Uint8Array(8)), (n) =>
            n.toString(16).padStart(2, "0"),
          )
            .join("")
            .toUpperCase();
        const c = editingRequest
          ? M.reviseRequest(
              a,
              editingRequest,
              formData,
              state,
              Object.keys(campusCodes),
              localDate(),
            )
          : M.createRequest(
              a,
              formData,
              state,
              Object.keys(campusCodes),
              hash,
              localDate(),
            );
        c.createdAt = editingRequest?.createdAt || Date.now();
        if (editingRequest)
          state.claims = state.claims.map((r) => (r.id === c.id ? c : r));
        else state.claims.push(c);
        if (!persist()) c.sessionOnly = true;
        render();
        voucher(c);
      } catch (error) {
        showFormError(error.message);
      }
    }
  };
}
function showFormError(message, field) {
  const el = $("#form-error");
  if (!el) {
    toast(message);
    return;
  }
  el.hidden = false;
  el.textContent = message;
  el.tabIndex = -1;
  if (field) {
    const input = document.getElementById(field);
    input?.setAttribute("aria-invalid", "true");
    input?.setAttribute("aria-describedby", "form-error");
    input?.focus();
  } else el.focus();
}
function prepareValidation() {
  const form = drawer.querySelector("form");
  if (!form) return;
  form.addEventListener(
    "invalid",
    (e) => {
      e.target.setAttribute("aria-invalid", "true");
      e.target.setAttribute("aria-describedby", "form-error");
      const error = $("#form-error");
      error.hidden = false;
      error.textContent = e.target.validationMessage;
    },
    true,
  );
  form.addEventListener("input", (e) => {
    e.target.removeAttribute("aria-invalid");
    if (e.target.getAttribute("aria-describedby") === "form-error")
      e.target.removeAttribute("aria-describedby");
  });
}

function voucherBarcode(hash) {
  let x = 0;
  const bars = [...hash]
    .flatMap((char) =>
      [...char.charCodeAt(0).toString(2).padStart(8, "0")].map((bit) => {
        const bar = bit === "1" ? `<rect x="${x}" width="2" height="54"/>` : "";
        x += 2;
        return bar;
      }),
    )
    .join("");
  return `<svg viewBox="0 0 ${x} 54" role="img" aria-label="Illustrative barcode; not a scannable district tracking code" preserveAspectRatio="none">${bars}</svg>`;
}
function voucher(c) {
  const a = findAsset(c.asset);
  if (!a) return toast("The original resource could not be found.");
  const hash = c.trackingHash || c.id;
  openDrawer(
    dh(
      c.status === "withdrawn"
        ? "Request withdrawn."
        : c.type === "swap"
          ? "Swap proposal recorded."
          : "Request recorded.",
      c.sessionOnly
        ? "Session only · storage unavailable"
        : c.status === "withdrawn"
          ? "Withdrawn local record"
          : "Saved in this browser",
    ) +
      `<p class="notice">${c.sessionOnly ? "This record will not survive a refresh. " : ""}${!M.isActive(c) ? "Withdrawn record. Do not use this slip for a handoff. Create a new request if needed." : c.type === "swap" ? "Pending approval. No educator has been contacted. Coordinate with the school." : "No allocation or courier booking has been confirmed. Coordinate with the school before any real transfer."}</p><div class="voucher"><div class="voucher-masthead"><b>ClusterShare</b><span>PROPOSED TRANSFER SLIP<br>${esc(c.date)}</span></div><div class="routing-stamp"><span>ILLUSTRATIVE CAMPUS ROUTING</span><strong>${campusCodes[a.school] || "LOCAL"} → ${campusCodes[c.campus] || "LOCAL"}</strong><small>${c.method === "Self-pickup" ? "SELF-PICKUP / COORDINATION REQUIRED" : "PROPOSED TUE / THU COURIER"}</small></div><h3>${esc(a.title)}</h3><p>${esc(a.qty)} · ${esc(a.assetId)}</p><dl class="voucher-details"><dt>From</dt><dd>${esc(a.school)} · Room ${esc(a.room)}</dd><dt>To</dt><dd>${esc(c.campus)} · Room ${esc(c.room)}</dd><dt>Educator</dt><dd>${esc(c.name)} · ${esc(c.department)}</dd><dt>Price</dt><dd>Free · $0</dd>${c.offer ? `<dt>Swap offer</dt><dd>${esc(c.offer)}</dd>` : ""}</dl><div class="voucher-status">${c.status === "withdrawn" ? "WITHDRAWN · DO NOT USE FOR HANDOFF" : c.type === "swap" ? "PENDING APPROVAL" : "REQUESTED · NOT DISPATCHED"}</div><div class="barcode">${voucherBarcode(hash)}</div><code>${esc(hash)}</code><p class="voucher-disclaimer">INDEPENDENT STUDENT DEMO · ILLUSTRATIVE TRACKING<br>This slip is not district authorization.</p></div><div class="form-actions"><button class="secondary" id="printVoucher">Print voucher</button><button class="primary" id="viewClaims">View your items →</button></div><section class="next-actions" ${!M.isActive(c) ? "hidden" : ""}><h3>Next steps outside this demo</h3><ol><li>Confirm permission and availability with the origin school.</li><li>Agree on pickup or an eligible route with both campuses.</li><li>Pack accessories and bring the proposed slip.</li></ol></section>${M.isActive(c) ? `<div class="form-actions"><button class="secondary" id="reviseRequest">Revise request</button><button class="secondary" id="withdrawRequest">Withdraw request</button></div>` : ""}`,
  );
  $("#reviseRequest")?.addEventListener("click", () => {
    if (ensureFresh()) openClaim(c.asset, c);
  });
  $("#withdrawRequest")?.addEventListener("click", () => withdrawRequest(c.id));
  $("#printVoucher").onclick = () => window.print();
  $("#viewClaims").onclick = () => {
    drawer.close();
    navigate("items");
  };
}
function reviewExisting(c) {
  voucher(c);
}
$("#sources").onclick = () =>
  openDrawer(
    dh("The thinking behind the numbers.", "SOURCES & METHODOLOGY") +
      `<p>The district directory substantiates school names. The other school-system policies are comparative examples, not Forsyth rules or evidence of the demonstration estimates. ClusterShare is an independent FBLA demonstration, not a district service.</p><a class="source" target="_blank" rel="noopener" href="https://apps.fcps.org/legal/documents/400-03">Frederick County Public Schools · Property relocation policy ↗<small>Public regulation describing school-system property relocation and equipment transfer requests.</small></a><a class="source" target="_blank" rel="noopener" href="https://www.fcps.edu/get-involved/procurement-services/public-auction-and-surplus">Fairfax County Public Schools · Public auction & surplus ↗<small>Context for responsible surplus materials and equipment handling.</small></a><a class="source" target="_blank" rel="noopener" href="https://www.forsyth.k12.ga.us/inside-fcs/financial-transparency">Forsyth County Schools · Financial transparency ↗<small>Official local budget and finance references. These do not substantiate the simulated ClusterShare replacement-value totals.</small></a><a class="source" target="_blank" rel="noopener" href="https://www.forsyth.k12.ga.us/schools/about">Forsyth County Schools · School directory ↗<small>Local campus names used throughout this demonstration. The courier routes are illustrative, not official feeder patterns.</small></a><details class="photo-credits"><summary>Inventory photography credits</summary><p>Representative catalog photography, shown for this educational demonstration.</p><a class="source" target="_blank" rel="noopener" href="https://underwooddistributing.com/products/ti84plusceteacherpack">TI-84 Plus CE · Underwood Distributing ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.officeboffins.co.uk/bs-poly-stacking-school-chairs.html">Classroom chairs · Office Boffins ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.dynatech.de/vernier-go-direct-temperatursensor-teacherpack-gdx-tmp-tp-8x-gdx-tmp-ladestation-messbereich-40-1250c-0-250c-wireless-usb">Vernier probe kit · DynaTech ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.ebay.com/itm/126976250905">The Great Gatsby classroom lot · eBay seller ↗</a><a class="source" target="_blank" rel="noopener" href="https://manuals.plus/asin/B0CNTHVSGD">Mobile whiteboard · COSTWAY / Manuals+ ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.lakeshorelearning.com/products/books/paperback-books/leveled-books-classroom-library2/p/TT160X/">Guided reading library · Lakeshore Learning ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.lakeshorelearning.com/products/accessories/book-bins-set-of-12/p/LM453/">Book bins · Lakeshore Learning ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.schoolspecialty.com/frey-scientific-classroom-microscope-bundle-intermediate-2132612">Microscope kit · School Specialty ↗</a>${seed
        .filter((a) => a.source)
        .map(
          (a) =>
            `<a class="source" target="_blank" rel="noopener" href="${esc(a.source)}">${esc(a.title)} · Photo reference ↗</a>`,
        )
        .join(
          "",
        )}</details><div class="panel"><h2>Transparent by design</h2><p>School names reflect real Forsyth County campuses. Inventory listings, courier routes, asset values, and savings metrics are demonstration data, not actual school surplus. Product photographs are representative catalog images; quantities, condition, and accessories may differ. No accounts, payments, or real dispatches are created. Demo claims remain in this browser.</p></div>`,
  );
$("#alerts").onclick = () => {
  if (!ensureFresh()) return;
  state.read = true;
  persist();
  $(".bell i").hidden = true;
  const records=state.claims.slice().reverse().slice(0,5);
  openDrawer(dh('Notifications','On this browser')+`<div class="notification-list">${records.length?records.map(c=>{const a=findAsset(c.asset);return `<details><summary><span>${esc(a?.title || 'Resource request')}<small>${M.requestLabel(c)} · ${esc(c.date)}</small></span></summary><p>${esc(c.campus)} · ${esc(c.method)}. ${M.isActive(c)?'School coordination is still required. No message or booking was sent.':'This local request was withdrawn.'}</p><a href="#items">Review in Your Items ↗</a></details>`;}).join(''):'<p>No local request activity yet.</p>'}<p class="fineprint">Only browser-local activity. No real approvals or deliveries.</p></div>`);
  drawer.classList.add('notification-drawer');
  drawer.querySelectorAll('a').forEach(a=>a.onclick=()=>drawer.close());
};
$("#profile").onclick = openProfile;
$("#reset").onclick = () => {
  openDrawer(
    dh(
      "Reset this browser’s demonstration?",
      "Your data stays until you choose",
    ) +
      '<p>This clears local requests, offers, saved resources, and your created listings, and restores the 45 seeded listings. This cannot be undone in the app. Your theme preference stays.</p><div class="form-actions"><button class="secondary" id="cancelReset">Keep my data</button><button class="primary" id="confirmReset">Reset demo data</button></div>',
  );
  $("#cancelReset").onclick = () => drawer.close();
  $("#confirmReset").onclick = () => {
    if (!storageBlocked && !ensureFresh()) return;
    try {
      baseRaw = localStorage.getItem(storageKey);
    } catch {
      toast("Browser storage is unavailable; nothing was reset.");
      return;
    }
    state = initial();
    storageBlocked = false;
    browse = defaults();
    persist();
    try {
      localStorage.removeItem("clustershare-browse-v1");
    } catch {}
    drawer.close();
    navigate("home");
    toast("Demo reset. Seed listings restored.");
  };
};
const themeSwitch = $("#themeSwitch"),
  systemTheme = matchMedia("(prefers-color-scheme: dark)");
let savedTheme;
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeSwitch.setAttribute("aria-checked", String(theme === "dark"));
  themeSwitch.title =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  themeSwitch.querySelector(".theme-name").textContent =
    theme === "dark" ? "Dark" : "Light";
}
try {
  savedTheme = localStorage.getItem("clustershare-theme");
} catch {}
applyTheme(
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : systemTheme.matches
      ? "dark"
      : "light",
);
themeSwitch.onclick = () => {
  savedTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(savedTheme);
  try {
    localStorage.setItem("clustershare-theme", savedTheme);
  } catch {}
};
systemTheme.addEventListener("change", (e) => {
  if (!savedTheme) applyTheme(e.matches ? "dark" : "light");
});
$(".skip").onclick = (e) => {
  e.preventDefault();
  main.focus({ preventScroll: true });
  main.scrollIntoView({ block: "start", behavior: "instant" });
};
bind("[data-view]", (el, e) => {
  e.preventDefault();
  navigate(el.dataset.view);
});
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    if (view !== "inventory") {
      navigate("inventory");
      setTimeout(() => $("#search")?.focus(), 0);
    } else $("#search").focus();
  }
});
if (!location.hash) history.replaceState(null, "", "#home");
readRoute(false);

window.addEventListener("clustershare:reveal-ready", () => {
  if (view === "home") bindCommon();
});
