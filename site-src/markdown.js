/* Minimal Markdown renderer for Awesome Cohub.
   Shared by the build script and the browser runtime. */
(function (root) {
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function inline(text) {
    const codes = [];
    let s = text.replace(/`([^`]+)`/g, (_, c) => {
      codes.push(c);
      return `\u0000${codes.length - 1}\u0000`;
    });
    s = esc(s);
    const links = [];
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const clean = label.replace(/\u0000(\d+)\u0000/g, (__, i) => `<code>${esc(codes[+i])}</code>`);
      links.push({ label: clean, href });
      return `\u0001${links.length - 1}\u0001`;
    });
    s = s.replace(
      /(^|[\s(])(https?:\/\/[^\s<)\u0000\u0001]+)/g,
      (m, p, url) => `${p}<a href="${url}" rel="noreferrer">${url}</a>`
    );
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?=[^*\w]|$)/g, "$1<em>$2</em>");
    s = s.replace(/~~([^~]+)~~/g, "<del>$1</del>");
    s = s.replace(/\u0001(\d+)\u0001/g, (_, i) => {
      const l = links[+i];
      return `<a href="${l.href.replace(/&amp;/g, "&")}" rel="noreferrer">${l.label}</a>`;
    });
    s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[+i])}</code>`);
    return s;
  }

  const ITEM = /^(\s*)([-*+]|\d+\.)\s+(.*)$/;

  function parseList(lines, start) {
    const first = lines[start].match(ITEM);
    const rootIndent = first[1].length;
    const rootOrdered = /\d+\./.test(first[2]);
    const root = { indent: rootIndent - 1, children: [] };
    const stack = [root];
    let i = start;
    while (i < lines.length) {
      const m = lines[i].match(ITEM);
      if (!m) {
        if (!lines[i].trim()) {
          let j = i + 1;
          while (j < lines.length && !lines[j].trim()) j++;
          const nm = j < lines.length ? lines[j].match(ITEM) : null;
          if (nm && nm[1].length >= rootIndent && /\d+\./.test(nm[2]) === rootOrdered) {
            i = j;
            continue;
          }
        }
        break;
      }
      const indent = m[1].length;
      const ordered = /\d+\./.test(m[2]);
      if (indent < rootIndent) break;
      if (indent === rootIndent && ordered !== rootOrdered) break;
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
      const node = { text: m[3], children: [], ordered };
      stack[stack.length - 1].children.push(node);
      stack.push({ indent, children: node.children });
      i++;
      while (
        i < lines.length &&
        /^\s{2,}\S/.test(lines[i]) &&
        !ITEM.test(lines[i]) &&
        lines[i].match(/^\s*/)[0].length > indent
      ) {
        node.text += " " + lines[i].trim();
        i++;
      }
    }
    const tag = rootOrdered ? "ol" : "ul";
    const tight = !/\n\s*\n/.test(lines.slice(start, i).join("\n"));
    const renderNodes = (nodes, dense) =>
      nodes
        .map((n) => {
          const kids = n.children.length
            ? `<${n.ordered ? "ol" : "ul"}>${renderNodes(n.children, dense)}</${n.ordered ? "ol" : "ul"}>`
            : "";
          const body = inline(n.text);
          const text = dense && !/^<p>/.test(body) ? `<p>${body}</p>` : body;
          return `<li>${text}${kids}</li>`;
        })
        .join("");
    return { html: `<${tag} class="${tight ? "tight" : ""}">${renderNodes(root.children, !tight)}</${tag}>`, next: i };
  }

  function render(md) {
    const lines = md.replace(/\r\n/g, "\n").split("\n");
    const out = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) {
        i++;
        continue;
      }
      let m;
      if ((m = line.match(/^(```|~~~)\s*([\w+-]*)\s*$/))) {
        const fence = m[1];
        const lang = m[2];
        const buf = [];
        i++;
        while (i < lines.length && !lines[i].startsWith(fence)) buf.push(lines[i++]);
        i++;
        out.push(
          `<div class="code" data-lang="${esc(lang || "text")}"><button class="copy" type="button" aria-label="Copy">Copy</button><pre><code>${esc(
            buf.join("\n")
          )}</code></pre></div>`
        );
        continue;
      }
      if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
        const level = m[1].length;
        const text = m[2].replace(/\s+#+\s*$/, "");
        const slug = text
          .toLowerCase()
          .replace(/`|\*|\[|\]|\(|\)/g, "")
          .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
          .replace(/^-|-$/g, "");
        out.push(`<h${level} id="${esc(slug)}">${inline(text)}</h${level}>`);
        i++;
        continue;
      }
      if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
        out.push("<hr />");
        i++;
        continue;
      }
      if (line.startsWith("|") && i + 1 < lines.length && /^\|[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
        const head = line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].startsWith("|")) {
          rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
          i++;
        }
        out.push(
          '<div class="table-wrap"><table><thead><tr>' +
            head.map((c) => `<th>${inline(c)}</th>`).join("") +
            "</tr></thead><tbody>" +
            rows.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") +
            "</tbody></table></div>"
        );
        continue;
      }
      if ((m = line.match(/^>\s?(.*)$/))) {
        const buf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
        out.push(`<blockquote>${render(buf.join("\n"))}</blockquote>`);
        continue;
      }
      if (ITEM.test(line)) {
        const parsed = parseList(lines, i);
        out.push(parsed.html);
        i = parsed.next;
        continue;
      }
      const buf = [line];
      i++;
      while (
        i < lines.length &&
        lines[i].trim() &&
        !/^(```|~~~|#{1,6}\s|\||>|\s*([-*+]|\d+\.)\s|---|\*\*\*)/.test(lines[i])
      ) {
        buf.push(lines[i]);
        i++;
      }
      out.push(`<p>${inline(buf.join(" "))}</p>`);
    }
    return out.join("\n");
  }

  const api = { render, inline, esc };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ACMarkdown = api;
})(this);
