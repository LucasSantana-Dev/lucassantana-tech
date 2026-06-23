// Build-time project pages: src/data/coreContent.ts projects[] -> public/projects/<slug>/index.html + an index.
// ponytail: reuse the static-page pattern from build-blog. coreContent.ts is pure data (only a type import),
// so esbuild's transform strips the types and we import it as ESM — no router, no new dep (esbuild ships with Vite).
import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "projects");
const BLOG_SRC = join(root, "content", "blog");

const ts = readFileSync(join(root, "src", "data", "coreContent.ts"), "utf8");
const { code } = await transform(ts, { loader: "ts", format: "esm" });
const mod = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
const projects = mod.projects ?? [];

const blogSlugs = new Set(
  existsSync(BLOG_SRC) ? readdirSync(BLOG_SRC).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")) : []
);

const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const STYLE = `
:root{--bg:#0b0e14;--panel:#11151f;--line:#1f2633;--fg:#d7dce5;--dim:#7d8799;--accent:#7ee787;--cyan:#6cb6ff}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.7 ui-monospace,"SF Mono",Menlo,monospace}
a{color:var(--cyan);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:780px;margin:0 auto;padding:40px 20px 80px}
.top{color:var(--dim);font-size:13px;margin-bottom:32px}
h1{font-size:30px;line-height:1.25;margin:0 0 6px}h2{font-size:18px;margin:32px 0 10px;color:var(--accent)}
.cat{color:var(--dim);font-size:13px;margin:0 0 22px}
p{margin:0 0 18px}ul{padding-left:20px;margin:0 0 8px}li{margin:6px 0}
.tags{display:flex;flex-wrap:wrap;gap:7px;margin:6px 0 4px}
.tag{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:3px 9px;font-size:12px;color:var(--dim)}
.links{margin-top:28px;display:flex;gap:18px;flex-wrap:wrap}
.cards{list-style:none;padding:0}.cards li{border:1px solid var(--line);background:var(--panel);border-radius:8px;padding:16px 18px;margin:0 0 12px}
.cards a.name{font-size:18px;font-weight:600;color:var(--cyan)}.cards .c{color:var(--dim);font-size:12px;margin:2px 0 8px}.cards .s{color:var(--dim);font-size:14px}
footer{color:var(--dim);font-size:13px;margin-top:48px;border-top:1px solid var(--line);padding-top:20px}
`;

const page = (title, desc, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"/>
<style>${STYLE}</style></head>
<body><div class="wrap">
<div class="top"><a href="/">← lucassantana.tech</a> · <a href="/projects/">projects</a> · <a href="/blog/">blog</a></div>
${body}
<footer>Lucas Santana · <a href="/">lucassantana.tech</a> · <a href="https://github.com/LucasSantana-Dev">github</a></footer>
</div></body></html>`;

const liList = (arr) => `<ul>${(arr || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

for (const p of projects) {
  const links = [];
  if (p.repoUrl) links.push(`<a href="${esc(p.repoUrl)}">Repository →</a>`);
  if (p.liveUrl) links.push(`<a href="${esc(p.liveUrl)}">Live →</a>`);
  if (blogSlugs.has(p.slug)) links.push(`<a href="/blog/${p.slug}/">Read the full write-up →</a>`);
  const body = `<article>
<h1>${esc(p.name)}</h1>
<div class="cat">${esc(p.category || "")}${p.organization ? " · " + esc(p.organization) : ""}</div>
<p>${esc(p.summary)}</p>
${p.architectureNotes?.length ? `<h2>Architecture</h2>${liList(p.architectureNotes)}` : ""}
${p.impact?.length ? `<h2>Impact</h2>${liList(p.impact)}` : ""}
${p.stack?.length ? `<h2>Stack</h2><div class="tags">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>` : ""}
<div class="links">${links.join("")}</div>
</article>`;
  const dir = join(OUT, p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(`${p.name} — Lucas Santana`, p.summary, body));
}

const cards = projects
  .map(
    (p) =>
      `<li><a class="name" href="/projects/${p.slug}/">${esc(p.name)}</a><div class="c">${esc(p.category || "")}</div><div class="s">${esc(p.summary)}</div></li>`
  )
  .join("");
mkdirSync(OUT, { recursive: true });
writeFileSync(
  join(OUT, "index.html"),
  page("Projects — Lucas Santana", "Things I've built.", `<h1>Projects</h1><ul class="cards">${cards}</ul>`)
);

console.log(`build-projects: ${projects.length} project pages -> public/projects/`);
