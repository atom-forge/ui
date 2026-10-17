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
		{ group: 'Props', name: 'value',       type: '(string | number)[]', default: '[]',     description: 'Selected values. Use <code>bind:value</code> for two-way binding.' },
		{ group: 'Props', name: 'options',      type: 'SelectOptionsSource', default: '—', description: 'Static array or async source object. The async form is <code>{ search(query): Promise&lt;SelectOption[]&gt;, get(values): Promise&lt;SelectOption[]&gt; }</code>.' },
		{ group: 'Props', name: 'placeholder',  type: 'string',              default: "'Select...'", description: 'Placeholder shown when nothing is selected.' },
		{ group: 'Props', name: 'disabled',     type: 'boolean',             default: 'false',  description: 'Disables the trigger and prevents opening the dropdown. Does not guard chip removal callbacks or sorting.' },
		{ group: 'Props', name: 'searchable',   type: 'boolean',             default: 'true',   description: 'Shows a search input in the dropdown.' },
		{ group: 'Props', name: 'button', type: '{ label: string; icon?: IconDefinition; endIcon?: IconDefinition; secondary?: boolean; destructive?: boolean; ghost?: boolean; link?: boolean; muted?: boolean; accent?: boolean; outline?: boolean; pill?: boolean; borderless?: boolean }', description: 'Fixed-label Button trigger instead of the chip field. Choose at most one variant flag.' },
				{ group: 'Props', name: 'hideKeyboardHints', type: 'boolean', default: 'false', description: 'Hide the keyboard-hint footer in the dropdown.' },
				{ group: 'Props', name: 'clearable',    type: 'boolean',             default: 'false',  description: 'Shows a clear-all button when items are selected.' },
		{ group: 'Props', name: 'sortable',     type: 'boolean',             default: 'false',  description: 'Enables drag-and-drop chip reordering. Keeps <code>value</code> in sync with the new order.' },
		{ group: 'Props', name: 'max',          type: 'number',              default: '—',      description: 'Maximum number of selectable items. Options are greyed out once the limit is reached.' },
		{ group: 'Props', name: 'compact',      type: 'boolean',             default: '—',      description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Props', name: 'small',        type: 'boolean',             default: '—',      description: 'Small size. Mutually exclusive with <code>compact</code>.' },
		{ group: 'Props', name: 'class',        type: 'string',              default: '—',      description: 'Extra classes forwarded to the trigger element.' },

		{ group: 'Snippets', name: 'chip',   type: 'Snippet<[SelectOption, () => void]>', default: '—', description: 'Custom chip renderer. Receives the full option object and a <code>remove()</code> callback.' },
		{ group: 'Snippets', name: 'option', type: 'Snippet<[SelectOption, boolean]>',   default: '—', description: 'Custom dropdown item renderer. Receives the option and an <code>isHighlighted</code> flag.' },

		{ group: 'Keyboard', name: 'ArrowDown / Up', type: '—', default: '—', description: 'Navigates the dropdown list.' },
		{ group: 'Keyboard', name: 'Enter',          type: '—', default: '—', description: 'Toggles the highlighted option.' },
		{ group: 'Keyboard', name: 'Escape',         type: '—', default: '—', description: 'Closes the dropdown.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Multi Select</ProseTitle>
		<ProseText>
			Select multiple items from a list. The component stores the <DocInlineCode>value</DocInlineCode> field
			of each selected option while displaying the human-readable <DocInlineCode>label</DocInlineCode> as chips.
			Supports static arrays and async source objects with search and get methods.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>
					Pass a <DocInlineCode>{'{ value, label }[]'}</DocInlineCode> array as <DocInlineCode>options</DocInlineCode>.
					Click the trigger to open the dropdown and toggle items.
				</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>
					Three sizes available: <DocInlineCode>normal</DocInlineCode> (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled & Max Limit</ProseTitle>
				<ProseText>
					<DocInlineCode>disabled</DocInlineCode> disables the trigger and prevents opening the dropdown. In 0.0.34, chip removal callbacks and sorting are not guarded by this flag; do not use it as a complete read-only guarantee. Guard custom chip actions and omit sorting when a non-editable presentation is required.
					<DocInlineCode>max</DocInlineCode> caps how many items can be selected — further options are greyed out.
					<DocInlineCode>clearable</DocInlineCode> adds a button to clear all selections at once.
				</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Async Search</ProseTitle>
				<ProseText>
					Pass an object with <DocInlineCode>search</DocInlineCode> and <DocInlineCode>get</DocInlineCode> as <DocInlineCode>options</DocInlineCode> to fetch results on demand.
					<DocInlineCode>search(query)</DocInlineCode> is called on every query change.
					<DocInlineCode>get(values)</DocInlineCode> resolves selected values after mount and when the selection changes so their labels are shown correctly.
				</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sortable</ProseTitle>
				<ProseText>
					Add <DocInlineCode>sortable</DocInlineCode> to allow drag-and-drop reordering of selected chips.
					The <DocInlineCode>value</DocInlineCode> binding is kept in sync with the new order.
				</ProseText>
				<DocShowExample component={Example5} code={example5}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom Chip</ProseTitle>
				<ProseText>
					Use the <DocInlineCode>chip</DocInlineCode> snippet to replace the default chip.
					It receives the full <DocInlineCode>SelectOption</DocInlineCode> object and a <DocInlineCode>remove()</DocInlineCode> callback.
				</ProseText>
				<DocShowExample component={Example6} code={example6}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Button trigger mode</ProseTitle>
		<ProseText>Supply button for a fixed-label trigger rather than a chip field. See the <a href="/ui/forms/select" class="text-accent hover:underline">Select button-trigger example</a> for both Select and MultiSelect. Use the value binding to render your own selection summary.</ProseText>
	</ProseParagraph>
</ProsePage>
