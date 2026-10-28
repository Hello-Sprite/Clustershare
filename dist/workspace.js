function renderItems() {
  const tabs = [
    ["requests", "Requests & swaps"],
    ["saved", "Saved resources"],
    ["listed", "Your listings"],
  ];
  if (!tabs.some(([key]) => key === itemsTab)) itemsTab = "requests";
  main.innerHTML =
    pageHeading(
      "",
      "Your Items",
      "",
      `<button class="secondary" data-list>List a resource ↗</button>`,
    ) +
    `<nav class="item-tabs" aria-label="Your items categories">${tabs.map(([key, label]) => `<a href="#items?tab=${key}" ${itemsTab === key ? 'aria-current="page"' : ""}>${label} <span>${key === "requests" ? state.claims.filter(M.isActive).length : key === "saved" ? allAssets().filter((a) => state.saved.some((id) => String(id) === String(a.id))).length : state.listings.length}</span></a>`).join("")}</nav>`;
  if (itemsTab === "requests") {
    main.innerHTML += state.claims.length
      ? `<label class="request-filter">Request status<select id="requestStatus" aria-label="Request status"><option value="all">All records</option><option value="active">Active requests</option><option value="withdrawn">Withdrawn</option></select></label><div id="requestRecords"></div><p class="notice">Local records do not contact educators, reserve resources, or book deliveries.</p>`
      : emptyState(
          "Your next discovery starts here.",
          "Request a resource or propose a swap to review your handoff details.",
        );
    const draw = () => {
      const filter = $("#requestStatus")?.value || "all";
      const records = state.claims.filter(
        (c) =>
          filter === "all" ||
          (filter === "active" ? M.isActive(c) : !M.isActive(c)),
      );
      $("#requestRecords").innerHTML = records.length
        ? `<div class="resource-grid request-cards">${records
            .map((c) => {
              const a = findAsset(c.asset);
              return `<article class="resource-card managed-request request-card"><div class="resource-media">${a ? `<button class="media-detail" data-detail="${esc(a.id)}" aria-label="View details: ${esc(a.title)}">${resourceImage(a)}</button>` : ''}</div><div class="resource-copy"><h2>${esc(a?.title || "Resource unavailable")}</h2><p class="quantity">${esc(a?.qty || "")}</p><p>${esc(c.date)}</p><div class="request-destination"><p>${esc(c.campus)} · Room ${esc(c.room)}</p><p>${c.method === "Self-pickup" ? "Pick up" : "Delivery"}</p></div><span class="resource-status ${M.isActive(c) ? "pending" : ""}">${M.requestLabel(c)}</span><button class="primary" data-voucher="${esc(c.id)}">${M.isActive(c) ? "Review & manage" : "View record"} ↗</button></div></article>`;
            })
            .join("")}</div>`
        : '<p class="notice">No records in this status. <button class="text-link" id="show-all-requests">Show all records</button></p>';
      if ($("#show-all-requests")) $("#show-all-requests").onclick = () => { $("#requestStatus").value = "all"; draw(); };
      bindCommon();
      bind("[data-voucher]", (el) =>
        reviewExisting(state.claims.find((c) => c.id === el.dataset.voucher)),
      );
    };
    if (state.claims.length) {
      draw();
      $("#requestStatus").onchange = draw;
    }
  } else {
    const resources =
      itemsTab === "saved"
        ? allAssets().filter((a) =>
            state.saved.some((id) => String(id) === String(a.id)),
          )
        : state.listings;
    main.innerHTML += resources.length
      ? `<div class="resource-grid">${resources.map((a) => (itemsTab === "listed" ? ownerCard(a) : card(a))).join("")}</div>`
      : emptyState(
          itemsTab === "saved"
            ? "Keep a useful resource close."
            : "Share the next useful thing.",
          itemsTab === "saved"
            ? "Use the heart on a resource to save it here."
            : "Create a listing with quantity, condition, and campus.",
        );
  }
  bindCommon();
  bind("[data-owner-request]", el => reviewExisting(requestFor(el.dataset.ownerRequest)));
  bind("[data-edit]", (el) => listResource(el.dataset.edit));
  bind("[data-archive]", (el) => {
    state = M.archiveListing(state, el.dataset.archive);
    const saved = persist();
    renderItems();
    document
      .querySelector(`[data-archive="${CSS.escape(el.dataset.archive)}"]`)
      ?.focus({ preventScroll: true });
    toast(
      saved
        ? "Listing updated. You can restore archived listings here."
        : "Listing changed for this session only; storage unavailable.",
    );
  });
}
function withdrawRequest(id) {
  if (!ensureFresh()) return;
  state = M.withdrawRequest(state, id);
  const saved = persist();
  render();
  drawer.close();
  toast(
    saved
      ? "Request withdrawn. You can request this resource again."
      : "Request withdrawn for this session only; storage unavailable.",
  );
}

