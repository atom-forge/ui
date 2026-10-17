<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3Raw from './examples/Example3.svelte?raw';
	import Example4 from './examples/Example4.svelte';
	import example4Raw from './examples/Example4.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Core',        name: 'value',       type: 'string',    default: "''",     description: 'Bindable text content.' },
		{ group: 'Core',        name: 'dirty',       type: 'boolean',   default: 'false',  description: 'Bindable. <code>true</code> if the value has changed from the initial value.' },
		{ group: 'Core',        name: 'placeholder', type: 'string',    default: '—',      description: 'Placeholder text.' },
		{ group: 'Core',        name: 'disabled',    type: 'boolean',   default: 'false',  description: 'Disables the textarea.' },
		{ group: 'Core',        name: 'invalid',     type: 'boolean',   default: 'false',  description: 'Shows a red destructive border.' },
		{ group: 'Sizing',      name: 'rows',        type: 'number',    default: '3',      description: 'Minimum number of visible rows.' },
		{ group: 'Sizing',      name: 'maxRows',     type: 'number',    default: '—',      description: 'Maximum rows the field can grow to with autogrow.' },
		{ group: 'Sizing',      name: 'resizable',   type: 'boolean',   default: 'false',  description: 'Enables the native resize handle.' },
		{ group: 'Sizing',      name: 'compact',     type: 'boolean',   default: '—',      description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Sizing',      name: 'small',       type: 'boolean',   default: '—',      description: 'Small size. Mutually exclusive with <code>compact</code>.' },
		{ group: 'Functional',  name: 'maxLength',   type: 'number',    default: '—',      description: 'Maximum number of characters.' },
		{ group: 'Functional',  name: 'showCounter', type: 'boolean',   default: 'false',  description: 'Shows a character counter in the bottom-right corner.' },
		{ group: 'Functional',  name: 'monospace',   type: 'boolean',   default: 'false',  description: 'Uses a monospace font (<code>font-mono</code>).' },
		{ group: 'Functional',  name: 'handleTab',   type: 'boolean',   default: 'false',  description: 'Enables smart Tab / Shift+Tab indent handling.' },
		{ group: 'Functional',  name: 'tabSize',     type: 'number',    default: '2',      description: 'Indent size in spaces. <code>0</code> inserts a literal tab character.' },

		{ group: 'Snippets',    name: 'adornment',   type: 'Snippet',   default: '—',      description: 'Rendered in the bottom-right corner alongside the counter when <code>showCounter</code> is enabled.' },
		{ group: 'Styling', name: 'class', type: 'string', description: 'Extra classes on the outer field wrapper.' },
		{ group: 'API (bind:this)', name: 'wrapSelection(wrap, unwrapWhenWrapped?)', type: '(string | [string, string], boolean?) => void', description: 'Wrap the selection; optionally remove matching surrounding markers.' },
		{ group: 'API (bind:this)', name: 'insertAtCursor(text)', type: '(string) => void', description: 'Insert text at the cursor without replacing the selected text.' },
		{ group: 'API (bind:this)', name: 'selectAll()', type: '() => void', description: 'Select all text.' },
		{ group: 'API (bind:this)', name: 'focus(at?)', type: "(at?: 'beginning' | 'end') => void", description: 'Focus the field; end moves the cursor to the end.' },
		{ group: 'Snippets',    name: 'counter',     type: 'Snippet<[{count, max, words, letters}]>', default: '—', description: 'Custom counter snippet. Receives <code>count</code>, <code>max</code>, <code>words</code>, <code>letters</code>.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Textarea</ProseTitle>
		<ProseText>
			A multi-line text input that matches the visual style of <DocInlineCode>Input</DocInlineCode>. Features autogrow,
			character counter, dirty tracking, smart Tab indentation, and a programmatic API for text manipulation via <DocInlineCode>bind:this</DocInlineCode>.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic & Autogrow</ProseTitle>
				<ProseText>
					Bind <DocInlineCode>value</DocInlineCode>. The field grows automatically as content fills it.
					Use <DocInlineCode>maxRows</DocInlineCode> to cap the growth and <DocInlineCode>showCounter</DocInlineCode> + <DocInlineCode>maxLength</DocInlineCode> to add a character counter.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Code Editor (monospace + Tab)</ProseTitle>
				<ProseText>
					Enable <DocInlineCode>monospace</DocInlineCode> and <DocInlineCode>handleTab</DocInlineCode> for a lightweight code editor feel.
					<DocInlineCode>Tab</DocInlineCode> indents, <DocInlineCode>Shift+Tab</DocInlineCode> outdents — both work on single lines and multi-line selections.
					Bind <DocInlineCode>dirty</DocInlineCode> to track unsaved changes.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>External Toolbar & bind:this API</ProseTitle>
				<ProseText>
					Compose a separate <DocInlineCode>ButtonBar</DocInlineCode> above the field. Textarea has no <DocInlineCode>toolbar</DocInlineCode> prop in 0.0.34.
					Access <DocInlineCode>wrapSelection()</DocInlineCode>, <DocInlineCode>insertAtCursor()</DocInlineCode>, and <DocInlineCode>selectAll()</DocInlineCode> via <DocInlineCode>bind:this</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example3} code={example3Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes & States</ProseTitle>
				<ProseText>Three sizes: normal, <DocInlineCode>compact</DocInlineCode>, <DocInlineCode>small</DocInlineCode>. Plus <DocInlineCode>invalid</DocInlineCode> and <DocInlineCode>disabled</DocInlineCode> states.</ProseText>
				<DocShowExample component={Example4} code={example4Raw}/>
	</ProseParagraph>
</ProsePage>
