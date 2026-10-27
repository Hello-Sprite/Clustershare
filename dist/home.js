function hero() {
  return `<section class="hero" aria-labelledby="home-title"><div class="hero-copy"><span class="eyebrow">The Forsyth classroom commons</span><h1 id="home-title">Made for the<br><em>next classroom.</em></h1><p>Share surplus classroom supplies, books, and equipment with Forsyth County educators. Find what your classroom needs, completely free.</p><div class="button-row"><a href="#inventory" class="primary">Browse free resources <span aria-hidden="true">↗</span></a><button class="secondary" data-list>List a resource</button></div><form id="home-search" class="hero-search"><label for="home-query">Find a resource</label><div><input id="home-query" name="query" placeholder="Try lab kits, books, or your school…"><button type="submit" aria-label="Search resources">↗</button></div></form><p class="free-assurance">Free classroom resources. No purchases or payments.</p><p class="fineprint">An independent student demo. No real requests are sent.</p></div><div class="hero-composition"><div class="rotating-showcase">${[0,2,3,4,5].map((n,i)=>`<button class="hero-showcase hero-slide" data-slide="${i}" ${i ? 'hidden' : ''} data-detail="${seed[n].id}" aria-label="View ${esc(seed[n].title)}"><div class="showcase-top"><span>Useful here. Needed somewhere else.</span><span>Free to share ↗</span></div><div class="showcase-photo">${resourceImage(seed[n])}</div><div class="showcase-caption"><div><span>${esc(seed[n].school)}</span><strong>${esc(seed[n].title)}</strong></div><span>${esc(seed[n].qty)}</span></div></button>`).join("")}<div class="carousel-controls"><button id="hero-prev" aria-label="Previous resource">←</button><span id="hero-position">1 / 5</span><button id="hero-next" aria-label="Next resource">→</button><button id="hero-pause" aria-label="Pause resource preview">Pause</button></div></div></div><nav class="hero-categories" aria-label="Explore resource categories"><span>Find your next useful thing</span>${cats.map((c, i) => `<a href="#inventory?category=${i}">${c}</a>`).join("")}</nav></section>`;
}
function workflow() {
  return `<section class="workflow section" data-reveal="0" id="sharing" aria-labelledby="sharing-title"><div class="section-heading"><div><span class="eyebrow">02 / How sharing works</span><h2 id="sharing-title">How sharing works.</h2></div><p>Find something useful, send a request, then coordinate with the school. Requests are recorded locally; no real messages are sent.</p></div><div class="handoff-track"><div class="track-line" aria-hidden="true"></div><article><div class="handoff-art asset-tag" aria-hidden="true"><span>CLUSTERSHARE</span><b>Ready for another<br>school year.</b><small>RESOURCE / FREE</small><i class="mini-barcode"></i></div><span class="step-number">01</span><h3>Find a resource</h3><p>Browse free supplies from nearby classrooms.</p><a class="text-link" href="#inventory">Browse free resources ↗</a></article><article><div class="handoff-art transfer-art" aria-hidden="true"><span>Transfer Custody Record</span><b>$0</b><small>Origin → Destination</small><i></i><i></i><em>PROPOSED HANDOFF</em></div><span class="step-number">02</span><h3>Send a request</h3><p>Request the resource or suggest an equipment swap.</p><a class="text-link" href="#inventory">Find your next resource ↗</a></article><article><div class="handoff-art route-art" aria-hidden="true"><b>AGREE &amp; COLLECT</b><div><span>TAG</span><i>→</i><span>RECORD</span><i>→</i><span>CLASS</span></div><small>Or coordinate self-pickup</small></div><span class="step-number">03</span><h3>Plan the handoff</h3><p>Coordinate collection and any required school approval.</p><a class="text-link" href="#courier">Open handoff planning ↗</a></article></div></section>`;
}
function impactSection() {
  return `<section class="community-impact section" id="reuse" data-reveal="1" aria-labelledby="impact-title"><div class="reuse-photo">${resourceImage(seed[3])}<span>30 books. Many more chapters.</span></div><div class="reuse-copy"><span class="eyebrow">More classroom years</span><h2 id="impact-title">Before buying new, see what another classroom can share.</h2><p>Discover nearby resources, request or suggest a swap, and keep handoff details together. A proposed teacher-to-teacher tool, independent of the school district.</p><a href="#ledger" class="text-link">Explore the value of reuse ↗</a><div class="reuse-estimate"><strong>${money(seed[3].value)}</strong><p>Estimated replacement cost for 30 Gatsby paperbacks.<br>Free to request · simulated listing, not verified savings.</p></div></div></section>`;
}
function faq() {
  return `<section class="faq" aria-labelledby="faq-title"><div><h2 id="faq-title">A few useful answers.</h2></div><div class="faq-questions">${[
    [
      "Is everything really free?",
      "Yes. The demo models free internal transfers or equipment-for-equipment swaps. Replacement estimates are reference values, never sale prices.",
    ],
    [
      "Who can use ClusterShare?",
      "The concept serves Forsyth County educators. This independent student prototype has no sign-in or educator verification and is not affiliated with the school district.",
    ],
    [
      "Will this book a real courier delivery?",
      "No. Tuesday/Thursday loops are proposed examples using real campus names. Confirm school approval, packing, route eligibility, and timing before any real handoff. Bulky furniture requires self-pickup.",
    ],
    [
      "Where are my listings and requests stored?",
      "Only in this browser on this device. Listings, saved resources, and requests persist locally until you reset the demo or clear site storage. Avoid entering private student or staff information.",
    ],
    [
      "What happens after I propose a swap?",
      "Your proposal stays pending. Review, revise, or withdraw it in Your Items. The prototype does not contact another educator, accept offers, or authorize dispatch.",
    ],
  ]
    .map(
      ([q, a]) =>
        `<details><summary>${q}<span aria-hidden="true">＋</span></summary><p>${a}</p></details>`,
    )
    .join("")}</div></section>`;
}
function renderHome() {
  window.ClusterReveal?.dispose();
  const featured = [
    ...seed.filter((a) => [3, 4, 5].includes(a.id)),
    ...allAssets(),
  ]
    .filter(
      (a, i, all) =>
        all.findIndex((b) => String(b.id) === String(a.id)) === i &&
        !requestFor(a.id),
    )
    .slice(0, 3);
  main.innerHTML =
    hero() +
    finderSection() +
    workflow() +
    impactSection() +
    `<section class="contribute section" id="contribute" data-reveal="2"><div class="contribute-copy"><span class="eyebrow">Taught here. Shared here. Used again.</span><h2>Something to spare.<br><em>Something to share.</em></h2><p>Give the equipment, books, and supplies in your classroom a useful next chapter.</p><button class="primary" data-list>Share a resource ↗</button><p class="fineprint">Listings are saved only in this browser.</p></div>${faq()}</section>`;
  $("#home-search").onsubmit = (e) => {
    e.preventDefault();
    browse = { ...defaults(), query: $("#home-query").value };
    navigate("inventory");
  };
  bindFinder();
  startHero();
  bindCommon();
}