function emptyState(title, description) {
  return `<div class="empty"><div class="empty-symbol" aria-hidden="true"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M13 17h24l10 10v25H13zM37 17v12h10M21 38h18M21 44h11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M32 8v8m-7-4h14" stroke="currentColor" stroke-width="1.5"/></svg></div><div><h2>${title}</h2><p>${description}</p>${view === "items" && itemsTab === "listed" ? '<button class="primary" data-list>List a resource ↗</button>' : '<a class="primary" href="#inventory">Browse free resources ↗</a>'}</div></div>`;
}
function listResource(id = null) {
  const existing = id ? findAsset(id) : null;
  if (id && !existing?.local) return;
  let stage = 1,
    draft = existing
      ? {
          ...existing,
          unit: existing.unit || existing.qty.replace(/^\d+\s*/, ""),
          kind: existing.swap ? "swap" : "transfer",
          method: existing.selfPickup ? "pickup" : "courier",
          photo: /resource-(fallback|category-\d)\.svg$/.test(existing.image)
            ? ""
            : existing.image,
        }
      : { count: 1, unitValue: "", kind: "transfer", method: "courier" };
  const input = (name, label, attrs = "") =>
    `<label for="list-${name}">${label}</label><input id="list-${name}" name="${name}" ${attrs} value="${esc(draft[name] ?? "")}">`;
  const select = (name, label, values, placeholder) =>
    `<label for="list-${name}">${label}</label><select id="list-${name}" name="${name}" required>${options(values, draft[name], placeholder)}</select>`;
  const draw = () => {
    const labels = ["Resource details", "Campus & handoff", "Review listing"];
    openDrawer(
      dh(
        existing ? "Edit your resource." : "Share something useful.",
        `Local listing · Step ${stage} of 3`,
      ) +
        `<ol class="step-index">${labels.map((label, i) => `<li ${stage === i + 1 ? 'aria-current="step"' : ""}><b>0${i + 1}</b>${label}</li>`).join("")}</ol><form id="listing"><p class="form-error" id="form-error" role="alert" hidden></p>${
          stage === 1
            ? input("title", "Resource name", 'required maxlength="120"') +
              `<div class="field-pair"><div>${input("count", "Number of units", 'type="number" min="1" max="1000" required')}</div><div>${input("unit", "Unit description", 'required maxlength="80" placeholder="e.g. microscopes"')}</div></div><label for="list-cat">Category</label><select id="list-cat" name="cat" required><option value="">Choose category</option>${cats
                .slice(1)
                .map(
                  (c, i) =>
                    `<option value="${i + 1}" ${Number(draft.cat) === i + 1 ? "selected" : ""}>${c}</option>`,
                )
                .join("")}</select>` +
              select(
                "condition",
                "Condition",
                [
                  "Excellent condition",
                  "Good condition",
                  "Gently used",
                  "Serviceable",
                ],
                "Choose condition",
              ) +
              input(
                "unitValue",
                "Replacement estimate per unit ($)",
                'type="number" min="0" max="100000" step="0.01" aria-describedby="replacement-help"',
              ) +
              '<p class="field-help" id="replacement-help">Optional — enter $0 or leave blank if unknown.</p>'
            : stage === 2
              ? select(
                  "school",
                  "Origin campus",
                  Object.keys(campusCodes),
                  "Choose campus",
                ) +
                input("room", "Room", 'required maxlength="40"') +
                input("teacher", "Educator name", 'required maxlength="100"') +
                `<label for="list-kind">Transfer type</label><select id="list-kind" name="kind"><option value="transfer">Free transfer</option><option value="swap" ${draft.kind === "swap" ? "selected" : ""}>Equipment swap</option></select><label for="list-method">Handoff</label><select id="list-method" name="method"><option value="courier">Pick up or delivery</option><option value="pickup" ${draft.method === "pickup" ? "selected" : ""}>Self-pickup required</option></select><p class="field-help">Furniture requires pickup. Arrange delivery with the school for other items.</p>`
              : `<dl class="quick-details"><dt>Resource</dt><dd>${esc(draft.title)}</dd><dt>Quantity</dt><dd>${esc(draft.count)} ${esc(draft.unit)} · ${esc(draft.condition)}</dd><dt>Origin</dt><dd>${esc(draft.school)} · Room ${esc(draft.room)}<br>${esc(draft.teacher)}</dd><dt>Transfer</dt><dd>${draft.kind === "swap" ? "Free equipment swap" : "Free resource"} · ${Number(draft.cat) === 3 || draft.method === "pickup" ? "Self-pickup" : "Pick up or delivery"}</dd><dt>Lot estimate</dt><dd>${money(Number(draft.count) * Number(draft.unitValue || 0))}</dd></dl><label for="list-notes">Condition details & included accessories (optional)</label><textarea id="list-notes" name="notes" maxlength="1000" placeholder="Describe wear, working condition, and what is included…">${esc(draft.notes)}</textarea>` +
                `<label for="list-photo-file">Resource photo (optional)</label><input id="list-photo-file" type="file" accept="image/jpeg,image/png,image/webp"><p class="field-help">Choose a photo from this device. It is resized and saved only in this browser. Without a photo, a category illustration is used.</p><div id="photo-preview">${draft.photo ? `<img src="${esc(draft.photo)}" alt="Selected resource photo"><button type="button" class="text-link" id="remove-photo">Remove photo</button>` : ''}</div><p id="photo-error" class="form-error" role="alert" hidden></p><p class="notice">Saved only in this browser. No publication, school approval, or real dispatch occurs.</p>`
        }<div class="form-actions">${stage > 1 ? '<button type="button" class="secondary" id="listingBack">Back</button>' : ""}<button type="submit" class="primary">${stage === 3 ? "Save local listing" : "Continue →"}</button></div></form>`,
    );
    const collect = () =>
      Object.assign(draft, Object.fromEntries(new FormData($("#listing"))));
    const photoInput = $('#list-photo-file');
    if (photoInput) photoInput.onchange = async () => {
      const file = photoInput.files[0]; if (!file) return;
      const submit = $('#listing button[type="submit"]'); submit.disabled = true;
      try { draft.photo = await ClusterPhoto.prepare(file); collect(); draw(); }
      catch (error) { $('#photo-error').textContent = error.message; $('#photo-error').hidden = false; }
      finally { if (submit.isConnected) submit.disabled = false; }
    };
    if ($('#remove-photo')) $('#remove-photo').onclick = () => { collect(); draft.photo = ''; draw(); };
    $("#listingBack")?.addEventListener("click", () => {
      collect();
      stage--;
      draw();
    });
    $("#listing").onsubmit = (e) => {
      e.preventDefault();
      collect();
      for (const key of ["title", "unit", "room", "teacher"])
        if (key in draft && !String(draft[key]).trim())
          return showFormError(
            "Enter meaningful text for this field.",
            "list-" + key,
          );
      if (stage < 3) {
        stage++;
        draw();
        return;
      }
      if (!M.validPhoto(draft.photo))
        return showFormError(
          "Choose a smaller JPEG, PNG or WebP photo.",
          "list-photo-file",
        );
      if (!ensureFresh()) return;
      try {
        state = M.saveListing(
          state,
          draft,
          Object.keys(campusCodes),
          existing?.id || "local-" + crypto.randomUUID(),
        );
        const saved = persist();
        render();
        openDrawer(
          dh(
            saved ? "Your listing is saved." : "Listing kept for this session.",
            saved ? "Browser-local resource" : "Storage unavailable",
          ) +
            `<p>${esc(draft.title)} is ready to manage in Your Items. Archived listings stay archived when edited.</p><div class="form-actions"><button class="primary" id="viewListed">View your listings ↗</button><button class="secondary" id="printDraft">Print listing summary</button></div><div class="voucher"><h3>${esc(draft.title)}</h3><p>${esc(draft.count)} ${esc(draft.unit)} · ${esc(draft.school)}<br>Free resource · Browser-local listing</p></div>`,
        );
        $("#viewListed").onclick = () => {
          drawer.close();
          navigate("items?tab=listed");
        };
        $("#printDraft").onclick = () => window.print();
      } catch (error) {
        showFormError(error.message);
      }
    };
  };
  draw();
}

