/**
 * Lightweight regex-based Markdown syntax highlighter.
 *
 * Converts plain Markdown text to HTML with `data-hl` span annotations.
 * Rendering mode: syntax highlighting — Markdown markers stay visible but are
 * styled. Not WYSIWYG.
 *
 * Supported tokens (styled via `data-hl` in BlockEditor.svelte):
 *
 *   Block-level
 *   ───────────
 *   heading     — heading text (following `#` markers)
 *   blockquote  — blockquote content following `>`
 *   hr          — horizontal rule line (`---`, `***`, `___`)
 *   list-marker — unordered (`-`, `*`) or ordered (`1.`) list marker
 *   code-lang   — language identifier on a fenced code block opening line
 *   code-block  — content lines inside a fenced code block
 *   table-sep   — separator row of a table (`|---|---|`)
 *
 *   Inline
 *   ──────
 *   marker      — syntax punctuation: `#`, `**`, `*`, `` ` ``, `>`, `|`,
 *                 ` ``` `, `~~`, `__`, `[`, `](`, `)`
 *   bold        — bold content between `**` markers
 *   italic      — italic content between `*` markers
 *   code        — inline code content between `` ` `` markers
 *   strikethrough — content between `~~` markers
 *   underline   — content between `__` markers
 *   link-text   — display text of a `[text](url)` link
 *   link-url    — URL part of a `[text](url)` link
 */

function esc(s: string): string {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function span(hl: string, content: string): string {
	return `<span data-hl="${hl}">${content}</span>`;
}

/**
 * Process inline Markdown tokens within a line.
 * Receives already-HTML-escaped text; returns HTML.
 */
function processInline(text: string): string {
	return text
		// Inline code — highest priority, no nesting inside
		.replace(/`([^`]*)`/g, (_, c) =>
			span('marker', '`') + span('code', c) + span('marker', '`'))
		// Link [text](url)
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) =>
			span('marker', '[') + span('link-text', t) + span('marker', '](') + span('link-url', u) + span('marker', ')'))
		// Strikethrough ~~text~~
		.replace(/~~([^~]+)~~/g, (_, c) =>
			span('marker', '~~') + span('strikethrough', c) + span('marker', '~~'))
		// Underline __text__
		.replace(/__([^_]+)__/g, (_, c) =>
			span('marker', '__') + span('underline', c) + span('marker', '__'))
		// Bold **text** — before italic
		.replace(/\*\*([^*]+)\*\*/g, (_, c) =>
			span('marker', '**') + span('bold', c) + span('marker', '**'))
		// Italic *text*
		.replace(/\*([^*]+)\*/g, (_, c) =>
			span('marker', '*') + span('italic', c) + span('marker', '*'));
}

/** Style a table data/header row: pipes become markers, cells get inline processing. */
function highlightTableRow(line: string): string {
	return line
		.split('|')
		.map((cell, idx) => (idx === 0 ? cell : span('marker', '|') + processInline(esc(cell))))
		.join('');
}

/**
 * Highlight a single block's plain-text Markdown content.
 * Returns an HTML string safe for use as `innerHTML` of a contenteditable div.
 */
export function highlight(text: string): string {
	const lines = text.split('\n');

	// ── Fenced code block ──────────────────────────────────────────────────
	if (lines[0].startsWith('```')) {
		return lines.map((line, idx) => {
			if (idx === 0) {
				const lang = line.slice(3).trim();
				return span('marker', '```') + (lang ? span('code-lang', esc(lang)) : '');
			}
			if (line === '```') return span('marker', '```');
			return span('code-block', esc(line));
		}).join('\n');
	}

	// ── Table ──────────────────────────────────────────────────────────────
	if (lines.length > 0 && lines.every(l => l.startsWith('|'))) {
		return lines.map(line => {
			if (/^[\|:\-\s]+$/.test(line) && line.includes('-'))
				return span('table-sep', esc(line));
			return highlightTableRow(line);
		}).join('\n');
	}

	// ── Line-by-line processing ────────────────────────────────────────────
	return lines.map(line => {

		// Horizontal rule: ---, ***, or ___ (3+ chars, nothing else)
		if (/^(-{3,}|\*{3,}|_{3,})$/.test(line))
			return span('hr', esc(line));

		// Heading: one or more `#` followed by a space
		const headingMatch = line.match(/^(#{1,6})( .+)?$/);
		if (headingMatch && headingMatch[2] !== undefined) {
			const markers = esc(headingMatch[1]);
			const content = processInline(esc(headingMatch[2].slice(1)));
			return span('marker', markers) + span('heading', ' ' + content);
		}

		// Blockquote: starts with `> `
		if (line.startsWith('> '))
			return span('marker', '&gt; ') + span('blockquote', processInline(esc(line.slice(2))));
		if (line === '>')
			return span('marker', '&gt;');

		// Unordered list: `- text` or `* text` (with optional leading spaces)
		const ulMatch = line.match(/^(\s*)([-*])( .+)$/);
		if (ulMatch)
			return esc(ulMatch[1]) + span('list-marker', esc(ulMatch[2])) + processInline(esc(ulMatch[3]));

		// Ordered list: `1. text`, `2. text`, …
		const olMatch = line.match(/^(\s*)(\d+\.)( .+)$/);
		if (olMatch)
			return esc(olMatch[1]) + span('list-marker', esc(olMatch[2])) + processInline(esc(olMatch[3]));

		// Regular line — inline tokens only
		return processInline(esc(line));
	}).join('\n');
}
