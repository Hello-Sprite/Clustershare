const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const css = fs.readFileSync("dist/style.css", "utf8");
function tokens(selector) {
  assert.ok(css.includes(selector), "Missing theme selector: " + selector);
  const block = css
    .slice(css.indexOf(selector) + selector.length)
    .split("}")[0];
  return Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*(#[\da-fA-F]+)/g)].map((m) => [
      m[1],
      m[2],
    ]),
  );
}
function luminance(hex) {
  if (hex.length === 4)
    hex =
      "#" +
      hex
        .slice(1)
        .split("")
        .map((c) => c + c)
        .join("");
  return hex
    .slice(1)
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
    .reduce((n, x, i) => n + x * [0.2126, 0.7152, 0.0722][i], 0);
}
function check(name, foreground, background) {
  const [lo, hi] = [luminance(foreground), luminance(background)].sort(
    (a, b) => a - b,
  );
  const ratio = (hi + 0.05) / (lo + 0.05);
  assert.ok(ratio >= 4.5, `${name}: ${ratio.toFixed(2)}:1`);
}
for (const [name, selector] of [
  ["light", ":root {"],
  ["dark", ':root[data-theme="dark"] {'],
])
  test(`${name} theme uses AA normal-text contrast for reusable text/action tokens`, () => {
    const t = tokens(selector);
    for (const fg of ["ink", "muted", "blue", "evergreen"])
      for (const bg of ["canvas", "surface", "sage"])
        check(`${name} ${fg}/${bg}`, t[fg], t[bg]);
    check(`${name} primary action`, "#fff", t.primary);
    check(`${name} hovered action`, "#fff", t.hover);
    check(`${name} pending status`, t.pending, t["pending-bg"]);
  });
test("resource and illustration labels retain normal-text contrast", () => {
  check("Available badge", "#234b96", "#dce8fb");
  check("Free badge", "#172b3a", "#fff");
  check("Hero resource", "#172b3a", "#e7eef2");
  check("Hero lab", "#172b3a", "#e7eef2");
  check("Loading image", "#4d6170", "#e7eef2");
  check("Inventory invitation", "#f0f5f8", "#172b3a");
});
test("control boundaries and focus indicators have at least 3:1 adjacent contrast", () => {
  for (const selector of [":root {", ':root[data-theme="dark"] {']) {
    const t = tokens(selector);
    for (const fg of ["control-line", "focus"])
      for (const bg of ["canvas", "surface", "sage"]) {
        const [lo, hi] = [luminance(t[fg]), luminance(t[bg])].sort(
          (a, b) => a - b,
        );
        assert.ok((hi + 0.05) / (lo + 0.05) >= 3, `${fg}/${bg}`);
      }
  }
});
test("cool product wells and quiet supporting surfaces retain text contrast", () => {
  check("Photo-well label", "#172b3a", "#e7eef2");
  check("Focus on a light photo well in either theme", "#2857b7", "#e7eef2");
  check("Light quiet metadata", "#4d6170", "#e7eef2");
  check("Dark quiet metadata", "#bdccd7", "#203647");
});

test("coral errors and example gold accents retain readable labels", () => {
check("Coral on white", "#b94a35", "#ffffff");
check("Coral on slate", "#b94a35", "#f3f6f8");
check("Dark coral", "#ffb7a6", "#101e2a");
check("Gold status text", "#705212", "#f7edcf");
});
test('completed sharing steps keep readable white labels on the animated green state', () => {
  const design = fs.readFileSync('dist/design.css', 'utf8');
  const green = design.match(/--sharing-green:\s*(#[\da-fA-F]+)/)?.[1];
  assert.ok(green, 'Missing sharing completion color');
  check('Completed step label', '#ffffff', green);
});
