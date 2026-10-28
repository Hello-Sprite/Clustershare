/* Lightweight preferences and progressive homepage enhancement. */
let heroCleanup = () => {};
function preferenceFields(p = state.preferences || {}) {
  const field = (key, label, choices) => `<label>${label}<select name="${key}" required><option value="">Choose ${label.toLowerCase()}</option>${choices.map(([v,t])=>`<option value="${v}" ${p[key]===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
  return field('grade','Grade band',[['any','Any grade'],['Elementary','Elementary'],['Middle','Middle school'],['High','High school']])+field('subject','Teaching area',[['any','Across subjects'],['math','Mathematics'],['science','Science'],['literacy','Literacy & reading'],['art','Arts']])+field('category','Resource type',[['any','Any resource'],['1','STEM & Lab'],['2','Curriculum Sets'],['3','Classroom Furniture'],['4','Storage & Office']]);
}
function finderSection() {
  return `<section class="section finder rounded-section" aria-labelledby="finder-title"><div class="section-heading"><h2 id="finder-title">Find resources for your classroom.</h2></div><form id="finder-form" class="preference-fields">${preferenceFields()}<button class="primary">Find my matches ↗</button></form><div id="finder-results"></div></section>`;
}
function matchingResources() { return M.recommendations(allAssets(), state.preferences).filter(a=>!a.local && !requestFor(a.id)); }
function bindFinder() {
  const show = () => {const matches=matchingResources(); $('#finder-results').innerHTML=`<p>${matches.length ? 'Matched to your choices. These simulated listings are free to request.' : 'No exact matches right now. Try broader preferences or explore all resources.'}</p><div class="featured-grid">${matches.map(a=>card(a,true)).join('')}</div><a class="text-link" href="#inventory">Browse all resources ↗</a>`;bindCommon();};
  $('#finder-form').onsubmit=e=>{e.preventDefault();if(!ensureFresh())return;state.preferences={...state.preferences,...Object.fromEntries(new FormData(e.target))};persist();show();};
  if(state.preferences?.category) show();
}
function startHero() {
  heroCleanup();
  const slides = [...document.querySelectorAll('[data-slide]')];
  if (!slides.length) return;
  let index = 0;
  const show = n => {
    slides[index].hidden = true;
    index = (n + slides.length) % slides.length;
    slides[index].hidden = false;
    $('#hero-position').textContent = `${index + 1} / ${slides.length}`;
  };
  $('#hero-prev').onclick = () => show(index - 1);
  $('#hero-next').onclick = () => show(index + 1);
  // Continue during hover/focus; skip hidden tabs and honor the system motion preference.
  const timer = setInterval(() => {
    if (!document.hidden && !reducedMotion.matches) show(index + 1);
  }, 7000);
  heroCleanup = () => clearInterval(timer);
}
function openProfile() {
  const p=state.preferences||{};
  openDrawer(dh('Your classroom preferences.','Browser-local profile')+`<p>Optional personalization, not an account. Information stays on this browser.</p><form id="profile-form"><label for="profile-name">Name (optional)</label><input id="profile-name" name="name" maxlength="80" value="${esc(p.name)}"><label for="profile-campus">Campus (optional)</label><select id="profile-campus" name="campus">${options(Object.keys(campusCodes),p.campus,'Choose a campus')}</select><div class="profile-preferences">${preferenceFields(p)}</div><button class="primary">Save preferences</button></form><p class="fineprint">Requests still need their own educator details. Theme is available in the header; local data controls are in the footer.</p>`);
  $('#profile-form').onsubmit=e=>{e.preventDefault();if(!ensureFresh())return;state.preferences=Object.fromEntries(new FormData(e.target));persist();drawer.close();render();toast('Classroom preferences saved on this browser.');};
}

function renderRecommendations() {
  const slot = $('#recommendation-slot');
  if (!slot) return;
  const matches = M.browseRecommendations(allAssets(), state, browse);
  slot.innerHTML = matches.length ? `<section class="recommendation-shelf"><div class="recommendation-heading"><h2>Recommended for your room</h2><button class="text-link" id="edit-preferences">Edit preferences</button></div><div class="recommendation-list">${matches.map(a=>`<button class="recommendation-item" data-detail="${esc(a.id)}">${resourceImage(a)}<span><strong>${esc(a.title)}</strong><small>${esc(a.qty)} · ${esc(a.school)}</small></span><span aria-hidden="true">↗</span></button>`).join('')}</div></section>` : '';
  if ($('#edit-preferences')) $('#edit-preferences').onclick = openProfile;
}

let sharingCleanup = () => {};
function startSharingAnimation() {
  sharingCleanup();
  const section = $('#sharing'), track = section?.querySelector('.handoff-track');
  if (!track || reducedMotion.matches || (!('IntersectionObserver' in window) || !('ResizeObserver' in window))) return;
  const circles = [...track.querySelectorAll('.step-number')];
  let svg, inView = false, frame;
  const update = () => {
    const paused = !inView || document.hidden || reducedMotion.matches;
    section.classList.toggle('flight-paused', paused);
    if (svg) paused ? svg.pauseAnimations() : svg.unpauseAnimations();
  };
  const draw = () => {
    cancelAnimationFrame(frame);
    svg?.remove(); section.classList.remove('flight-ready');
    const bounds = track.getBoundingClientRect();
    const points = circles.map(circle => {
      const r = circle.getBoundingClientRect();
      return [r.left - bounds.left + r.width / 2, r.top - bounds.top + r.height / 2];
    });
    const path = points.map(([x,y],i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ');
    const linePath = points.slice(1).map((end,i) => {
      const start=points[i], length=Math.hypot(end[0]-start[0],end[1]-start[1]);
      const dx=(end[0]-start[0])/length*22, dy=(end[1]-start[1])/length*22;
      return `M ${start[0]+dx} ${start[1]+dy} L ${end[0]-dx} ${end[1]-dy}`;
    }).join(' ');
    const firstLeg = Math.hypot(points[1][0]-points[0][0],points[1][1]-points[0][1]);
    const secondLeg = Math.hypot(points[2][0]-points[1][0],points[2][1]-points[1][1]);
    const middle = firstLeg / (firstLeg + secondLeg);
    track.insertAdjacentHTML('afterbegin', `<svg class="sharing-flight" viewBox="0 0 ${bounds.width} ${bounds.height}" aria-hidden="true" focusable="false"><path d="${linePath}" fill="none" stroke="currentColor" stroke-width="1.5"/><g><path d="M -11 -7 L 12 0 L -11 7 L -6 0 Z" fill="#2857B7" stroke="white" stroke-width="1.2"><animate attributeName="fill" values="#1C784A;#2857B7;#1C784A;#2857B7;#1C784A;#1C784A" keyTimes="0;.1;.45;.55;.9;1" calcMode="discrete" dur="9s" repeatCount="indefinite"/></path><animateMotion path="${path}" dur="9s" rotate="auto" keyPoints="0;0;${middle};${middle};1;1" keyTimes="0;.1;.45;.55;.9;1" calcMode="linear" repeatCount="indefinite"/></g></svg>`);
    svg = track.querySelector('.sharing-flight');
    svg.pauseAnimations(); svg.setCurrentTime(0);
    frame = requestAnimationFrame(() => { section.classList.add('flight-ready'); update(); });
  };
  const observer = new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting); update();
  }, {threshold:.1});
  observer.observe(section);
  const resize = new ResizeObserver(draw); resize.observe(track);
  const motionChange = () => { if (reducedMotion.matches) update(); else draw(); };
  document.addEventListener('visibilitychange', update);
  reducedMotion.addEventListener('change', motionChange);
  sharingCleanup = () => {
    observer.disconnect(); resize.disconnect(); cancelAnimationFrame(frame); svg?.remove();
    section.classList.remove('flight-ready','flight-paused');
    document.removeEventListener('visibilitychange', update);
    reducedMotion.removeEventListener('change', motionChange);
  };
  draw();
}
