import type { BlockType } from './types.ts';

function esc(s: string): string {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Convert inline Markdown to HTML without showing any markers.
 * Receives raw unescaped text; returns safe HTML.
 */
function inlineToHtml(text: string): string {
	return esc(text)
		.replace(/`([^`]*)`/g, '<code>$1</code>')
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
		.replace(/~~([^~]+)~~/g, '<s>$1</s>')
		.replace(/__([^_]+)__/g, '<u>$1</u>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

/**
 * Render block content as preview HTML.
 * Markdown markers are stripped; formatting is applied via semantic HTML.
 */
export function renderPreview(content: string, type: BlockType): string {
	if (!content.trim()) return '<br>';

	switch (type) {
		case 'heading': {
			const m = content.match(/^(#{1,6}) (.*)/);
			if (!m) return inlineToHtml(content);
			return inlineToHtml(m[2]);
		}

		case 'quote': {
			const lines = content.split('\n').map(l =>
				l.startsWith('> ') ? l.slice(2) : l === '>' ? '' : l
			);
			return `<em>${inlineToHtml(lines.join('\n'))}</em>`;
		}

		case 'bullet-list': {
			const lines = content.split('\n').map(l => {
				const m = l.match(/^(\s*)([-*]) (.*)$/);
				return m ? `${m[1]}\u2022 ${inlineToHtml(m[3])}` : inlineToHtml(l);
			});
			return lines.join('\n');
		}

		case 'ordered-list': {
			const lines = content.split('\n').map(l => {
				const m = l.match(/^(\s*)(\d+\.) (.*)$/);
				return m ? `${m[1]}${esc(m[2])} ${inlineToHtml(m[3])}` : inlineToHtml(l);
			});
			return lines.join('\n');
		}

		case 'todo-list': {
			const lines = content.split('\n').map(l => {
				const done = /^\s*- \[x\] /i.test(l);
				const m = l.match(/^\s*- \[[ x]\] (.*)/i);
				if (m) {
					const checkbox = done ? '&#x2611;' : '&#x2610;';
					const text = done
						? `<s style="opacity:0.5">${inlineToHtml(m[1])}</s>`
						: inlineToHtml(m[1]);
					return `${checkbox} ${text}`;
				}
				return inlineToHtml(l);
			});
			return lines.join('\n');
		}

		case 'code': {
			const lines = content.split('\n');
			const inner = lines.slice(1, lines.at(-1) === '```' ? -1 : undefined);
			return inner.map(esc).join('\n') || '<br>';
		}

		case 'divider':
			return '';

		case 'paragraph':
		default:
			return content.split('\n').map(l => l ? inlineToHtml(l) : '<br>').join('\n');
	}
}
