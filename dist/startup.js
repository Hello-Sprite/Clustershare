/* This small guard is separate from the atomic core so network/startup failures stay visible. */
(() => {
  let ready = false;
  function fail() {
    const main = document.querySelector('main');
    if (!main) return;
    main.innerHTML = '<section class="startup-state" role="alert"><h1>ClusterShare could not open this view.</h1><p>A required part of the app did not load. Your saved listings and requests have not been reset.</p><button class="primary" id="retry-startup">Reload ClusterShare</button><p>If this continues, check that the local preview server is running.</p></section>';
    document.querySelector('#retry-startup').onclick = () => location.reload();
  }
  window.ClusterStartup = {ready() { ready = true; }, fail};
  window.addEventListener('error', event => {
    if (!ready || (event.target instanceof HTMLScriptElement && event.target.src.includes('app-runtime.js'))) fail();
  }, true);
  window.addEventListener('load', () => { if (!ready) fail(); }, {once:true});
})();
