// Build-time blog: content/blog/*.md -> public/blog/<slug>/index.html + an index.
// ponytail: static pages over a router/CMS — Vite serves public/ as-is, the canonical resolves,
// no SPA surgery. marked does the markdown; everything else is a string template.
import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "content", "blog");
const OUT = join(root, "public", "blog");

// trivial frontmatter: --- key: value --- then body
function parse(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return { meta, body: m[2] };
}

const esc = (s = "") =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const STYLE = `
:root{--bg:#0b0e14;--panel:#11151f;--line:#1f2633;--fg:#d7dce5;--dim:#7d8799;--accent:#7ee787;--cyan:#6cb6ff}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.7 ui-monospace,"SF Mono",Menlo,monospace}
a{color:var(--cyan);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:760px;margin:0 auto;padding:40px 20px 80px}
.top{color:var(--dim);font-size:13px;margin-bottom:32px}
h1{font-size:30px;line-height:1.25;margin:0 0 8px}h2{font-size:21px;margin:36px 0 12px;color:var(--accent)}
.meta{color:var(--dim);font-size:13px;margin:0 0 32px}
p{margin:0 0 18px}ul,ol{padding-left:22px}li{margin:6px 0}
code{background:var(--panel);border:1px solid var(--line);border-radius:4px;padding:1px 5px;font-size:13px}
pre{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:14px 16px;overflow-x:auto}
pre code{background:none;border:none;padding:0}strong{color:#fff}
hr{border:none;border-top:1px solid var(--line);margin:32px 0}
.posts{list-style:none;padding:0}.posts li{margin:0 0 22px}
.posts a{font-size:18px}.posts .d{color:var(--dim);font-size:13px}.posts .x{color:var(--dim);margin-top:4px}
footer{color:var(--dim);font-size:13px;margin-top:48px;border-top:1px solid var(--line);padding-top:20px}
`;

const page = (title, desc, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}"/>
<style>${STYLE}</style></head>
<body><div class="wrap">
<div class="top"><a href="/">← lucassantana.tech</a> · <a href="/blog/">blog</a></div>
${body}
<footer>Lucas Santana · <a href="/">lucassantana.tech</a> · <a href="https://github.com/LucasSantana-Dev">github</a></footer>
</div></body></html>`;

if (!existsSync(SRC)) {
  console.log("build-blog: no content/blog — skipping");
  process.exit(0);
}

const posts = [];
for (const file of readdirSync(SRC).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const { meta, body } = parse(readFileSync(join(SRC, file), "utf8"));
  const html = marked.parse(body);
  const article = `<article><h1>${esc(meta.title || slug)}</h1>
<div class="meta">${esc(meta.date || "")}</div>${html}</article>`;
  const dir = join(OUT, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(meta.title || slug, meta.description || "", article));
  posts.push({ slug, ...meta });
}

posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
const list = posts.length
  ? `<ul class="posts">${posts
      .map(
        (p) =>
          `<li><a href="/blog/${p.slug}/">${esc(p.title || p.slug)}</a><div class="d">${esc(p.date || "")}</div><div class="x">${esc(p.description || "")}</div></li>`
      )
      .join("")}</ul>`
  : `<p class="meta">No posts yet.</p>`;
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "index.html"), page("Blog — Lucas Santana", "Writing on AI dev tooling.", `<h1>Blog</h1>${list}`));

console.log(`build-blog: ${posts.length} post(s) -> public/blog/`);
