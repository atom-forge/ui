<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

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
		import Example7 from './examples/Example7.svelte';
		import example7Raw from './examples/Example7.svelte?raw';

	const props: PropDef[] = [
		{group: 'Props', name: 'value', type: 'string | number | undefined', description: 'Bindable selected value.'},
		{group: 'Props', name: 'options', type: 'SelectOptionsSource', description: 'Static array or async source object. The async form is <code>{ search(query): Promise&lt;SelectOption[]&gt;, get(values): Promise&lt;SelectOption[]&gt; }</code> — <code>search</code> is called on query change, <code>get</code> resolves pre-selected values.'},
		{group: 'Props', name: 'placeholder', type: 'string', default: "'Select...'", description: 'Text shown when no value is selected.'},
		{group: 'Props', name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button.'},
		{group: 'Props', name: 'searchable', type: 'boolean', default: 'true', description: 'Shows a search input inside the dropdown.'},
		{group: 'Props', name: 'button', type: '{ label: string; icon?: IconDefinition; endIcon?: IconDefinition; secondary?: boolean; destructive?: boolean; ghost?: boolean; link?: boolean; muted?: boolean; accent?: boolean; outline?: boolean; pill?: boolean; borderless?: boolean }', description: 'Use a fixed-label Button as the trigger. Choose at most one variant flag. The selected-value snippet and clear button are not rendered in this mode.'},
				{group: 'Props', name: 'hideKeyboardHints', type: 'boolean', default: 'false', description: 'Hide the keyboard-hint footer in the dropdown.'},
				{group: 'Props', name: 'clearable', type: 'boolean', default: 'false', description: 'Shows an × button to clear the current value. Clicking the selected item again also clears it.'},
		{group: 'Props', name: 'compact', type: 'boolean', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.'},
		{group: 'Props', name: 'small', type: 'boolean', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.'},
		{group: 'Props', name: 'class', type: 'string', description: 'Extra CSS classes on the trigger button.'},
		{group: 'Snippets', name: 'trigger', type: 'Snippet<[SelectOption]>', description: 'Custom rendering of the selected value inside the trigger button. Receives the full <code>SelectOption</code> object.'},
		{group: 'Snippets', name: 'option', type: 'Snippet<[SelectOption, boolean]>', description: 'Custom rendering of each dropdown item. Receives <code>(option, isHighlighted)</code>.'},
		{group: 'Types', name: 'SelectOption', type: '{ value: string | number; label: any }', description: 'Base option type. For extra fields, define a typed caster in script with the public <code>as</code> helper and use it in snippets. Casting does not validate runtime data.'},
		{group: 'Types', name: 'SelectOptionsSource', type: 'SelectOption[] | { search: (query: string) => Promise&lt;SelectOption[]&gt;; get: (values: (string | number)[]) => Promise&lt;SelectOption[]&gt; }', description: 'Union type for the <code>options</code> prop. The object form allows async search and pre-selected value resolution.'},
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Select</ProseTitle>
		<ProseText>
			A popup-based dropdown select. Accepts a static options array or an async source object with search and get methods.
			Supports custom rendering via snippets for both the trigger display and dropdown items.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
				<ProseText>Pass a <DocInlineCode>SelectOption[]</DocInlineCode> array and bind <DocInlineCode>value</DocInlineCode>. The dropdown shows a search input by default.</ProseText>
				<DocShowExample component={Example1} code={example1Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Clearable</ProseTitle>
				<ProseText>Add <DocInlineCode>clearable</DocInlineCode> to show an × button. With clearable enabled, selecting the same item again also clears the value to undefined.</ProseText>
				<DocShowExample component={Example2} code={example2Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Async search</ProseTitle>
				<ProseText>
					Pass an object with <DocInlineCode>search</DocInlineCode> and <DocInlineCode>get</DocInlineCode> as <DocInlineCode>options</DocInlineCode>.
					<DocInlineCode>search(query)</DocInlineCode> is called on every query change.
					<DocInlineCode>get(values)</DocInlineCode> resolves pre-selected values (e.g. on page load) so the trigger can display the correct label.
				</ProseText>
				<DocShowExample component={Example3} code={example3Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom rendering</ProseTitle>
				<ProseText>
					Use the <DocInlineCode>trigger</DocInlineCode> snippet to customize the trigger, and <DocInlineCode>option</DocInlineCode> to customize each dropdown row.
					For extra option fields, import <DocInlineCode>as</DocInlineCode> and define a script-side typed caster, as shown below. This follows the package's snippet convention without inline TypeScript assertions; it does not validate runtime data.
				</ProseText>
				<DocShowExample component={Example4} code={example4Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes available: normal (default, <DocInlineCode>h-10</DocInlineCode>), <DocInlineCode>compact</DocInlineCode> (<DocInlineCode>h-8</DocInlineCode>), and <DocInlineCode>small</DocInlineCode> (<DocInlineCode>h-6</DocInlineCode>).</ProseText>
				<DocShowExample component={Example5} code={example5Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled & non-searchable</ProseTitle>
				<ProseText>Use <DocInlineCode>disabled</DocInlineCode> to disable the trigger and prevent opening the dropdown. Set <DocInlineCode>searchable={'{false}'}</DocInlineCode> to hide the search input and show a plain list.</ProseText>
				<DocShowExample component={Example6} code={example6Raw}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Button triggers</ProseTitle>
		<ProseText>Supply a button configuration for a fixed-label action instead of a selected-value field. Select and MultiSelect both support this mode and hideKeyboardHints. Their selection bindings are unchanged; display the selected values separately when needed.</ProseText>
		<DocShowExample component={Example7} code={example7Raw}/>
	</ProseParagraph>
</ProsePage>
