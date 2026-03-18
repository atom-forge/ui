<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable from '../../../components/doc/ApiTable.svelte';
	import type {PropDef} from '../../../components/doc/ApiTable.svelte';

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
		{ group: 'Props', name: 'disabled',     type: 'boolean',             default: 'false',  description: 'Disables the trigger. Chips remain visible but cannot be removed.' },
		{ group: 'Props', name: 'searchable',   type: 'boolean',             default: 'true',   description: 'Shows a search input in the dropdown.' },
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

<DocTitle>Multi Select</DocTitle>
<DocText>
	Select multiple items from a list. The component stores the <InlineCode>value</InlineCode> field
	of each selected option while displaying the human-readable <InlineCode>label</InlineCode> as chips.
	Supports static arrays and async search functions.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>
			Pass a <InlineCode>{'{ value, label }[]'}</InlineCode> array as <InlineCode>options</InlineCode>.
			Click the trigger to open the dropdown and toggle items.
		</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>
			Three sizes available: <InlineCode>normal</InlineCode> (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.
		</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Disabled & Max Limit</DocSubtitle>
		<DocText>
			<InlineCode>disabled</InlineCode> prevents all interaction.
			<InlineCode>max</InlineCode> caps how many items can be selected — further options are greyed out.
			<InlineCode>clearable</InlineCode> adds a button to clear all selections at once.
		</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>

	<div>
		<DocSubtitle>Async Search</DocSubtitle>
		<DocText>
			Pass an object with <InlineCode>search</InlineCode> and <InlineCode>get</InlineCode> as <InlineCode>options</InlineCode> to fetch results on demand.
			<InlineCode>search(query)</InlineCode> is called on every query change.
			<InlineCode>get(values)</InlineCode> is called on mount to resolve pre-selected values so their labels are shown correctly.
		</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>

	<div>
		<DocSubtitle>Sortable</DocSubtitle>
		<DocText>
			Add <InlineCode>sortable</InlineCode> to allow drag-and-drop reordering of selected chips.
			The <InlineCode>value</InlineCode> binding is kept in sync with the new order.
		</DocText>
		<ShowExample component={Example5} code={example5}/>
	</div>

	<div>
		<DocSubtitle>Custom Chip</DocSubtitle>
		<DocText>
			Use the <InlineCode>chip</InlineCode> snippet to replace the default chip.
			It receives the full <InlineCode>SelectOption</InlineCode> object and a <InlineCode>remove()</InlineCode> callback.
		</DocText>
		<ShowExample component={Example6} code={example6}/>
	</div>
</div>
