const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs"),
  vm = require("node:vm");
const M = require("../dist/model.js");
const source = fs.readFileSync("dist/app.js", "utf8"),
  data = fs.readFileSync("dist/catalog.js", "utf8");
const fixture = vm.runInNewContext(
  data + ";({seed,campusCodes,courierRoutes})",
);
const seed = JSON.parse(JSON.stringify(fixture.seed)),
  schools = Object.keys(fixture.campusCodes);
const identity = {
  name: "Demo Educator",
  email: "demo@example.com",
  department: "Science",
  campus: "Denmark High School",
  room: "208",
  method: "Cluster courier",
};
test("migration retains existing claims, numeric saves, and extra fields", () => {
  const legacy = {
    claims: [{ asset: 1, type: "claim", id: "legacy" }],
    saved: [2],
    started: 123,
    custom: "retained",
  };
  const s = M.normalizeState(legacy);
  assert.deepEqual(s.claims, [{ ...legacy.claims[0], status: "requested" }]);
  assert.deepEqual(s.saved, [2]);
  assert.equal(s.started, 123);
  assert.equal(s.custom, "retained");
  assert.deepEqual(s.listings, []);
});
test("seed data contains valid schools, quantities, routes, and stable IDs", () => {
  assert.equal(seed.length, 45);
  assert.equal(new Set(seed.map((a) => a.id)).size, 45);
  assert.equal(schools.length, 17);
  for (const a of seed) {
    assert.ok(schools.includes(a.school));
    assert.equal(a.count * a.unitValue, a.value);
  }
  for (const r of fixture.courierRoutes)
    for (const [, school] of r.stops) assert.ok(schools.includes(school));
});
test("search, category, school, condition, method and type combine before sorting and pagination", () => {
  const state = M.normalizeState({});
  const f = {
    query: "probe",
    category: 1,
    school: "South Forsyth High School",
    condition: "Excellent condition",
    method: "courier",
    kind: "transfer",
    sort: "value",
  };
  const results = M.selectResources(seed, state, f);
  assert.deepEqual(
    results.map((a) => a.id),
    [3],
  );
  const p = M.paginate(results, 99);
  assert.equal(p.page, 1);
  assert.equal(p.total, 1);
  assert.equal(p.items[0].id, 3);
  assert.equal(
    M.selectResources(seed, state, { ...f, school: "Denmark High School" })
      .length,
    0,
  );
  assert.equal(
    M.selectResources(seed, state, { ...f, kind: "swap" }).length,
    0,
  );
});
test("sorting and page clamping work with full and empty result sets", () => {
  const state = M.normalizeState({});
  const sorted = M.selectResources(seed, state, { sort: "value" });
  assert.ok(sorted.every((a, i) => i === 0 || sorted[i - 1].value >= a.value));
  assert.equal(M.paginate(seed, 6).items.length, 5);
  assert.equal(M.paginate(seed, 1.8).page, 1);
  assert.equal(M.paginate([], 8).page, 1);
  assert.deepEqual(M.paginate([], 8).items, []);
});
test("request transition is persistent, hides availability, and prevents duplicate submissions", () => {
  const state = M.normalizeState({});
  const a = seed.find((a) => a.id === 3);
  const c = M.createRequest(
    a,
    identity,
    state,
    schools,
    "ABC123",
    "Oct 25, 2026",
  );
  state.claims.push(c);
  const restored = M.normalizeState(JSON.parse(JSON.stringify(state)));
  assert.equal(M.requestFor(restored, "3").status, "requested");
  assert.equal(
    M.selectResources(seed, restored, { query: "probe", available: true })
      .length,
    0,
  );
  assert.equal(M.requestedValue(seed, restored), 640);
  assert.throws(
    () => M.createRequest(a, identity, restored, schools, "DUP", "today"),
    /already have a request/,
  );
});
test("swap proposals stay pending and are excluded from requested transfer value", () => {
  const state = M.normalizeState({});
  const a = seed.find((a) => a.swap && !a.selfPickup);
  assert.ok(a);
  assert.throws(
    () => M.createRequest(a, identity, state, schools, "NOOFFER", "today"),
    /Describe/,
  );
  state.claims.push(
    M.createRequest(
      a,
      { ...identity, offer: "A set of labeled library bins" },
      state,
      schools,
      "SWAP",
      "today",
    ),
  );
  assert.equal(state.claims[0].status, "pending");
  assert.equal(M.requestedValue(seed, state), 0);
});
test("bulky resources require pickup and invalid destinations are rejected", () => {
  const state = M.normalizeState({}),
    a = seed.find((a) => a.selfPickup && !a.swap);
  assert.throws(
    () => M.createRequest(a, identity, state, schools, "A", "today"),
    /self-pickup/,
  );
  assert.throws(
    () =>
      M.createRequest(
        seed[2],
        { ...identity, campus: "Placeholder School" },
        state,
        schools,
        "B",
        "today",
      ),
    /destination/,
  );
  assert.throws(
    () =>
      M.createRequest(
        seed[2],
        { ...identity, name: " " },
        state,
        schools,
        "C",
        "today",
      ),
    /name/,
  );
});
test("a locally created listing participates in catalog search, saves and requests after reload", () => {
  const listing = {
    ...seed[2],
    id: "local-test",
    title: "Demo science trays",
    school: "Denmark High School",
    local: true,
  };
  const s = M.normalizeState({ listings: [listing], saved: ["local-test"] });
  const assets = M.catalog(seed, s);
  assert.equal(assets.length, 46);
  assert.equal(
    M.selectResources(assets, s, { query: "Demo science trays" })[0].id,
    "local-test",
  );
  s.claims.push(
    M.createRequest(listing, identity, s, schools, "LOCAL", "today"),
  );
  const reloaded = M.normalizeState(JSON.parse(JSON.stringify(s)));
  assert.equal(M.requestFor(reloaded, "local-test").status, "requested");
  assert.ok(reloaded.saved.includes("local-test"));
  assert.equal(M.requestedValue(M.catalog(seed, reloaded), reloaded), 640);
});
test("unreadable storage is rejected without any writes", () => {
  const S = require("../dist/storage.js");
  for (const raw of ["{broken", "null", "[]", '{"claims":{}}']) {
    let writes = 0;
    assert.throws(() =>
      S.read({ getItem: () => raw, setItem: () => writes++ }, "test"),
    );
    assert.equal(writes, 0);
  }
});
test("stale tabs cannot overwrite newer stored records", () => {
  const S = require("../dist/storage.js");
  let raw = null;
  const storage = { getItem: () => raw, setItem: (_, v) => (raw = v) };
  const a = S.read(storage, "test"),
    b = S.read(storage, "test");
  S.commit(storage, "test", a.raw, { saved: [1] });
  assert.throws(
    () => S.commit(storage, "test", b.raw, { saved: [2] }),
    /STORAGE_CONFLICT/,
  );
  assert.deepEqual(JSON.parse(raw), { saved: [1] });
});
test("revision keeps tracking identity, updates destination, and preserves duplicate protection", () => {
  const a = seed[2],
    s = M.normalizeState({});
  const c = M.createRequest(a, identity, s, schools, "REV", "today");
  s.claims.push(c);
  const next = M.reviseRequest(
    a,
    c,
    { ...identity, campus: "Midway Elementary", room: "42" },
    s,
    schools,
    "tomorrow",
  );
  assert.equal(next.id, c.id);
  assert.equal(next.trackingHash, c.trackingHash);
  assert.equal(next.room, "42");
  assert.equal(next.status, "requested");
  assert.throws(
    () => M.createRequest(a, identity, s, schools, "DUP", "today"),
    /already/,
  );
});
test("withdrawal releases availability and permits a new request without counting history twice", () => {
  const a = seed[2];
  let s = M.normalizeState({});
  s.claims.push(M.createRequest(a, identity, s, schools, "OLD", "today"));
  s = M.withdrawRequest(s, s.claims[0].id);
  assert.equal(M.requestFor(s, a.id), undefined);
  assert.equal(M.requestedValue(seed, s), 0);
  assert.ok(
    M.selectResources(seed, s, { available: true }).some((x) => x.id === a.id),
  );
  s.claims.push(M.createRequest(a, identity, s, schools, "NEW", "today"));
  assert.equal(s.claims.length, 2);
  assert.equal(M.requestedValue(seed, s), 640);
  assert.throws(
    () => M.reviseRequest(a, s.claims[0], identity, s, schools, "today"),
    /Withdrawn/,
  );
});
const listingDraft = {
  title: "Science trays",
  unit: "trays",
  count: 6,
  unitValue: 12,
  cat: 1,
  school: "Denmark High School",
  condition: "Good condition",
  room: "201",
  teacher: "Demo Teacher",
  kind: "transfer",
  method: "courier",
  photo: "",
  notes: "Includes lids",
};
test("listing edits preserve ID and saves; archiving is reversible and survives reload", () => {
  let s = M.saveListing(
    M.normalizeState({ saved: ["local-1"] }),
    listingDraft,
    schools,
    "local-1",
  );
  const first = s.listings[0];
  s = M.saveListing(
    s,
    { ...listingDraft, title: "Science trays with lids", count: 8 },
    schools,
    "local-1",
  );
  assert.equal(s.listings[0].createdAt, first.createdAt);
  assert.equal(s.listings[0].value, 96);
  assert.deepEqual(s.saved, ["local-1"]);
  s = M.archiveListing(s, "local-1");
  assert.equal(M.catalog(seed, s).length, 45);
  assert.equal(s.listings.length, 1);
  s = M.normalizeState(JSON.parse(JSON.stringify(s)));
  assert.equal(s.listings[0].archived, true);
  s = M.archiveListing(s, "local-1");
  assert.equal(
    M.selectResources(M.catalog(seed, s), s, {
      query: "with lids",
      school: "Denmark High School",
      method: "courier",
      kind: "transfer",
    }).length,
    1,
  );
});
test("listing validation prevents invalid values and handoff changes underneath active requests", () => {
  assert.throws(
    () =>
      M.saveListing(
        M.normalizeState({}),
        { ...listingDraft, count: 0 },
        schools,
        "bad",
      ),
    /quantity/,
  );
  assert.throws(
    () =>
      M.saveListing(
        M.normalizeState({}),
        { ...listingDraft, photo: "http://example.com/x.jpg" },
        schools,
        "bad",
      ),
    /JPEG|PNG|WebP/,
  );
  let s = M.saveListing(M.normalizeState({}), listingDraft, schools, "local-1");
  s.claims.push(
    M.createRequest(s.listings[0], identity, s, schools, "L", "today"),
  );
  assert.throws(
    () =>
      M.saveListing(
        s,
        { ...listingDraft, method: "pickup" },
        schools,
        "local-1",
      ),
    /Withdraw/,
  );
});
test("breakdown excludes pending swaps and withdrawn transfers but retains archived requested assets", () => {
  let s = M.saveListing(M.normalizeState({}), listingDraft, schools, "local-1");
  s.claims.push(
    M.createRequest(s.listings[0], identity, s, schools, "LOCAL", "today"),
  );
  const swap = seed.find((a) => a.swap && !a.selfPickup);
  s.claims.push(
    M.createRequest(
      swap,
      { ...identity, offer: "Library bins" },
      s,
      schools,
      "SWAP",
      "today",
    ),
  );
  s = M.archiveListing(s, "local-1");
  assert.equal(M.requestedValue([...s.listings, ...seed], s), 72);
  assert.equal(M.valueBreakdown([...s.listings, ...seed], s).length, 1);
  s = M.withdrawRequest(s, "CS-LOCAL");
  assert.equal(M.requestedValue([...s.listings, ...seed], s), 0);
});
test("route guidance distinguishes common loops, unserved campus pairs, and self-pickup", () => {
  const a = { school: "Denmark High School" };
  assert.match(
    M.routeEligibility(
      a,
      { campus: "Midway Elementary", method: "Cluster courier" },
      fixture.courierRoutes,
    ),
    /Tuesday sample loop/,
  );
  assert.match(
    M.routeEligibility(
      a,
      { campus: "South Forsyth High School", method: "Cluster courier" },
      fixture.courierRoutes,
    ),
    /Outside/,
  );
  assert.match(
    M.routeEligibility(
      a,
      { campus: "Midway Elementary", method: "Self-pickup" },
      fixture.courierRoutes,
    ),
    /Self-pickup/,
  );
});
test("malformed nested records do not crash migration or discard valid records", () => {
  const s = M.normalizeState({
    claims: [null, { id: "ok", asset: 3, type: "claim" }],
    listings: [
      null,
      { id: "ok", title: "Trays", school: "Denmark High School" },
    ],
    saved: [null, 3],
  });
  assert.equal(s.claims.length, 1);
  assert.equal(s.listings[0].image, "assets/resource-fallback.svg");
  assert.deepEqual(s.saved, [3]);
  assert.equal(s.unrecognizedRecords.claims[0], null);
});

