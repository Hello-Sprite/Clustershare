const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
test('published core contains all renderers and model/storage dependencies in one scope',()=>{
  const core=fs.readFileSync('dist/app-runtime.js','utf8');
  const context={};
  // Stop before app initialization, after its packaged dependencies have executed.
  const probe=core.replace('const $ =', 'globalThis.contract = [typeof renderHome,typeof renderInventory,typeof renderItems,typeof renderLedger,typeof ClusterModel,typeof ClusterStorage,typeof ClusterPhoto]; return; const $ =');
  vm.runInNewContext(probe,context);
  assert.deepEqual(Array.from(context.contract),['function','function','function','function','object','object','object']);
  const html=fs.readFileSync('dist/index.html','utf8');
  assert.ok(html.includes('app-runtime.js?v='));
  assert.ok(!html.includes('src="home.js'));
});
test('startup failure provides a reload action without reading or resetting saved records',()=>{
  const events={}; const main={innerHTML:''}; let reloads=0;
  const retry={};
  const context={HTMLScriptElement:class {},document:{querySelector:s=>s==='main'?main:retry},location:{reload:()=>reloads++}};
  context.window={addEventListener:(name,fn)=>events[name]=fn};
  vm.runInNewContext(fs.readFileSync('dist/startup.js','utf8'),context);
  events.load();
  assert.match(main.innerHTML,/saved listings and requests have not been reset/);
  assert.equal(typeof retry.onclick,'function'); retry.onclick(); assert.equal(reloads,1);
  main.innerHTML='Rendered home'; context.window.ClusterStartup.ready(); events.load();
  assert.equal(main.innerHTML,'Rendered home');
});
