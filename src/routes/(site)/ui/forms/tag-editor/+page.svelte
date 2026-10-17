<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';
	import Example4 from './examples/Example4.svelte';
	import example4 from './examples/Example4.svelte?raw';
	import Example5 from './examples/Example5.svelte';
	import example5 from './examples/Example5.svelte?raw';
	import Example6 from './examples/Example6.svelte';
	import example6 from './examples/Example6.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props', name: 'value',       type: 'string[]',   default: '[]',            description: 'The current list of tags. Use <code>bind:value</code> for two-way binding.' },
		{ group: 'Props', name: 'placeholder',  type: 'string',     default: "'Add tags...'", description: 'Placeholder shown when no tags are present.' },
		{ group: 'Props', name: 'disabled',     type: 'boolean',    default: 'false',         description: 'Disables text entry and opening suggestions. In 0.0.34 existing chip remove buttons, clear-all, and sorting are not all guarded; do not use this as a read-only guarantee.' },
		{ group: 'Props', name: 'clearable',    type: 'boolean',    default: 'false',         description: 'Shows a clear-all button when tags are present.' },
		{ group: 'Props', name: 'allowNew',     type: 'boolean',    default: 'true',          description: 'When <code>false</code>, only values from <code>options</code> can be added.' },
		{ group: 'Props', name: 'primary / secondary / danger / accent', type: 'true (choose at most one)', default: 'primary', description: 'Built-in chip palette. TagEditor uses <code>danger</code>, not Button\'s <code>destructive</code> prop. Ignored by a custom chip snippet.' },
				{ group: 'Props', name: 'sortable',     type: 'boolean',    default: 'false',         description: 'Enables drag-and-drop reordering of tags.' },
		{ group: 'Props', name: 'uppercase',    type: 'boolean',    default: '—',             description: 'Normalizes every tag to uppercase. Mutually exclusive with <code>lowercase</code>.' },
		{ group: 'Props', name: 'lowercase',    type: 'boolean',    default: '—',             description: 'Normalizes every tag to lowercase. Mutually exclusive with <code>uppercase</code>.' },
		{ group: 'Props', name: 'compact',      type: 'boolean',    default: '—',             description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Props', name: 'small',        type: 'boolean',    default: '—',             description: 'Small size. Mutually exclusive with <code>compact</code>.' },
		{ group: 'Props', name: 'class',        type: 'string',     default: '—',             description: 'Extra classes forwarded to the wrapper element.' },

		{ group: 'Props', name: 'options', type: 'string[] | ((query: string) => Promise<string[]>)', default: '—', description: 'Static list or async function. Static arrays are filtered automatically by the current input. When omitted, no dropdown is shown.' },

		{ group: 'Snippets', name: 'chip',   type: 'Snippet<[string, () => void]>',  default: '—', description: 'Custom chip renderer. Receives the tag string and a <code>remove()</code> callback.' },
		{ group: 'Snippets', name: 'option', type: 'Snippet<[string, boolean]>',     default: '—', description: 'Custom dropdown item renderer. Receives the suggestion string and an isHighlighted flag. Provide the highlighted background in your renderer; it is not supplied by the surrounding row.' },

		{ group: 'Keyboard', name: 'Enter',           type: '—', default: '—', description: 'Confirms the current input as a new tag, or selects the highlighted suggestion.' },
		{ group: 'Keyboard', name: 'ArrowDown / Up',  type: '—', default: '—', description: 'Navigates the suggestion dropdown.' },
		{ group: 'Keyboard', name: 'Escape',          type: '—', default: '—', description: 'Closes the suggestion dropdown.' },
		{ group: 'Keyboard', name: 'Backspace',       type: '—', default: '—', description: 'When the input is empty, removes the last tag.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Tag Editor</ProseTitle>
		<ProseText>
			An interactive input that manages a list of string tags. Type and press
			<DocInlineCode>Enter</DocInlineCode> to add a tag; remove them with the
			<DocInlineCode>×</DocInlineCode> button or <DocInlineCode>Backspace</DocInlineCode>.
			Supports static and async autocomplete suggestions.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>
					Bind <DocInlineCode>value</DocInlineCode> to a <DocInlineCode>string[]</DocInlineCode>. Press
					<DocInlineCode>Enter</DocInlineCode> to confirm, <DocInlineCode>Backspace</DocInlineCode> on empty input removes the last tag.
				</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>
					Three sizes: <DocInlineCode>normal</DocInlineCode> (default), <DocInlineCode>compact</DocInlineCode>, <DocInlineCode>small</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled, Clearable & Case</ProseTitle>
				<ProseText>
					<DocInlineCode>disabled</DocInlineCode> disables text entry and suggestion opening; existing chip actions are not fully disabled in 0.0.34.
					<DocInlineCode>clearable</DocInlineCode> adds a clear-all button.
					<DocInlineCode>uppercase</DocInlineCode> and <DocInlineCode>lowercase</DocInlineCode> normalize input on the fly.
				</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Options</ProseTitle>
				<ProseText>
					Pass a static array or an async function as <DocInlineCode>options</DocInlineCode>.
					A dropdown appears while typing; the highlighted option is added with <DocInlineCode>Enter</DocInlineCode>.
					Set <DocInlineCode>allowNew={'{false}'}</DocInlineCode> to restrict input to listed values only.
				</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sortable</ProseTitle>
				<ProseText>
					Add <DocInlineCode>sortable</DocInlineCode> to enable drag-and-drop reordering.
					The <DocInlineCode>value</DocInlineCode> binding stays in sync with the displayed order.
				</ProseText>
				<DocShowExample component={Example5} code={example5}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom Chip & Option</ProseTitle>
				<ProseText>
					Use the <DocInlineCode>chip</DocInlineCode> snippet for custom tag rendering and <DocInlineCode>option</DocInlineCode> for custom suggestions. The option snippet receives the string and a highlight flag; style both the foreground and background for the highlighted state.
				</ProseText>
				<DocShowExample component={Example6} code={example6}/>
	</ProseParagraph>
</ProsePage>