test('preferences survive normalization and storage without replacing existing records', () => {
  const original = M.normalizeState({saved:[1],preferences:{grade:'Middle',subject:'math',category:'1'},personalizeDismissed:true});
  const restored=M.normalizeState(JSON.parse(JSON.stringify(original)));
  assert.deepEqual(restored.preferences,original.preferences);
  assert.deepEqual(restored.saved,[1]);
  assert.equal(restored.personalizeDismissed,true);
});
test('recommendations use explicit preferences, exclude swaps and do not change catalog',()=>{
  const matches=M.recommendations(seed,{grade:'Middle',subject:'math',category:'1'});
  assert.ok(matches.some(a=>a.id===1));
  assert.ok(matches.every(a=>!a.swap&&a.cat===1&&a.school.includes('Middle')));
  assert.equal(M.recommendations(seed,{}).length,0);
  assert.ok(matches.length<=3);
});
test('typo correction and whitespace variants combine with filters and pagination',()=>{
  const state=M.normalizeState({});
  assert.equal(M.searchCorrection('calculaters',seed),'calculators');
  assert.ok(M.selectResources(seed,state,{query:'calculaters',school:'Piney Grove Middle School',category:1}).some(a=>a.id===1));
  assert.equal(M.selectResources(seed,state,{query:'calculaters',literal:true}).length,0);
  assert.ok(M.selectResources(seed,state,{query:'white board'}).some(a=>a.id===5));
  assert.equal(M.paginate(M.selectResources(seed,state,{query:'calculaters'}),99).page,1);
});

