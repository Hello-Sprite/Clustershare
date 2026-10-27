const { test } = require("node:test");
const assert = require("node:assert/strict");
const { buildSync } = require("esbuild");
const { createRequire } = require("node:module");
const { resolve } = require("node:path");
const vm = require("node:vm");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const output = buildSync({
  entryPoints: ["components/ui/reveal.tsx"],
  bundle: true,
  write: false,
  format: "cjs",
  platform: "node",
  packages: "external",
  jsx: "automatic",
}).outputFiles[0].text;
const moduleBox = { exports: {} };
vm.runInNewContext(output, {
  module: moduleBox,
  exports: moduleBox.exports,
  require: createRequire(resolve("components/ui/reveal.tsx")),
});
const Reveal = moduleBox.exports.default;
test("Reveal keeps section content visible in a non-animation server environment", () => {
  const html = renderToStaticMarkup(
    React.createElement(
      Reveal,
      { index: 20, className: "section-group" },
      React.createElement(
        "section",
        { id: "sharing" },
        React.createElement("h2", null, "Classroom handoff"),
      ),
    ),
  );
  assert.match(html, /Classroom handoff/);
  assert.match(html, /reveal-frame section-group/);
  assert.doesNotMatch(html, /opacity:0/);
  assert.doesNotMatch(html, /blur\(/);
});
test("Reveal accepts children without requiring styling or a stagger index", () => {
  const html = renderToStaticMarkup(
    React.createElement(
      Reveal,
      null,
      React.createElement("p", null, "Available immediately"),
    ),
  );
  assert.match(html, /Available immediately/);
  assert.doesNotMatch(html, /translateY/);
});
