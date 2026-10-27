/* Lightweight preferences and progressive homepage enhancement. */
let heroCleanup = () => {};
function preferenceFields(p = state.preferences || {}) {
  const field = (key, label, choices) => `<label>${label}<select name="${key}" required><option value="">Choose ${label.toLowerCase()}</option>${choices.map(([v,t])=>`<option value="${v}" ${p[key]===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
  return field('grade','Grade band',[['any','Any grade'],['Elementary','Elementary'],['Middle','Middle school'],['High','High school']])+field('subject','Teaching area',[['any','Across subjects'],['math','Mathematics'],['science','Science'],['literacy','Literacy & reading'],['art','Arts']])+field('category','Resource type',[['any','Any resource'],['1','STEM & Lab'],['2','Curriculum Sets'],['3','Classroom Furniture'],['4','Storage & Office']]);
}
function finderSection() {
  return `<section class="section finder" aria-labelledby="finder-title"><div class="section-heading"><div><span class="eyebrow">A little more relevant</span><h2 id="finder-title">Find resources for your classroom.</h2></div><p>Three quick choices. Real catalog matches. Saved on this browser only.</p></div><form id="finder-form" class="preference-fields">${preferenceFields()}<button class="primary">Find my matches ↗</button></form><div id="finder-results"></div></section>`;
}
function matchingResources() { return M.recommendations(allAssets(), state.preferences).filter(a=>!a.local && !requestFor(a.id)); }
function bindFinder() {
  const show = () => {const matches=matchingResources(); $('#finder-results').innerHTML=`<p>${matches.length ? 'Matched to your choices. These simulated listings are free to request.' : 'No exact matches right now. Try broader preferences or explore all resources.'}</p><div class="featured-grid">${matches.map(a=>card(a,true)).join('')}</div><a class="text-link" href="#inventory">Browse all resources ↗</a>`;bindCommon();};
  $('#finder-form').onsubmit=e=>{e.preventDefault();if(!ensureFresh())return;state.preferences={...state.preferences,...Object.fromEntries(new FormData(e.target))};persist();show();};
  if(state.preferences?.category) show();
}
function startHero() {
  heroCleanup();
  const slides=[...document.querySelectorAll('[data-slide]')];if(!slides.length)return;
  let index=0, paused=reducedMotion.matches, hovering=false, focused=false;
  const container=$('.rotating-showcase'), pause=$('#hero-pause');
  const update=()=>{pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-label',`${paused?'Play':'Pause'} resource preview`);};
  const show=n=>{slides[index].hidden=true;index=(n+slides.length)%slides.length;slides[index].hidden=false;$('#hero-position').textContent=`${index+1} / ${slides.length}`;};
  $('#hero-prev').onclick=()=>show(index-1);$('#hero-next').onclick=()=>show(index+1);
  pause.onclick=()=>{paused=!paused;update();};
  container.onmouseenter=()=>hovering=true;container.onmouseleave=()=>hovering=false;
  container.onfocusin=()=>focused=true;container.onfocusout=e=>focused=container.contains(e.relatedTarget);
  const change=()=>{if(reducedMotion.matches){paused=true;update();}};reducedMotion.addEventListener('change',change);
  const timer=setInterval(()=>{if(!paused&&!hovering&&!focused&&!document.hidden&&!reducedMotion.matches)show(index+1);},7000);
  heroCleanup=()=>{clearInterval(timer);reducedMotion.removeEventListener('change',change);};update();
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