test('compact recommendations yield to every explicit inventory filter and exclude owned resources', () => {
  const state = M.normalizeState({preferences:{grade:'any',subject:'any',category:'1'}});
  assert.ok(M.browseRecommendations(seed,state,{}).length > 0);
  for (const filter of [{query:'probe'},{category:2},{school:schools[0]},{condition:'Good condition'},{method:'pickup'},{kind:'swap'},{available:true}])
    assert.deepEqual(M.browseRecommendations(seed,state,filter), []);
  assert.equal(M.browseRecommendations([{...seed[0],local:true}],state,{}).length,0);
  assert.ok(M.browseRecommendations(seed,state,{sort:'name',page:2}).length > 0);
});
test('optional local photos survive persistence; executable and oversized images are rejected', () => {
  const photo='data:image/jpeg;base64,/9j/AAAA';
  const base={title:'Science trays',count:3,unit:'trays',cat:1,condition:'Good condition',unitValue:12,school:schools[0],room:'101',teacher:'Test Educator',photo};
  const state=M.saveListing(M.normalizeState({}),base,schools,'photo-fixture');
  assert.equal(M.normalizeState(JSON.parse(JSON.stringify(state))).listings[0].image,photo);
  for (const bad of ['data:image/svg+xml;base64,AAAA','javascript:alert(1)','data:image/jpeg;base64,'+'A'.repeat(500001)])
    assert.throws(()=>M.saveListing(state,{...base,photo:bad},schools,'invalid-photo'),/JPEG/);
  const noPhoto=M.saveListing(state,{...base,cat:2,photo:''},schools,'no-photo');
  assert.equal(noPhoto.listings[0].image,'assets/resource-category-2.svg');
  assert.equal(state.listings[0].image,photo);
});
