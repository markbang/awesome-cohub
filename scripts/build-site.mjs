#!/usr/bin/env node
/* Build the Awesome Cohub static site.
   Usage: node scripts/build-site.mjs
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const MD = require("../site-src/markdown.js");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs", "cohub-is-all-you-need");
const OUT = path.join(ROOT, "site");
const REPO = "https://github.com/markbang/awesome-cohub";
const BLOB = `${REPO}/blob/main/docs/cohub-is-all-you-need`;
const CDN = "https://cdn.jsdelivr.net/gh/markbang/awesome-cohub@main";

const ROOT_BASE = process.env.SITE_BASE || "";

const C = {
  playbooks: { en: "Playbooks", zh: "实践卡", noteEn: "Task-shaped recipes", noteZh: "按任务组织的配方" },
  concepts: { en: "Concepts", zh: "概念", noteEn: "The nouns behind the product", noteZh: "产品背后的名词" },
  "anti-patterns": { en: "Anti-patterns", zh: "反模式", noteEn: "Ways projects break", noteZh: "项目常见的坏做法" },
  cheatsheets: { en: "Cheatsheets", zh: "速查", noteEn: "Commands and tables", noteZh: "命令与表格" },
  cookbooks: { en: "Cookbooks", zh: "Cookbook", noteEn: "End-to-end builds", noteZh: "端到端搭建" },
  reference: { en: "Reference", zh: "参考", noteEn: "Manifesto, matrix, glossary", noteZh: "主文、矩阵、术语" },
};

const ROOT_DOCS = [
  ["manifesto", "manifesto"],
  ["learning-path", "learning-path"],
  ["glossary", "glossary"],
  ["matrix", "matrix"],
  ["samples", "samples"],
  ["AGENT_BRIEF", "agent-brief"],
  ["CHANGELOG", "changelog"],
];

const PATHS = {
  en: [
    {
      n: "01",
      title: "Ship your first App",
      body: "Space, Save, publish. The shortest path from a blank Space to a public URL.",
      steps: [
        ["playbooks-scratch-to-checkpoint", "From blank Space to first Save"],
        ["playbooks-publish-static-work", "Publish a static App"],
        ["playbooks-work-lifecycle", "Publish, version, disable"],
      ],
    },
    {
      n: "02",
      title: "Set up your agent",
      body: "Rules, skills, and prompts that follow you into every Space.",
      steps: [
        ["playbooks-user-config-and-rules", "Own your agent defaults"],
        ["playbooks-dot-cohub-layers", "`.cohub` and `.agents` priority"],
        ["playbooks-skill-slash-discovery", "Discover skills with /skill:"],
      ],
    },
    {
      n: "03",
      title: "Build a Board",
      body: "The v3 document model, scripts, animation, and deterministic export.",
      steps: [
        ["concepts-board-runtime", "Board runtime"],
        ["playbooks-board-export-and-playback", "Author, export, playback"],
        ["playbooks-multimodal-pipeline", "Generate and materialize media"],
      ],
    },
    {
      n: "04",
      title: "Run it locally",
      body: "Bind a folder to a Space and execute turns on Pi or Codex.",
      steps: [
        ["concepts-local-runtime", "Local Runtime"],
        ["playbooks-local-runtime", "Up, logs, attach, import"],
        ["concepts-decision-models", "Structured decisions"],
      ],
    },
  ],
  zh: [
    {
      n: "01",
      title: "发布第一个 App",
      body: "Space、Save、发布。从空白 Space 到公开 URL 的最短路径。",
      steps: [
        ["playbooks-scratch-to-checkpoint", "从空白 Space 到第一次存档"],
        ["playbooks-publish-static-work", "发布静态 App"],
        ["playbooks-work-lifecycle", "发布、版本与停用"],
      ],
    },
    {
      n: "02",
      title: "配置你的 Agent",
      body: "让规则、skills 与 prompts 跟随你进入每个 Space。",
      steps: [
        ["playbooks-user-config-and-rules", "管理个人 Agent 默认"],
        ["playbooks-dot-cohub-layers", "`.cohub` 与 `.agents` 优先级"],
        ["playbooks-skill-slash-discovery", "用 /skill: 发现技能"],
      ],
    },
    {
      n: "03",
      title: "搭一个 Board",
      body: "v3 文档模型、脚本、动画与确定性导出。",
      steps: [
        ["concepts-board-runtime", "Board 运行时"],
        ["playbooks-board-export-and-playback", "编辑、导出与回放"],
        ["playbooks-multimodal-pipeline", "生成并落盘多模态素材"],
      ],
    },
    {
      n: "04",
      title: "在本机运行",
      body: "把目录绑定到 Space，用 Pi 或 Codex 执行回合。",
      steps: [
        ["concepts-local-runtime", "Local Runtime"],
        ["playbooks-local-runtime", "启动、日志、attach、import"],
        ["concepts-decision-models", "结构化判断"],
      ],
    },
  ],
};

const UI = {
  en: {
    tagline: "A curated map of the Cohub ecosystem",
    heroA: "Build with people",
    heroB: "and agents.",
    lede: "Skills, playbooks, and the product surface — indexed, bilingual, and ready to copy.",
    navSkills: "Skills",
    ctaSkills: "Browse skills",
    ctaGuide: "Read the guide",
    quick: "Quick start",
    statSkills: "skills",
    statPages: "guide pages",
    statVersion: "Cohub release",
    statLangs: "languages",
    start: "Start here",
    startNote: "Four routes into the product",
    skills: "Skill catalog",
    skillsNote: "Install with npx skills",
    skillsAll: "All",
    skillsPlatform: "Platform",
    skillsEcosystem: "Ecosystem",
    skillsSearch: "Filter skills…",
    library: "Library",
    libraryNote: "Everything in Cohub Is All You Need",
    librarySearch: "Search the library…",
    resources: "Resources",
    resourcesNote: "Official entry points",
    docs: "Docs",
    guide: "Guide",
    github: "GitHub",
    home: "Home",
    theme: "Toggle theme",
    menu: "Menu",
    search: "Search",
    footer: "Curated by markbang and the Cohub community.",
    edit: "Edit this page",
    githubSource: "View source",
    prev: "Previous",
    next: "Next",
    toc: "On this page",
    libraryTitle: "The whole map",
    libraryLede: "Every playbook, concept, anti-pattern, cheatsheet, and cookbook. Search it, or jump to a section.",
    skillsTitle: "Skills for the ecosystem",
    skillsLede: "Platform skills ship with Cohub. Ecosystem skills are community-built. Copy the command and install into `.agents/skills/`.",
    startTitle: "Pick a route",
    startLede: "No single right order. Start where the work is.",
    refTitle: "Reference",
    refLede: "The long-form map: principles, scenario matrix, and vocabulary.",
    all: "All",
  },
  zh: {
    tagline: "Cohub 生态的策展地图",
    heroA: "与人，",
    heroB: "与 Agent 共创。",
    lede: "Skills、实践卡与产品能力，双语索引，复制即用。",
    navSkills: "Skills",
    ctaSkills: "浏览 Skills",
    ctaGuide: "阅读指南",
    quick: "快速开始",
    statSkills: "个 Skills",
    statPages: "页指南",
    statVersion: "Cohub 版本",
    statLangs: "种语言",
    start: "从这里开始",
    startNote: "四条进入产品的路线",
    skills: "Skill 目录",
    skillsNote: "用 npx skills 安装",
    skillsAll: "全部",
    skillsPlatform: "平台",
    skillsEcosystem: "生态",
    skillsSearch: "筛选 Skills…",
    library: "资料库",
    libraryNote: "Cohub Is All You Need 的全部内容",
    librarySearch: "搜索资料库…",
    resources: "资源",
    resourcesNote: "官方入口",
    docs: "文档",
    guide: "指南",
    github: "GitHub",
    home: "首页",
    theme: "切换主题",
    menu: "菜单",
    search: "搜索",
    footer: "由 markbang 与 Cohub 社区共同策展。",
    edit: "编辑此页",
    githubSource: "查看源码",
    prev: "上一篇",
    next: "下一篇",
    toc: "本页目录",
    libraryTitle: "整张地图",
    libraryLede: "实践卡、概念、反模式、速查与 Cookbook。可以搜索，也可以按分区浏览。",
    skillsTitle: "生态 Skills",
    skillsLede: "平台 Skills 随 Cohub 发布，生态 Skills 来自社区。复制命令，安装到 `.agents/skills/`。",
    startTitle: "选择一条路线",
    startLede: "没有唯一正确的顺序，从手头的工作开始。",
    refTitle: "参考",
    refLede: "长文地图：原则、场景矩阵与术语。",
    all: "全部",
  },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) return { meta: {}, body: text };
  const end = text.indexOf("\n---", 4);
  if (end < 0) return { meta: {}, body: text };
  const raw = text.slice(4, end).split("\n");
  const meta = {};
  let key = null;
  for (const line of raw) {
    if (!line.trim()) continue;
    if (/^\s+-\s+/.test(line) && key) {
      if (!Array.isArray(meta[key])) meta[key] = [];
      meta[key].push(line.replace(/^\s+-\s+/, "").trim());
    } else if (line.includes(":")) {
      const i = line.indexOf(":");
      key = line.slice(0, i).trim();
      const v = line.slice(i + 1).trim();
      if (!v) meta[key] = [];
      else if (v.startsWith("[") && v.endsWith("]"))
        meta[key] = v.slice(1, -1).split(",").map((x) => x.trim()).filter(Boolean);
      else meta[key] = v;
    }
  }
  return { meta, body: text.slice(end + 4).replace(/^\n+/, "") };
}

function splitTitle(body) {
  const m = body.match(/^#\s+(.+)$/m);
  if (!m) return { title: "", body };
  const idx = body.indexOf(m[0]);
  return { title: m[1].replace(/\s+#+\s*$/, "").trim(), body: body.slice(idx + m[0].length).replace(/^\n+/, "") };
}

function stripFooter(body) {
  return body.replace(/\n---\n\s*\[(中文|English)\]\([^)]+\)\s*$/, "").replace(/\n{3,}$/, "\n").trim() + "\n";
}

function plain(s) {
  return s
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function summary(body, limit = 190) {
  const clean = body.replace(/^#{1,6}\s.*$/gm, "").replace(/```[\s\S]*?```/g, "");
  for (const block of clean.split(/\n{2,}/)) {
    const line = block.split("\n").find((l) => l.trim() && !/^[|\->\d]/.test(l.trim()));
    if (!line) continue;
    const text = plain(line);
    if (text.length > 24) return text.length > limit ? text.slice(0, limit - 1).trimEnd() + "…" : text;
  }
  return "";
}

function slugify(rel) {
  return rel.replace(/\.md$/, "").replace(/\//g, "-");
}

function walk(base, prefix = "") {
  const out = [];
  if (!fs.existsSync(base)) return out;
  for (const entry of fs.readdirSync(base, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith(".") || entry.name === "assets") continue;
    if (base === DOCS && entry.name === "zh") continue;
    const full = path.join(base, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(full, rel));
    else if (
      entry.name.endsWith(".md") &&
      entry.name !== "README.md" &&
      !ROOT_DOCS.some(([f]) => f + ".md" === entry.name)
    )
      out.push(rel);
  }
  return out;
}

function loadDocs(lang) {
  const base = lang === "en" ? DOCS : path.join(DOCS, "zh");
  const items = [];
  for (const rel of walk(base)) {
    const raw = fs.readFileSync(path.join(base, rel), "utf8");
    const { meta, body: b0 } = parseFrontmatter(raw);
    const { title, body } = splitTitle(b0);
    const collection = rel.includes("/") ? rel.split("/")[0] : "reference";
    items.push({
      lang,
      rel,
      slug: slugify(rel),
      collection: C[collection] ? collection : "reference",
      title: title || meta.title || rel,
      id: meta.id || "",
      type: meta.type || collection,
      difficulty: meta.difficulty || "",
      audience: meta.audience || [],
      body: stripFooter(body),
      desc: summary(stripFooter(body)),
    });
  }
  for (const [file, slugBase] of ROOT_DOCS) {
    const raw = fs.readFileSync(path.join(base, `${file}.md`), "utf8");
    const { meta, body: b0 } = parseFrontmatter(raw);
    const { title, body } = splitTitle(b0);
    items.push({
      lang,
      rel: `${file}.md`,
      slug: `${slugBase}`,
      collection: "reference",
      title,
      id: meta.id || "",
      type: meta.type || "guide",
      difficulty: "",
      audience: meta.audience || [],
      body: stripFooter(body),
      desc: summary(stripFooter(body)),
    });
  }
  return items;
}

const FILE_SLUGS = {
  "AGENT_BRIEF.md": "agent-brief",
  "CHANGELOG.md": "changelog",
  "README.md": "index",
  "manifesto.md": "manifesto",
  "learning-path.md": "learning-path",
  "glossary.md": "glossary",
  "matrix.md": "matrix",
  "samples.md": "samples",
};

function rewriteHtml(html, srcRel, lang, base) {
  return html.replace(/(href|src)="([^"]+)"/g, (full, attr, url) => {
    if (/^(https?:|mailto:|#)/.test(url)) return full;
    const [p0, hash] = url.split("#");
    let p = p0;
    if (!p) return full;
    let resolved;
    if (p.startsWith("/")) resolved = p.slice(1);
    else resolved = path.posix.normalize(path.posix.join(path.posix.dirname(srcRel), p));
    resolved = resolved.replace(/^\.\//, "").replace(/^(\.\.\/)+/, "");
    if (resolved.startsWith("assets/")) {
      return `${attr}="${CDN}/docs/cohub-is-all-you-need/${resolved}"`;
    }
    if (attr === "src") {
      return `${attr}="${CDN}/docs/cohub-is-all-you-need/${resolved}"`;
    }
    let out;
    if (/^README\.md$/i.test(resolved) || resolved === "." || resolved === "") {
      out = lang === "zh" ? "zh/index.html" : "index.html";
    } else {
      let targetLang = lang;
      let rest = resolved;
      if (rest.startsWith("zh/")) {
        targetLang = "zh";
        rest = rest.slice(3);
      }
      rest = rest.replace(/^\.\//, "").replace(/\/$/, "");
      const file = rest.split("/").pop();
      if (FILE_SLUGS[file]) rest = FILE_SLUGS[file];
      else if (rest.endsWith(".md")) rest = rest.slice(0, -3).replace(/\//g, "-");
      out = `${targetLang === "zh" ? "zh/" : "en/"}${rest}.html`;
    }
    return `${attr}="${base}${out}${hash ? "#" + hash : ""}"`;
  });
}

function tocOf(html) {
  const rows = [];
  const re = /<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g;
  let m;
  while ((m = re.exec(html))) rows.push({ level: +m[1], id: m[2], text: plain(m[3].replace(/<[^>]+>/g, "")) });
  return rows;
}

function icon(name) {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    github:
      '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}

function header(lang, base, active, otherBase = base) {
  const t = UI[lang];
  const other = lang === "en" ? "zh" : "en";
  const otherHref = `${otherBase}${other}/index.html`;
  const nav = [
    ["skills", `${base}${lang}/skills.html`, t.navSkills],
    ["library", `${base}${lang}/library.html`, t.library],
    ["start", `${base}#start`, t.start],
    ["resources", `${base}#resources`, t.resources],
  ];
  return `<header class="top">
  <a class="brand" href="${base}${lang}/index.html"><img src="${base}assets/logo.svg" alt="" width="22" height="22" /><span>Awesome <em>Cohub</em></span></a>
  <nav aria-label="Primary">${nav
    .map(([k, href, label]) => `<a href="${href}"${k === active ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("")}</nav>
  <div class="top-actions">
    <button class="icon-btn menu-btn" type="button" data-menu aria-label="${t.menu}">${icon("menu")}</button>
    <button class="search-btn" type="button" data-search-open aria-label="${t.search}">${icon("search")}<span class="label">${t.search}</span><kbd>⌘K</kbd></button>
    <a class="lang-btn" href="#" data-lang hreflang="${other}">${lang === "en" ? "中文" : "EN"}</a>
    <button class="icon-btn" type="button" data-theme-toggle aria-label="${t.theme}">${icon("sun")}${icon("moon")}</button>
    <a class="icon-btn github-link" href="${REPO}" target="_blank" rel="noreferrer" aria-label="GitHub">${icon("github")}</a>
  </div>
</header>`;
}

function footer(lang, base) {
  const t = UI[lang];
  return `<footer><div class="inner">
  <span>Awesome Cohub · guide v0.21 · Cohub v2.70</span>
  <span>${t.footer}</span>
  <span class="spacer"></span>
  <a href="${base}${lang}/library.html">${t.library}</a>
  <a href="${REPO}" target="_blank" rel="noreferrer">GitHub ↗</a>
  <a href="https://cohub.live" target="_blank" rel="noreferrer">cohub.live ↗</a>
</div></footer>`;
}

function shell({ lang, base, title, desc, body, active = "", mode = "page", otherBase = base }) {
  return `<!doctype html>
<html lang="${lang === "zh" ? "zh-CN" : "en"}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<base href="${ROOT_BASE}/" />
<meta name="description" content="${esc(desc)}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://cdn.jsdelivr.net/gh/markbang/awesome-cohub@main/docs/cohub-is-all-you-need/assets/banner.png" />
<meta name="theme-color" content="#0b0c0f" />
<link rel="icon" href="${base}assets/logo.svg" type="image/svg+xml" />
<link rel="stylesheet" href="${base}assets/style.css" />
<script>
(function(){try{var t=localStorage.getItem("ac-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();
</script>
</head>
<body data-mode="${mode}">
<a class="skip" href="#main">Skip to content</a>
${header(lang, base, active, otherBase)}
${body}
${footer(lang, base)}
<script>window.__AC_INDEX_URL=${JSON.stringify((base || "") + "search-index.js")};window.__AC_BASE=${JSON.stringify(ROOT_BASE ? ROOT_BASE + "/" : "")};</script>
<script src="${base}assets/app.js" defer></script>
</body>
</html>`;
}

function readingTime(body, lang) {
  const text = plain(body);
  if (lang === "zh") return Math.max(1, Math.round([...text].length / 420));
  return Math.max(2, Math.round(text.split(/\s+/).length / 220));
}

function docPage(lang, doc, all, base) {
  const t = UI[lang];
  const html = rewriteHtml(MD.render(doc.body), doc.rel, lang, base);
  const toc = tocOf(html);
  const same = all.filter((d) => d.collection === doc.collection && d.lang === lang);
  const idx = same.findIndex((d) => d.slug === doc.slug);
  const prev = same[idx - 1];
  const next = same[idx + 1];
  const collLabel = C[doc.collection]?.[lang] || doc.collection;
  const metaBits = [
    `<span class="pill accent">${esc(collLabel)}</span>`,
    doc.difficulty ? `<span class="pill">${esc(doc.difficulty)}</span>` : "",
    doc.id ? `<span class="id">${esc(doc.id)}</span>` : "",
    `<span class="pill dim">${readingTime(doc.body, lang)} min</span>`,
  ].join("");
  const tocHtml = toc.length
    ? `<div class="rail-block"><h2>${t.toc}</h2>${toc
        .map((h) => `<a href="#${h.id}" style="padding-left:${h.level === 3 ? 22 : 10}px">${esc(h.text)}</a>`)
        .join("")}</div>`
    : "";
  const related = `<div class="card-foot">
    <a href="${BLOB}/${lang === "zh" ? "zh/" : ""}${doc.rel}" target="_blank" rel="noreferrer">${t.edit} ↗</a>
    <span class="spacer"></span>
    ${prev ? `<a href="${base}${lang}/${prev.slug}.html">← ${esc(prev.title)}</a>` : ""}
    ${next ? `<a href="${base}${lang}/${next.slug}.html">${esc(next.title)} →</a>` : ""}
  </div>`;
  const body = `<div class="shell">
  <aside class="rail" aria-label="${esc(collLabel)}">
    <h2>${esc(collLabel)}</h2>
    ${same.map((d) => `<a href="${base}${lang}/${d.slug}.html"${d.slug === doc.slug ? ' aria-current="page"' : ""}>${esc(d.title)}</a>`).join("")}
    ${tocHtml}
  </aside>
  <main class="main" id="main">
    <div class="breadcrumbs"><a href="${base}${lang}/index.html">${t.home}</a><span>/</span><a href="${base}${lang}/library.html">${t.library}</a><span>/</span><span>${esc(collLabel)}</span></div>
    <div class="card-head">${metaBits}</div>
    <article class="prose">${html}${related}</article>
  </main>
</div>`;
  const docSlug = doc.rel.replace(/\.md$/, "").replace(/^zh\//, "").replace(/\//g, "-");
  return shell({
    lang,
    base,
    otherBase: lang === "en" ? "../zh/" : "../en/",
    title: `${doc.title} · Awesome Cohub`,
    desc: doc.desc || doc.title,
    body,
    active: "library",
    mode: "doc",
  });
}

function listPage(lang, collection, all, base) {
  const t = UI[lang];
  const c = C[collection] || C.playbooks;
  const rows = all
    .filter((d) => d.collection === collection)
    .sort((a, b) => a.title.localeCompare(b.title));
  const body = `<div class="shell">
  <aside class="rail" aria-label="${esc(t.library)}">
    ${Object.entries(C)
      .map(
        ([k, v]) =>
          `<a href="${base}${lang}/${k}.html"${k === collection ? ' aria-current="page"' : ""}>${esc(v[lang])}<span class="count">${
            all.filter((d) => d.collection === k).length
          }</span></a>`
      )
      .join("")}
  </aside>
  <main class="main" id="main">
    <div class="breadcrumbs"><a href="${base}${lang}/index.html">${t.home}</a><span>/</span><a href="${base}${lang}/library.html">${t.library}</a><span>/</span><span>${esc(c[lang])}</span></div>
    <div class="index-head"><h1>${esc(c[lang])}</h1><p>${esc(c["note" + (lang === "zh" ? "Zh" : "En")])}</p></div>
    <div class="filters">
      <input id="grid-filter" class="filter-input" type="search" placeholder="${t.librarySearch}" aria-label="${t.librarySearch}" />
    </div>
    <div class="entry-list">
      ${rows
        .map(
          (d) => `<a class="entry" href="${base}${lang}/${d.slug}.html">
        <div><h3>${esc(d.title)}</h3><p>${esc(d.desc || d.id)}</p></div>
        <div class="meta">${d.difficulty ? `<span>${esc(d.difficulty)}</span>` : ""}<span>${esc(d.type)}</span></div>
      </a>`
        )
        .join("")}
    </div>
    <div class="empty" id="grid-empty" hidden>${t.all} · 0</div>
  </main>
</div>`;
  return shell({
    lang,
    base,
    title: `${c[lang]} · Awesome Cohub`,
    desc: c["note" + (lang === "zh" ? "Zh" : "En")],
    body,
    active: "library",
    mode: "grid",
  });
}

function libraryPage(lang, docs, base) {
  const t = UI[lang];
  const collections = ["playbooks", "concepts", "anti-patterns", "cheatsheets", "cookbooks", "reference"];
  const body = `<div class="shell">
  <aside class="rail" aria-label="${esc(t.library)}">
    ${collections
      .map(
        (k) =>
          `<a href="${base}${lang}/${k}.html">${esc(C[k][lang])}<span class="count">${docs.filter((d) => d.collection === k).length}</span></a>`
      )
      .join("")}
  </aside>
  <main class="main" id="main">
    <div class="breadcrumbs"><a href="${base}${lang}/index.html">${t.home}</a><span>/</span><span>${t.library}</span></div>
    <div class="index-head"><h1>${t.libraryTitle}</h1><p>${t.libraryLede}</p></div>
    <div class="filters">
      <input id="grid-filter" class="filter-input" type="search" placeholder="${t.librarySearch}" aria-label="${t.librarySearch}" />
    </div>
    <div class="entry-list">
      ${collections
        .flatMap((c) =>
          docs
            .filter((d) => d.collection === c)
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(
              (d) => `<a class="entry" href="${base}${lang}/${d.slug}.html">
          <div><h3>${esc(d.title)}</h3><p>${esc(d.desc || d.id)}</p></div>
          <div class="meta"><span>${esc(C[c][lang])}</span>${d.difficulty ? `<span>${esc(d.difficulty)}</span>` : ""}</div>
        </a>`
            )
        )
        .join("")}
    </div>
    <div class="empty" id="grid-empty" hidden>${t.all} · 0</div>
  </main>
</div>`;
  return shell({
    lang,
    base,
    title: `${t.library} · Awesome Cohub`,
    desc: t.libraryLede,
    body,
    active: "library",
    mode: "grid",
  });
}

function skillsPage(lang, skills, base) {
  const t = UI[lang];
  const rows = skills
    .map(
      (s) => `<div class="entry skill-entry">
    <div><h3><a href="${s.url}" target="_blank" rel="noreferrer">${esc(s.name)}</a></h3><p>${esc(lang === "zh" ? s.descZh : s.descEn)}</p>
    <p class="cmdline">npx skills add ${esc(s.repoRoot.replace("https://github.com/", ""))} --skill ${esc(s.name)}</p></div>
    <div class="meta"><span>${s.category === "platform" ? t.skillsPlatform : t.skillsEcosystem}</span><button class="copy-btn" type="button" data-copy="npx skills add ${esc(s.repoRoot)} --skill ${esc(s.name)} --yes --copy">copy</button></div>
  </div>`
    )
    .join("");
  const body = `<div class="shell">
  <aside class="rail"><h2>${t.skills}</h2><a href="${base}${lang}/skills.html" aria-current="page">${t.skillsAll}<span class="count">${skills.length}</span></a><a href="${base}${lang}/skills.html#platform">${t.skillsPlatform}<span class="count">${skills.filter((s) => s.category === "platform").length}</span></a><a href="${base}${lang}/skills.html#ecosystem">${t.skillsEcosystem}<span class="count">${skills.filter((s) => s.category !== "platform").length}</span></a></aside>
  <main class="main" id="main">
    <div class="breadcrumbs"><a href="${base}${lang}/index.html">${t.home}</a><span>/</span><span>${t.skills}</span></div>
    <div class="index-head"><h1>${t.skillsTitle}</h1><p>${t.skillsLede}</p></div>
    <div class="filters">
      <input id="grid-filter" class="filter-input" type="search" placeholder="${t.skillsSearch}" aria-label="${t.skillsSearch}" />
    </div>
    <div class="entry-list">${rows}</div>
    <div class="empty" id="grid-empty" hidden>${t.all} · 0</div>
  </main>
</div>`;
  return shell({
    lang,
    base,
    title: `${t.skills} · Awesome Cohub`,
    desc: t.skillsLede,
    body,
    active: "skills",
    mode: "grid",
  });
}

function readmeSections(lang) {
  const file = lang === "en" ? "README.md" : "README_zh_CN.md";
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  const sections = {};
  let current = "";
  for (const line of text.split("\n")) {
    const h = line.match(/^##\s+(.+)$/);
    if (h) {
      current = h[1].trim();
      sections[current] = [];
    } else if (current && line.startsWith("- ")) {
      sections[current].push(line.slice(2).trim());
    }
  }
  return sections;
}

function parseSkills() {
  const en = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
  const zh = fs.readFileSync(path.join(ROOT, "README_zh_CN.md"), "utf8");
  const rows = (text) =>
    text
      .split("\n")
      .map((l) => l.match(/^\|\s*\*\*(.+?)\*\*\s*\|\s*\[(.+?)\]\((.+?)\)\s*\|\s*(.+?)\s*\|$/))
      .filter(Boolean)
      .map((m) => ({ name: m[1], repo: m[2], url: m[3], desc: m[4] }));
  const enRows = rows(en);
  const zhMap = new Map(rows(zh).map((r) => [r.name, r.desc]));
  return enRows.map((r) => {
    let repoRoot = r.url.split("/tree/")[0];
    return {
      name: r.name,
      repo: r.repo,
      url: r.url,
      repoRoot,
      descEn: plain(r.desc),
      descZh: plain(zhMap.get(r.name) || r.desc),
      category: r.url.includes("talesofai/cohub/tree/") ? "platform" : "ecosystem",
    };
  });
}

function parseResources() {
  const en = readmeSections("en");
  const zh = readmeSections("zh");
  const groups = [
    ["Official", "官方入口", "official"],
    ["Product Surface", "产品能力", "surface"],
    ["CLI and SDK", "CLI 与 SDK", "cli"],
    ["Learning Resources", "学习资源", "learn"],
  ];
  const out = [];
  for (const [enName, zhName, key] of groups) {
    const enRows = (en[enName] || []).map((l) => {
      const m = l.match(/^\*\*\[(.+?)\]\((.+?)\)\*\*\s*-\s*(.+)$/);
      return m ? { name: m[1], url: m[2], descEn: m[3] } : null;
    }).filter(Boolean);
    const zhRows = (zh[zhName] || []).map((l) => {
      const m = l.match(/^\*\*\[(.+?)\]\((.+?)\)\*\*\s*-\s*(.+)$/);
      return m ? { name: m[1], url: m[2], descZh: m[3] } : null;
    }).filter(Boolean);
    const zhMap = new Map(zhRows.map((r) => [r.name, r.descZh]));
    for (const r of enRows) out.push({ ...r, descZh: zhMap.get(r.name) || r.descEn, group: key });
  }
  return out;
}

function homePage(lang, docs, skills, resources, base) {
  const t = UI[lang];
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  const pathCards = PATHS[lang].map((p) => {
    const steps = p.steps
      .map(([slug, fallback]) => {
        const d = bySlug.get(slug);
        return `<li><a href="${base}${lang}/${slug}.html">${esc(d ? d.title : fallback)}</a></li>`;
      })
      .join("");
    return `<div class="path"><div class="n">${p.n}</div><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p><ol>${steps}</ol></div>`;
  });
  const skillRows = skills
    .map(
      (s) => `<div class="skill">
      <div class="name"><a href="${s.url}" target="_blank" rel="noreferrer">${esc(s.name)}</a></div>
      <div class="desc">${esc(lang === "zh" ? s.descZh : s.descEn)}
        <code class="cmd">npx skills add ${esc(s.repoRoot.replace("https://github.com/", ""))} --skill ${esc(s.name)}</code>
      </div>
      <button class="copy-btn" type="button" data-copy="npx skills add ${esc(s.repoRoot)} --skill ${esc(s.name)} --yes --copy" aria-label="${t.skillsAll} ${esc(s.name)}">copy</button>
    </div>`
    )
    .join("");
  const groupTitles = {
    official: ["Official", "官方入口"],
    surface: ["Product surface", "产品能力"],
    cli: ["CLI & SDK", "CLI 与 SDK"],
    learn: ["Learning", "学习资源"],
  };
  const resourceGroups = ["official", "surface", "cli", "learn"]
    .map((g) => {
      const rows = resources.filter((r) => r.group === g);
      if (!rows.length) return "";
      return `<div><h3 style="font:11px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--text-faint);margin:0 0 10px">${groupTitles[g][lang === "zh" ? 1 : 0]}</h3>
      <div class="skill-list">${rows
        .map(
          (r) => `<div class="res">
        <a class="name" href="${r.url}" target="_blank" rel="noreferrer">${esc(r.name)}</a>
        <div class="desc">${esc(lang === "zh" ? r.descZh : r.descEn)}</div>
      </div>`
        )
        .join("")}</div></div>`;
    })
    .join("");
  const docCount = docs.length;
  const body = `<main class="main" id="main">
  <div class="home">
    <section class="hero">
      <div>
        <div class="eyebrow">${t.tagline}</div>
        <h1>${t.heroA}<br /><span>${t.heroB}</span></h1>
        <p class="lede">${t.lede}</p>
        <div class="cta-row">
          <a class="btn primary" href="${base}${lang}/skills.html"><strong>${t.ctaSkills}</strong> ${icon("arrow")}</a>
          <a class="btn" href="${base}${lang}/learning-path.html">${t.ctaGuide}</a>
        </div>
      </div>
      <div class="term" aria-label="${t.quick}">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:6px">${t.quick}</span></div>
        <pre><span class="c"># 1 · install the CLI</span>
<span class="p">$</span> npm install -g @neta-art/cohub-cli
<span class="p">$</span> cohub auth login

<span class="c"># 2 · install a skill</span>
<span class="p">$</span> npx skills add \\
    https://github.com/talesofai/cohub \\
    --skill cohub --yes --copy

<span class="c"># 3 · publish a page</span>
<span class="p">$</span> cohub -s &lt;space-id&gt; apps publish site \\
    --file index.html --json

<span class="o">→ cohub.live/&lt;you&gt;/&lt;space&gt;/w/site</span></pre>
      </div>
    </section>

    <section class="stats" aria-label="Project statistics">
      <div><b>${skills.length}</b><span>${t.statSkills}</span></div>
      <div><b>${docCount}</b><span>${t.statPages}</span></div>
      <div><b>v2.70</b><span>${t.statVersion}</span></div>
      <div><b>2</b><span>${t.statLangs}</span></div>
    </section>

    <section id="start">
      <div class="section-head"><h2>${t.start}</h2><span class="note">${t.startNote}</span></div>
      <div class="paths">${pathCards.join("")}</div>
    </section>

    <section id="skills">
      <div class="section-head"><h2>${t.skills}</h2><span class="note">${t.skillsNote}</span></div>
      <div class="filters" role="group" aria-label="${t.skills}">
        <button class="chip" type="button" data-filter="all" aria-pressed="true">${t.skillsAll} · ${skills.length}</button>
        <button class="chip" type="button" data-filter="platform" aria-pressed="false">${t.skillsPlatform} · ${skills.filter((s) => s.category === "platform").length}</button>
        <button class="chip" type="button" data-filter="ecosystem" aria-pressed="false">${t.skillsEcosystem} · ${skills.filter((s) => s.category !== "platform").length}</button>
      </div>
      <div class="skill-list" id="skill-list">${skillRows}</div>
    </section>

    <section id="library">
      <div class="section-head"><h2>${t.library}</h2><span class="note">${t.libraryNote}</span></div>
      <div class="split">
        <div>
          <p style="color:var(--text-dim);margin:0 0 18px;max-width:48ch">${t.libraryLede}</p>
          <a class="btn" href="${base}${lang}/library.html">${t.library} ${icon("arrow")}</a>
          <div class="reading-order">
            <a href="${base}${lang}/manifesto.html"><span>01</span>${lang === "zh" ? "主文" : "Manifesto"}<em>${lang === "zh" ? "为什么这样用" : "Why the product works this way"}</em></a>
            <a href="${base}${lang}/learning-path.html"><span>02</span>${lang === "zh" ? "学习路径" : "Learning path"}<em>${lang === "zh" ? "30 分钟到进阶" : "30 minutes to advanced"}</em></a>
            <a href="${base}${lang}/matrix.html"><span>03</span>${lang === "zh" ? "场景矩阵" : "Scenario matrix"}<em>${lang === "zh" ? "从意图到卡片" : "Intent to card"}</em></a>
            <a href="${base}${lang}/glossary.html"><span>04</span>${lang === "zh" ? "术语表" : "Glossary"}<em>${lang === "zh" ? "双语词汇" : "Bilingual vocabulary"}</em></a>
          </div>
        </div>
        <div class="entry-list">
          ${["playbooks", "concepts", "anti-patterns", "cheatsheets", "cookbooks", "reference"]
            .map(
              (k) => `<a class="entry" href="${base}${lang}/${k}.html">
            <div><h3>${esc(C[k][lang])}</h3><p>${esc(C[k]["note" + (lang === "zh" ? "Zh" : "En")])}</p></div>
            <div class="meta"><span>${docs.filter((d) => d.collection === k).length}</span></div>
          </a>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <section id="resources">
      <div class="section-head"><h2>${t.resources}</h2><span class="note">${t.resourcesNote}</span></div>
      <div class="resource-grid">${resourceGroups}</div>
    </section>

    <section>
      <div class="section-head"><h2>${t.refTitle}</h2><span class="note">${t.refLede}</span></div>
      <div class="faq">
        <details><summary>${lang === "zh" ? "读完主文 manifesto 需要多久？" : "How long is the manifesto?"}</summary><p>${lang === "zh" ? "大约 20 分钟。它是一张实践地图，不是功能清单。" : "About 20 minutes. It is a practice map, not a feature list."} <a href="${base}${lang}/manifesto.html">${lang === "zh" ? "开始阅读" : "Start reading"} →</a></p></details>
        <details><summary>${lang === "zh" ? "从哪里查术语？" : "Where do I look up a term?"}</summary><p>${lang === "zh" ? "术语表覆盖 Space、Save、App、Room、Decision 等 40 多个词条。" : "The glossary covers 40+ terms from Space and Save to Room and Decision."} <a href="${base}${lang}/glossary.html">${t.guide} →</a></p></details>
        <details><summary>${lang === "zh" ? "怎么按场景找卡片？" : "How do I find a card by scenario?"}</summary><p>${lang === "zh" ? "场景矩阵把「我想做什么」映射到能力面、Skills 与实践卡。" : "The scenario matrix maps intent to surfaces, skills, and playbooks."} <a href="${base}${lang}/matrix.html">Matrix →</a></p></details>
      </div>
    </section>
  </div>
</main>`;
  return shell({
    lang,
    base,
    title: lang === "zh" ? "Awesome Cohub · Cohub 生态导航" : "Awesome Cohub · A map of the Cohub ecosystem",
    desc: t.lede,
    body,
    active: "home",
    mode: "home",
  });
}

function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "fonts"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "en"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "zh"), { recursive: true });
  fs.copyFileSync(path.join(ROOT, "assets", "cohub-mark.svg"), path.join(OUT, "assets", "logo.svg"));
  fs.copyFileSync(path.join(ROOT, "site-src", "style.css"), path.join(OUT, "assets", "style.css"));
  fs.copyFileSync(path.join(ROOT, "site-src", "app.js"), path.join(OUT, "assets", "app.js"));
  fs.copyFileSync(path.join(ROOT, "site-src", "fonts", "space-grotesk-latin.woff2"), path.join(OUT, "fonts", "space-grotesk-latin.woff2"));

  const docs = { en: loadDocs("en"), zh: loadDocs("zh") };
  const skills = parseSkills();
  const resources = parseResources();

  for (const lang of ["en", "zh"]) {
    const base = "";
    for (const doc of docs[lang]) {
      fs.writeFileSync(path.join(OUT, lang, `${doc.slug}.html`), docPage(lang, doc, docs[lang], base));
    }
    for (const c of ["playbooks", "concepts", "anti-patterns", "cheatsheets", "cookbooks", "reference"]) {
      fs.writeFileSync(path.join(OUT, lang, `${c}.html`), listPage(lang, c, docs[lang], base));
    }
    fs.writeFileSync(path.join(OUT, lang, "library.html"), libraryPage(lang, docs[lang], base));
    fs.writeFileSync(path.join(OUT, lang, "skills.html"), skillsPage(lang, skills, base));
    fs.writeFileSync(path.join(OUT, lang, "index.html"), homePage(lang, docs[lang], skills, resources, base));
  }

  const root = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Awesome Cohub</title>
<link rel="icon" href="assets/logo.svg" type="image/svg+xml" />
<script>
(function () {
  var zh = /^zh/i.test(navigator.language || "");
  location.replace(zh ? "zh/index.html" : "en/index.html");
})();
</script>
<noscript><meta http-equiv="refresh" content="0; url=en/index.html" /></noscript>
<style>body{margin:0;background:#0b0c0f;color:#e8e9ec;font:14px/1.6 system-ui;display:grid;place-items:center;min-height:100vh}a{color:#ff4500}</style>
</head>
<body><p>Awesome Cohub · <a href="en/index.html">English</a> · <a href="zh/index.html">中文</a></p></body>
</html>`;
  fs.writeFileSync(path.join(OUT, "index.html"), root);

  const search = {};
  for (const lang of ["en", "zh"]) {
    search[lang] = docs[lang].map((d) => ({
      u: `${lang}/${d.slug}.html`,
      t: d.title,
      i: d.id,
      ty: C[d.collection]?.[lang] || d.type,
      c: d.collection,
      b: plain(d.body).slice(0, 2200),
    }));
  }
  fs.writeFileSync(path.join(OUT, "search-index.js"), `window.__AC_INDEX=${JSON.stringify(search)};`);
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
  fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${REPO}\n`);

  console.log(`built ${docs.en.length} EN + ${docs.zh.length} ZH pages, ${skills.length} skills -> ${path.relative(ROOT, OUT)}/`);
}

main();
