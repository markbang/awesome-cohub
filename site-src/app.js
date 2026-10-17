(function () {
  const LANGS = ["en", "zh"];
  const T = {
    en: {
      language: "中文",
      search: "Search",
      placeholder: "Search concepts, playbooks, commands…",
      noResults: "No matches. Try a command, a term, or an id.",
      results: "results",
      copy: "Copy",
      copied: "Copied",
      overview: "Overview",
      start: "Start",
      playbooks: "Playbooks",
      concepts: "Concepts",
      anti: "Anti-patterns",
      cheats: "Cheatsheets",
      cookbooks: "Cookbooks",
      reference: "Reference",
      previous: "Previous",
      next: "Next",
      edit: "Edit on GitHub",
      source: "Source",
      related: "Related",
      clear: "Clear",
      filters: "Filter",
      all: "All",
      inThisPage: "On this page",
    },
    zh: {
      language: "EN",
      search: "搜索",
      placeholder: "搜索概念、实践卡、命令…",
      noResults: "没有匹配结果。试试命令、术语或 ID。",
      results: "条结果",
      copy: "复制",
      copied: "已复制",
      overview: "总览",
      start: "入门",
      playbooks: "实践卡",
      concepts: "概念",
      anti: "反模式",
      cheats: "速查",
      cookbooks: "Cookbook",
      reference: "参考",
      previous: "上一篇",
      next: "下一篇",
      edit: "在 GitHub 编辑",
      source: "源码",
      related: "相关",
      clear: "清除",
      filters: "筛选",
      all: "全部",
      inThisPage: "本页目录",
    },
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const t = (k) => T[lang()][k] || k;
  const siteBase = window.__AC_BASE || "";
  const lang = () => window.__AC_LANG || "en";
  const mode = document.body.dataset.mode || "doc";
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- language link ----------
  const LANG_SLUGS = {
    "manifesto": "manifesto",
    "learning-path": "learning-path",
    "glossary": "glossary",
    "matrix": "matrix",
    "samples": "samples",
    "AGENT_BRIEF": "agent-brief",
    "CHANGELOG": "changelog",
  };

  function langHref() {
    const here = lang();
    const other = here === "en" ? "zh" : "en";
    let slug = location.pathname.slice(siteBase.length).replace(/^\/?(en|zh)\//, "").replace(/\.html$/, "");
    slug = LANG_SLUGS[slug] || slug;
    return `${siteBase}${other}/${slug}.html${location.search}${location.hash}`;
  }

  // ---------- search ----------
  let index = window.__AC_INDEX || null;
  let indexPromise = null;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (!indexPromise) {
      indexPromise = new Promise((resolve) => {
        const el = document.createElement("script");
        el.src = window.__AC_INDEX_URL || "search-index.js";
        el.onload = () => {
          index = window.__AC_INDEX || { en: [], zh: [] };
          resolve(index);
        };
        el.onerror = () => {
          index = { en: [], zh: [] };
          resolve(index);
        };
        document.head.appendChild(el);
      });
    }
    return indexPromise;
  }
  let overlay, input, list, active = 0, current = [];

  function score(doc, terms) {
    const title = doc.t.toLowerCase();
    const id = (doc.i || "").toLowerCase();
    const body = doc.b.toLowerCase();
    let s = 0;
    for (const term of terms) {
      if (title.includes(term)) s += 60;
      if (id.includes(term)) s += 40;
      if (body.includes(term)) s += 6;
    }
    return s;
  }

  function snippet(doc, term) {
    const body = doc.b;
    const i = body.toLowerCase().indexOf(term);
    if (i < 0) return doc.i || doc.c;
    const start = Math.max(0, i - 40);
    return (start > 0 ? "…" : "") + body.slice(start, i + 70).replace(/\n+/g, " ") + "…";
  }

  function runSearch(q) {
    if (!index) {
      loadIndex().then(() => runSearch(input ? input.value : q));
      return;
    }
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const langIdx = index[lang()] || [];
    const cross = index[lang() === "en" ? "zh" : "en"] || [];
    if (!terms.length) {
      const picks = ["learning-path", "manifesto", "concepts-board-runtime", "concepts-local-runtime", "playbooks-work-lifecycle", "playbooks-work-kit-product", "concepts-decision-models", "cheatsheets-cli-and-ui"];
      const map = new Map(langIdx.map((d) => [d.u.split("/").pop().replace(".html", ""), d]));
      current = picks.map((k) => map.get(k)).filter(Boolean).map((d) => ({ ...d, s: "" }));
      if (current.length < 6) current = langIdx.slice(0, 8).map((d) => ({ ...d, s: "" }));
    } else {
      const pool = langIdx.map((d) => ({ d, s: score(d, terms) })).filter((x) => x.s > 0);
      pool.sort((a, b) => b.s - a.s);
      current = pool.slice(0, 12).map((x) => ({ ...x.d, s: snippet(x.d, terms[0]) }));
      if (current.length < 3) {
        const other = cross
          .map((d) => ({ d, s: score(d, terms) }))
          .filter((x) => x.s > 0)
          .sort((a, b) => b.s - a.s)
          .slice(0, 4);
        if (other.length) current.push({ cross: true, items: other.map((x) => x.d) });
      }
    }
    active = 0;
    paint(q, terms);
  }

  function mark(text, terms) {
    let out = esc(text);
    for (const term of terms) {
      const re = new RegExp("(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      out = out.replace(re, "<mark>$1</mark>");
    }
    return out;
  }

  function paint(q, terms) {
    if (!list) return;
    const rows = [];
    for (const item of current) {
      if (item.cross) {
        rows.push(
          `<li class="cross"><a href="#" aria-disabled="true" style="grid-template-columns:1fr"><span class="t" style="color:var(--text-faint);font:11px/1.5 var(--mono)">${
            lang() === "en" ? "Also in 中文" : "Also in English"
          }</span></a></li>`
        );
        for (const d of item.items) {
          rows.push(
            `<li><a href="${d.u}"><span class="t">${esc(d.t)}</span><span class="k">${esc(d.ty)}</span></a></li>`
          );
        }
        continue;
      }
      rows.push(
        `<li><a href="${item.u}"><span><span class="t">${mark(item.t, terms)}</span><span class="s">${esc(
          item.s || item.i || ""
        )}</span></span><span class="k">${esc(item.ty)}</span></a></li>`
      );
    }
    list.innerHTML = rows.length ? rows.join("") : `<li><span class="empty">${t("noResults")}</span></li>`;
    highlight();
  }

  function highlight() {
    const links = $$("li a", list).filter((a) => a.getAttribute("aria-disabled") !== "true");
    links.forEach((a, i) => a.classList.toggle("active", i === active));
    const el = links[active];
    if (el) el.scrollIntoView({ block: "nearest" });
  }

  function openSearch() {
    if (!overlay) return;
    overlay.hidden = false;
    input.value = "";
    runSearch("");
    input.focus();
  }

  function closeSearch() {
    if (overlay) overlay.hidden = true;
  }

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="search-box" role="dialog" aria-modal="true" aria-label="${t("search")}">
        <div class="search-head"><span class="search-icon">${"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-3.5-3.5\"/></svg>"}</span><input type="search" autocomplete="off" spellcheck="false" placeholder="${t("placeholder")}" /><button class="close" type="button" aria-label="Close">esc</button></div>
        <ul class="results"></ul>
        <div class="search-help"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>
      </div>`;
    document.body.appendChild(overlay);
    input = $("input", overlay);
    list = $(".results", overlay);
    input.addEventListener("input", () => runSearch(input.value));
    $(".close", overlay).addEventListener("click", closeSearch);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeSearch();
    });
    input.addEventListener("keydown", (e) => {
      const links = $$("li a", list).filter((a) => a.getAttribute("aria-disabled") !== "true");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        active = Math.min(active + 1, links.length - 1);
        highlight();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = Math.max(active - 1, 0);
        highlight();
      } else if (e.key === "Enter" && links[active]) {
        location.href = links[active].getAttribute("href");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      overlay && !overlay.hidden ? closeSearch() : openSearch();
    }
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape") closeSearch();
  });

  // ---------- copy buttons ----------
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const text = btn.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    const prev = btn.textContent;
    btn.textContent = t("copied");
    btn.dataset.done = "1";
    setTimeout(() => {
      btn.textContent = prev === t("copied") ? t("copy") : prev;
      delete btn.dataset.done;
    }, 1400);
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".code .copy");
    if (!btn) return;
    const code = btn.parentElement.querySelector("code");
    navigator.clipboard && navigator.clipboard.writeText(code.textContent).catch(() => {});
    btn.textContent = t("copied");
    btn.dataset.done = "1";
    setTimeout(() => {
      btn.textContent = t("copy");
      delete btn.dataset.done;
    }, 1400);
  });

  // ---------- index filters ----------
  if (mode === "index") {
    $$(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const key = chip.dataset.filter;
        $$(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        $$(".entry").forEach((row) => {
          const match = key === "all" || row.dataset.filter === key;
          row.style.display = match ? "" : "none";
        });
      });
    });
  }

  // ---------- grid: local filter ----------
  if (mode === "grid") {
    const input = $("#grid-filter");
    if (input) {
      input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        let shown = 0;
        $$(".entry").forEach((row) => {
          const match = !q || row.textContent.toLowerCase().includes(q);
          row.style.display = match ? "" : "none";
          if (match) shown++;
        });
        const empty = $("#grid-empty");
        if (empty) empty.hidden = shown > 0;
      });
    }
  }

  // ---------- glossary: linkify card slugs ----------
  if (mode === "doc") {
    const toc = new Set($$(".rail a[href$='.html']").map((x) => x.getAttribute("href").split("/").pop().replace(".html", "")));
    $$(".prose td").forEach((td) => {
      const text = td.textContent.trim();
      if (/^[a-z0-9][a-z0-9-]*$/.test(text) && toc.has(text)) {
        const href = $$(".rail a[href$='.html']").find((x) => x.getAttribute("href").split("/").pop() === text + ".html");
        if (href) td.innerHTML = `<a href="${href.getAttribute("href")}">${text}</a>`;
      }
    });
  }

  // ---------- boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    const l = $("[data-lang]");
    if (l) l.setAttribute("href", langHref());
    $$("[data-search-open]").forEach((b) => b.addEventListener("click", openSearch));
    const themeBtn = $("[data-theme-toggle]");
    const paintTheme = () => {
      const cur = document.documentElement.dataset.theme || "dark";
      document.documentElement.dataset.theme = cur;
      if (themeBtn) themeBtn.title = cur === "dark" ? "Light" : "Dark";
    };
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("ac-theme", next);
        } catch {}
        paintTheme();
      });
      paintTheme();
    }
    const menu = $("[data-menu]");
    if (menu) menu.addEventListener("click", () => $(".rail").classList.toggle("open"));
    ensureOverlay();
    // preload index lazily on first search intent
    $$("[data-search-open]").forEach((b) => b.addEventListener("mouseenter", ensureOverlay, { once: true }));
  });
})();
