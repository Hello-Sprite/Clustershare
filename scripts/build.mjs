import { build } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const coreFiles = ["catalog", "model", "storage", "home", "workspace", "personalize", "photo", "app"];
await writeFile("dist/app-runtime.js", "(() => {\n" + (await Promise.all(coreFiles.map(name => readFile(`dist/${name}.js`, "utf8")))).join("\n") + "\n})();\n");
await build({
  entryPoints: ["components/ui/reveal-runtime.tsx"],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: "dist/reveal.js",
});

const html = await readFile("dist/index.html", "utf8");
const revision = createHash("sha256").update((await Promise.all(["app-runtime.js", "style.css", "design.css", "startup.js"].map(name => readFile(`dist/${name}`)))).join("\n")).digest("hex").slice(0,12);
await writeFile("dist/index.html", html.replace(/(style\.css|design\.css|startup\.js|app-runtime\.js)\?v=[^" ]+/g, "$1?v=" + revision));
