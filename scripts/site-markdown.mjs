/** Minimalny, bezpieczny renderer ograniczonego Markdown z dokumentacji projektu.
 * Bez biblioteki i bez interpretacji surowego HTML z materiałów źródłowych.
 */
export function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function inlineMarkdown(raw) {
  let html = escapeHtml(raw);
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_match, label, url) =>
    '<a href="' + url + '" rel="noopener noreferrer">' + label + '</a>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

function splitCells(line) {
  return line.replace(/^\s*\|/, '').replace(/\|\s*$/, '')
    .split(/(?<!\\)\|/).map((cell) => cell.trim().replace(/\\\|/g, '|'));
}

function isSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?(?:\s*\|\s*:?-{3,}:?)*\s*\|?\s*$/.test(line);
}

export function markdownToHtml(markdown, { skipTitle = false } = {}) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let i = 0;
  let skipped = false;

  while (i < lines.length) {
    const current = lines[i];
    if (!current.trim()) { i++; continue; }

    if (/^```/.test(current.trim())) {
      const language = current.trim().slice(3).replace(/[^a-z0-9-]/gi, '');
      i++;
      const code = [];
      while (i < lines.length && !/^```/.test(lines[i].trim())) code.push(lines[i++]);
      i++;
      out.push('<pre><code' + (language ? ' class="language-' + language + '"' : '') + '>' +
        escapeHtml(code.join('\n')) + '</code></pre>');
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(current);
    if (heading) {
      i++;
      if (skipTitle && !skipped && heading[1].length === 1) { skipped = true; continue; }
      const level = Math.max(2, Math.min(6, heading[1].length + 1));
      out.push('<h' + level + '>' + inlineMarkdown(heading[2]) + '</h' + level + '>');
      continue;
    }

    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(current)) {
      out.push('<hr>'); i++; continue;
    }

    if (current.includes('|') && i + 1 < lines.length && isSeparator(lines[i + 1])) {
      const columns = splitCells(current);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) {
        rows.push(splitCells(lines[i++]));
      }
      out.push('<div class="table-scroll"><table><thead><tr>' + columns.map((x) =>
        '<th scope="col">' + inlineMarkdown(x) + '</th>').join('') + '</tr></thead><tbody>' +
        rows.map((row) => '<tr>' + columns.map((_column, index) =>
          '<td>' + inlineMarkdown(row[index] ?? '') + '</td>').join('') + '</tr>').join('') +
        '</tbody></table></div>');
      continue;
    }

    if (/^\s*>\s?/.test(current)) {
      const content = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        content.push(lines[i++].replace(/^\s*>\s?/, ''));
      }
      out.push('<blockquote>' + markdownToHtml(content.join('\n')) + '</blockquote>');
      continue;
    }

    if (/^\s*(?:[-*+] |\d+\. )/.test(current)) {
      const ordered = /^\s*\d+\. /.test(current);
      const tag = ordered ? 'ol' : 'ul';
      const items = [];
      while (i < lines.length && /^\s*(?:[-*+] |\d+\. )/.test(lines[i])) {
        const entry = lines[i++].replace(/^\s*(?:[-*+] |\d+\. )/, '');
        items.push('<li>' + inlineMarkdown(entry) + '</li>');
      }
      out.push('<' + tag + '>' + items.join('') + '</' + tag + '>');
      continue;
    }

    const paragraph = [current.trim()];
    i++;
    while (i < lines.length && lines[i].trim() &&
      !/^(?:#{1,6}\s|\s*>|\s*(?:[-*+] |\d+\. )|```|\s*(?:-{3,}|\*{3,})\s*$)/.test(lines[i]) &&
      !(lines[i].includes('|') && i + 1 < lines.length && isSeparator(lines[i + 1]))) {
      paragraph.push(lines[i++].trim());
    }
    out.push('<p>' + inlineMarkdown(paragraph.join(' ')) + '</p>');
  }
  return out.join('\n');
}
