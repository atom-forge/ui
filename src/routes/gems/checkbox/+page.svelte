<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable from "../../../components/doc/ApiTable.svelte";
	import type { PropDef } from "../../../components/doc/ApiTable.svelte";

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

	const props: PropDef[] = [
		{ group: 'Checkbox' },
		{ name: 'value', type: 'boolean', default: 'false', description: 'The bound checked state of the checkbox.' },
		{ name: 'label', type: 'string', description: 'The text label displayed next to the checkbox.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Renders the checkbox in a disabled, non-interactive state.' },
		{ name: 'primary', type: 'boolean', description: 'Uses the primary color for the checked state.' },
		{ name: 'accent', type: 'boolean', description: 'Uses the accent color for the checked state. Mutually exclusive with <code>primary</code>.' },
		{ name: 'compact', type: 'boolean', description: 'Applies a medium compact size (16px box).' },
		{ name: 'small', type: 'boolean', description: 'Applies the smallest size (14px box).' },
		{ name: 'group', type: 'string', description: 'The name of the group this checkbox belongs to. Requires a <code>CheckboxGroupManager</code> ancestor or <code>createCheckboxGroupManager()</code>.' },
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
	];
</script>

<DocTitle>Checkbox</DocTitle>
<DocText>A checkbox for toggling boolean values. It can be used standalone or grouped with a master "select all" control. The <InlineCode>CheckboxView</InlineCode> component is also exposed for cases where you need full control over state management.</DocText>

<ApiBlock title="Props">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>A standalone checkbox with a bound value.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Variants</DocSubtitle>
		<DocText>By default the checked state uses a neutral <InlineCode>control</InlineCode> fill. Add <InlineCode>primary</InlineCode> or <InlineCode>accent</InlineCode> to apply a colored variant.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes are available: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>. These are mutually exclusive.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
	<div>
		<DocSubtitle>Disabled State</DocSubtitle>
		<DocText>Pass <InlineCode>disabled</InlineCode> to prevent interaction. Works in both checked and unchecked states.</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>
	<div>
		<DocSubtitle>Checkbox Group with Wrapper</DocSubtitle>
		<DocText>Wrap checkboxes in <InlineCode>CheckboxGroupManager</InlineCode> to share a group context. A <InlineCode>master</InlineCode> checkbox will show an indeterminate state when only some items are checked, and toggle all on click.</DocText>
		<ShowExample component={Example5} code={example5}/>
	</div>
	<div>
		<DocSubtitle>Programmatic Group Management</DocSubtitle>
		<DocText>Call <InlineCode>createCheckboxGroupManager()</InlineCode> in a script block instead of using the wrapper component. Useful when grouped checkboxes are scattered across different parts of the layout.</DocText>
		<ShowExample component={Example6} code={example6}/>
	</div>
</div>
