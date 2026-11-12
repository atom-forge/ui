<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";
	import Example4 from "./examples/Example4.svelte";
	import example4 from "./examples/Example4.svelte?raw";
	import Example5 from "./examples/Example5.svelte";
	import example5 from "./examples/Example5.svelte?raw";
	import Example6 from "./examples/Example6.svelte";
	import example6 from "./examples/Example6.svelte?raw";
		import Example7 from './examples/Example7.svelte';
		import example7 from './examples/Example7.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Checkbox' },
		{ name: 'value', type: 'boolean', default: 'false', description: 'Bindable checked state. Choose either <code>value</code> or <code>checked</code>, not both.' },
				{ name: 'checked', type: 'boolean', description: 'Bindable alias for value. Initialize it to a boolean before binding; alias mode is selected on component creation.' },
				{ name: 'onchange', type: '(checked: boolean) => void', description: 'Called when interaction or group management changes the checked state.' },
		{ name: 'label', type: 'string', description: 'The text label displayed next to the checkbox.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Renders the checkbox in a disabled, non-interactive state.' },
		{ name: 'primary', type: 'boolean', description: 'Uses the primary color for the checked state.' },
		{ name: 'accent', type: 'boolean', description: 'Uses the accent color for the checked state. Mutually exclusive with <code>primary</code>.' },
		{ name: 'compact', type: 'boolean', description: 'Applies a medium compact size (16px box).' },
		{ name: 'small', type: 'boolean', description: 'Applies the smallest size (14px box).' },
		{ name: 'class', type: 'string', description: 'Extra classes on the CheckboxView wrapper. Also accepted by Checkbox.' },
				{ name: 'group', type: 'string', description: 'Group name, frozen at initialization. Changing it later does not re-register the checkbox. Requires a <code>CheckboxGroupManager</code> ancestor or <code>createCheckboxGroupManager()</code>.' },
		{ name: 'master', type: 'boolean', default: 'false', description: 'When <code>group</code> is set, this checkbox toggles all others in the group and shows an indeterminate state when only some are checked.' },
		{ group: 'CheckboxView' },
		{ name: 'status', type: "'checked' | 'some' | 'unchecked'", default: "'unchecked'", description: 'The visual state of the checkbox.' },
		{ name: 'label', type: 'string', description: 'The text label displayed next to the checkbox.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Renders in a disabled, non-interactive appearance.' },
		{ name: 'primary', type: 'boolean', description: 'Uses the primary color for the active state.' },
		{ name: 'accent', type: 'boolean', description: 'Uses the accent color for the active state. Mutually exclusive with <code>primary</code>.' },
		{ name: 'compact', type: 'boolean', description: 'Applies a medium compact size (16px box).' },
		{ name: 'small', type: 'boolean', description: 'Applies the smallest size (14px box).' },
		{ name: 'onclick', type: '(event: MouseEvent) => void', description: 'Click handler — you must manage state changes yourself.' },
		{ group: 'CheckboxGroupManager' },
		{ name: 'children', type: 'Snippet', description: 'Content that shares one checkbox group context; the checkboxes inside use <code>group</code> to join a group.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Checkbox</ProseTitle>
		<ProseText>A checkbox for toggling boolean values. It can be used standalone or grouped with a master "select all" control. The <DocInlineCode>CheckboxView</DocInlineCode> component is also exposed for cases where you need full control over state management.</ProseText>

		<DocApiBlock title="Props">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>A standalone checkbox with a bound value.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Variants</ProseTitle>
				<ProseText>By default the checked state uses a neutral <DocInlineCode>secondary</DocInlineCode> fill. Add <DocInlineCode>primary</DocInlineCode> or <DocInlineCode>accent</DocInlineCode> to apply a colored variant.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes are available: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>. These are mutually exclusive.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled State</ProseTitle>
				<ProseText>Pass <DocInlineCode>disabled</DocInlineCode> to prevent interaction. Works in both checked and unchecked states.</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Checkbox Group with Wrapper</ProseTitle>
				<ProseText>Wrap checkboxes in <DocInlineCode>CheckboxGroupManager</DocInlineCode> to share a group context. A <DocInlineCode>master</DocInlineCode> checkbox will show an indeterminate state when only some items are checked, and toggle all on click.</ProseText>
				<DocShowExample component={Example5} code={example5}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Programmatic Group Management</ProseTitle>
				<ProseText>Call <DocInlineCode>createCheckboxGroupManager()</DocInlineCode> in a script block instead of using the wrapper component. Useful when grouped checkboxes are scattered across different parts of the layout.</ProseText>
				<DocShowExample component={Example6} code={example6}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Checked alias and controlled view</ProseTitle>
		<ProseText>Initialize checked to a boolean before binding and do not also supply value. CheckboxView has no binding: pass status and update it in onclick. The some state represents a mixed selection.</ProseText>
		<DocShowExample component={Example7} code={example7}/>
	</ProseParagraph>
</ProsePage>
