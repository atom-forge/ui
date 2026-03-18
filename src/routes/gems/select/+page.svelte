<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable from "../../../components/doc/ApiTable.svelte";
	import type {PropDef} from "../../../components/doc/ApiTable.svelte";

	import Example1 from "./examples/Example1.svelte";
	import example1Raw from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2Raw from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3Raw from "./examples/Example3.svelte?raw";
	import Example4 from "./examples/Example4.svelte";
	import example4Raw from "./examples/Example4.svelte?raw";
	import Example5 from "./examples/Example5.svelte";
	import example5Raw from "./examples/Example5.svelte?raw";
	import Example6 from "./examples/Example6.svelte";
	import example6Raw from "./examples/Example6.svelte?raw";

	const props: PropDef[] = [
		{group: 'Props', name: 'value', type: 'string | number', description: 'Bindable selected value.'},
		{group: 'Props', name: 'options', type: 'SelectOptionsSource', description: 'Static array or async source object. The async form is <code>{ search(query): Promise&lt;SelectOption[]&gt;, get(values): Promise&lt;SelectOption[]&gt; }</code> — <code>search</code> is called on query change, <code>get</code> resolves pre-selected values.'},
		{group: 'Props', name: 'placeholder', type: 'string', default: "'Select...'", description: 'Text shown when no value is selected.'},
		{group: 'Props', name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button.'},
		{group: 'Props', name: 'searchable', type: 'boolean', default: 'true', description: 'Shows a search input inside the dropdown.'},
		{group: 'Props', name: 'clearable', type: 'boolean', default: 'false', description: 'Shows an × button to clear the current value. Clicking the selected item again also clears it.'},
		{group: 'Props', name: 'compact', type: 'boolean', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.'},
		{group: 'Props', name: 'small', type: 'boolean', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.'},
		{group: 'Props', name: 'class', type: 'string', description: 'Extra CSS classes on the trigger button.'},
		{group: 'Snippets', name: 'trigger', type: 'Snippet<[SelectOption]>', description: 'Custom rendering of the selected value inside the trigger button. Receives the full <code>SelectOption</code> object.'},
		{group: 'Snippets', name: 'option', type: 'Snippet<[SelectOption, boolean]>', description: 'Custom rendering of each dropdown item. Receives <code>(option, isHighlighted)</code>.'},
		{group: 'Types', name: 'SelectOption', type: '{ value: string | number; label: any }', description: 'Base option type. Extend with extra fields and access them via <code>(opt as any).myField</code> in snippets.'},
		{group: 'Types', name: 'SelectOptionsSource', type: 'SelectOption[] | { search: (query: string) => Promise&lt;SelectOption[]&gt;; get: (values: (string | number)[]) => Promise&lt;SelectOption[]&gt; }', description: 'Union type for the <code>options</code> prop. The object form allows async search and pre-selected value resolution.'},
	];
</script>

<DocTitle>Select</DocTitle>
<DocText>
	A popup-based dropdown select. Accepts a static options array or an async search function.
	Supports custom rendering via snippets for both the trigger display and dropdown items.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Basic</DocSubtitle>
		<DocText>Pass a <InlineCode>SelectOption[]</InlineCode> array and bind <InlineCode>value</InlineCode>. The dropdown shows a search input by default.</DocText>
		<ShowExample component={Example1} code={example1Raw}/>
	</div>

	<div>
		<DocSubtitle>Clearable</DocSubtitle>
		<DocText>Add <InlineCode>clearable</InlineCode> to show an × button. Selecting the same item again also clears the value.</DocText>
		<ShowExample component={Example2} code={example2Raw}/>
	</div>

	<div>
		<DocSubtitle>Async search</DocSubtitle>
		<DocText>
			Pass an object with <InlineCode>search</InlineCode> and <InlineCode>get</InlineCode> as <InlineCode>options</InlineCode>.
			<InlineCode>search(query)</InlineCode> is called on every query change.
			<InlineCode>get(values)</InlineCode> resolves pre-selected values (e.g. on page load) so the trigger can display the correct label.
		</DocText>
		<ShowExample component={Example3} code={example3Raw}/>
	</div>

	<div>
		<DocSubtitle>Custom rendering</DocSubtitle>
		<DocText>
			Use the <InlineCode>trigger</InlineCode> snippet to customize the trigger, and <InlineCode>option</InlineCode> to customize each dropdown row.
			Extra fields on the option object are accessible via <InlineCode>(opt as any).field</InlineCode>.
		</DocText>
		<ShowExample component={Example4} code={example4Raw}/>
	</div>

	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes available: normal (default, <InlineCode>h-10</InlineCode>), <InlineCode>compact</InlineCode> (<InlineCode>h-8</InlineCode>), and <InlineCode>small</InlineCode> (<InlineCode>h-6</InlineCode>).</DocText>
		<ShowExample component={Example5} code={example5Raw}/>
	</div>

	<div>
		<DocSubtitle>Disabled & non-searchable</DocSubtitle>
		<DocText>Use <InlineCode>disabled</InlineCode> to make the control inert. Set <InlineCode>searchable={'{false}'}</InlineCode> to hide the search input and show a plain list.</DocText>
		<ShowExample component={Example6} code={example6Raw}/>
	</div>
</div>