function renderLedger() {
  const rows = M.valueBreakdown([...state.listings, ...seed], state);
  const example = seed[0];
  main.innerHTML = pageHeading('', 'Impact', '') +
    `<section class="impact-panel"><h2>Resources you've requested</h2><div class="impact-request-summary"><div><strong>${rows.length}</strong><span>${rows.length === 1 ? 'resource requested' : 'resources requested'}</span></div><div><strong>${money(M.requestedValue([...state.listings,...seed],state))}</strong><span>estimated replacement cost</span></div></div><p class="fineprint">Requests saved in this browser, not completed transfers or verified savings.</p>${valueBreakdown()}</section>` +
    `<section class="impact-panel impact-example"><div class="impact-example-photo">${resourceImage(example)}</div><div><h2>Useful equipment, another classroom.</h2><h3>${esc(example.title)}</h3><p>${esc(example.qty)}</p><p class="impact-free">Free to request</p><p>A shared set could equip another classroom before new supplies are purchased.</p><p class="fineprint">Example listing · estimated replacement cost ${money(example.value)}.</p></div></section>` +
    `<section class="impact-panel"><h2>How the value is counted</h2><p>Quantity × estimated cost per item. Only active transfer requests are included; pending swaps and withdrawn requests are excluded.</p><details class="impact-method"><summary>How success could be measured</summary><p>In a future pilot: completed handoffs confirmed by schools, requests fulfilled, and time to find a resource. These outcomes are not tracked in this demo.</p></details><button class="secondary" data-sources>Sources & methodology ↗</button></section>`;
  bindCommon();
}
function valueBreakdown() {
  const rows = M.valueBreakdown([...state.listings, ...seed], state);
  return rows.length ? `<div class="value-rows">${rows.map(a=>`<article><div><h3>${esc(a.title)}</h3><p>${esc(a.qty)} · ${esc(a.school)}</p></div><strong>${money(a.value)}</strong></article>`).join('')}</div>` : '<a class="text-link" href="#inventory">Browse free resources ↗</a>';
}

function ownerCard(a) {
  const request = requestFor(a.id);
  return `<article class="resource-card managed-listing"><div class="resource-media"><button class="media-detail" data-detail="${esc(a.id)}" aria-label="View details: ${esc(a.title)}">${resourceImage(a)}</button><span class="free-tag">${a.swap ? 'Swap' : 'Free transfer'}</span></div><div class="resource-copy"><h2>${esc(a.title)}</h2><p class="quantity">${esc(a.qty)}</p><div class="resource-facts"><p>${esc(a.school)}</p><span>${esc(a.condition)}</span></div><p class="owner-status">${a.archived ? 'Archived · hidden from inventory' : 'Listed in this browser'}</p><p>${request ? esc(M.requestLabel(request)) + ' · local demo record' : 'No active local request'}</p><div class="listing-tools"><button class="primary" data-edit="${esc(a.id)}" data-focus-key="edit-${esc(a.id)}">Edit listing</button><button class="secondary" data-archive="${esc(a.id)}">${a.archived ? 'Restore' : 'Archive'}</button>${request ? `<button class="text-link" data-owner-request="${esc(a.id)}">Review request</button>` : ''}</div></div></article>`;
}
