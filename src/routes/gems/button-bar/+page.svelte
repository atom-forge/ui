<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable, {type PropDef} from "../../../components/doc/ApiTable.svelte";

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		{ group: 'ButtonBar', name: 'children', type: 'Snippet', description: 'Items to render inside the bar.' },

		{ group: 'ButtonBarItem', name: 'children', type: 'Snippet', description: 'Component to wrap.' },
	];
</script>

<DocTitle>Button Bar</DocTitle>
<DocText>
	A visual grouping wrapper that connects its children into a unified bar. Borders and rounded corners are automatically stripped from direct children — size is controlled on the children themselves.
	Use <InlineCode>ButtonBarItem</InlineCode> to wrap components that need a normalised container (background, padding, vertical stretch).
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Buttons</DocSubtitle>
		<DocText>Pass <InlineCode>compact</InlineCode> or <InlineCode>small</InlineCode> directly to the children — ButtonBar adapts to their height.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Mixed Components</DocSubtitle>
		<DocText>Any component with a styled outer element (Input, Select, etc.) works as a direct child — ButtonBar strips their border and rounding automatically.
			To make the bar full-width and let a child grow to fill the remaining space, add <InlineCode>class="flex w-full"</InlineCode> to <InlineCode>ButtonBar</InlineCode> and <InlineCode>class="flex-1"</InlineCode> to the stretching child.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
	<div>
		<DocSubtitle>ButtonBarItem</DocSubtitle>
		<DocText>Wrap components without a standard control surface (Switch, Slider, ColorPicker…) in <InlineCode>ButtonBarItem</InlineCode> to give them a matching background and stretch to the bar's height.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
</div>
