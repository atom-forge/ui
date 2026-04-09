/**
 * Lightweight regex-based Markdown syntax highlighter.
 *
 * Converts plain Markdown text to HTML with `data-hl` span annotations.
 * Rendering mode: syntax highlighting — Markdown markers stay visible but are
 * styled. Not WYSIWYG.
 *
 * Tokens (styled via `data-hl` attribute in BlockEditor.svelte):
 *   heading   — the heading text (following the `#` markers)
 *   marker    — syntax markers: `#`, `**`, `*`, `` ` ``, `>`
 *   bold      — bold content between `**` markers
 *   italic    — italic content between `*` markers
 *   blockquote — blockquote content following `>`
 *   code      — inline code content between `` ` `` markers
 */

function esc(s: string): string {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function span(hl: string, content: string): string {
	return `<span data-hl="${hl}">${content}</span>`;
}

/**
 * Process inline Markdown tokens (code, bold, italic) within a line.
 * Receives already-HTML-escaped text; returns HTML.
 */
function processInline(text: string): string {
	return text
		// Inline code — process first (highest priority, no nesting)
		.replace(/`([^`]*)`/g, (_, c) => span('marker', '`') + span('code', c) + span('marker', '`'))
		// Bold — before italic to correctly handle `**...**`
		.replace(/\*\*([^*]+)\*\*/g, (_, c) => span('marker', '**') + span('bold', c) + span('marker', '**'))
		// Italic — after bold
		.replace(/\*([^*]+)\*/g, (_, c) => span('marker', '*') + span('italic', c) + span('marker', '*'));
}

/**
 * Highlight a single block's plain-text Markdown content.
 * Returns an HTML string safe for use as `innerHTML` of a contenteditable div.
 */
export function highlight(text: string): string {
	const lines = text.split('\n');

	return lines.map(line => {
		// Heading: one or more `#` followed by a space
		const headingMatch = line.match(/^(#{1,6})( .+)?$/);
		if (headingMatch && headingMatch[2] !== undefined) {
			const markers = esc(headingMatch[1]);
			const content = processInline(esc(headingMatch[2].slice(1))); // strip leading space
			return span('marker', markers) + span('heading', ' ' + content);
		}

		// Blockquote: starts with `> `
		if (line.startsWith('> ')) {
			return span('marker', '&gt; ') + span('blockquote', processInline(esc(line.slice(2))));
		}
		if (line === '>') {
			return span('marker', '&gt;');
		}

		// Regular line — inline tokens only
		return processInline(esc(line));
	}).join('\n');
}
