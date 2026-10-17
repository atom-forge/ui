<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props',   name: 'value',      type: 'string',                          default: "''",       description: 'Markdown source. Not bindable; use <code>onchange</code> to capture edits and update the parent value.' },
		{ group: 'Props',   name: 'onchange',   type: '(v: string) => void',                                  description: 'Called on input, formatted paste, and bold/italic shortcuts with the updated markdown string.' },
		{ group: 'Props',   name: 'onnavigate', type: "(dir: 'prev' | 'next') => void",                       description: 'Called when the user presses Tab (next) or Shift+Tab (prev). Used by the Block Editor to move focus between blocks.' },
		{ group: 'Props', name: 'onsplit', type: '(before: string, after: string) => void', description: 'When supplied, Shift+Enter splits at the selected text and emits the surrounding source.' },
				{ group: 'Props', name: 'onjoinprev / onjoinnext', type: '() => void', description: 'Backspace at the start or Delete at the end requests a join when the corresponding callback is supplied.' },
				{ group: 'Methods', name: 'focusAt(pos)', type: '(pos: number) => void', description: 'Focuses the textarea and sets its cursor to the supplied character offset.' },
				{ group: 'Methods', name: "focus(dir = 'start')",     type: "(dir?: 'start' | 'end') => void", description: 'Programmatically focuses the editor textarea and moves the cursor to the selected edge. Bind the component instance with <code>bind:this</code> to call it.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Markdown Editor</ProseTitle>
		<ProseText>
			A markdown editor with Edit, Split, and Preview modes. Split mode pairs a plain-text source pane with a rendered preview on the right.
			Supports bold, italic, headings, lists, blockquotes, and inline code — no toolbar needed.
			Integrates seamlessly with the Block Editor via the <DocInlineCode>onnavigate</DocInlineCode> callback.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
				<ProseText>
					Pass <DocInlineCode>value</DocInlineCode> and update it in <DocInlineCode>onchange</DocInlineCode> to track the markdown string.
					The left pane shows plain-text Markdown source; the right pane renders the live HTML preview via <DocInlineCode>marked</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Pre-filled content</ProseTitle>
				<ProseText>
					Pass an initial <DocInlineCode>value</DocInlineCode> to pre-populate the editor.
					All standard Markdown elements — headings, lists, blockquotes, code, horizontal rules — are rendered in the preview.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Keyboard shortcuts</ProseTitle>
				<ProseText>
					<DocInlineCode>Ctrl+B</DocInlineCode> / <DocInlineCode>⌘B</DocInlineCode> wraps the selection (or inserts an empty pair) in <DocInlineCode>**bold**</DocInlineCode>.
					<DocInlineCode>Ctrl+I</DocInlineCode> / <DocInlineCode>⌘I</DocInlineCode> wraps in <DocInlineCode>*italic*</DocInlineCode>.
					<DocInlineCode>Tab</DocInlineCode> and <DocInlineCode>Shift+Tab</DocInlineCode> call <DocInlineCode>onnavigate</DocInlineCode> instead of inserting whitespace —
					when embedded in the Block Editor this moves focus to the next or previous block.
				</ProseText>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Programmatic focus</ProseTitle>
				<ProseText>
					Bind the component instance with <DocInlineCode>bind:this</DocInlineCode> and call <DocInlineCode>editorRef.focus()</DocInlineCode>
					to move focus to the textarea from outside. This is how the Block Editor focuses a markdown block when activated.
				</ProseText>
	</ProseParagraph>
</ProsePage>
