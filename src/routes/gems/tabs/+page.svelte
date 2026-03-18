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

	const props: PropDef[] = [
		{ group: 'Tabs', name: 'initialTabId', type: 'string', description: 'ID of the tab active on first render.' },
		{ group: 'Tabs', name: 'variant', type: "'line' | 'button'", default: "'line'", description: 'Visual style. <code>line</code> shows an underline indicator; <code>button</code> renders a segmented control.' },
		{ group: 'Tabs', name: 'onTabChange', type: '(id: string) => void', description: 'Called whenever the active tab changes.' },

		{ group: 'Tab', name: 'id', type: 'string', description: 'Unique identifier. Must match the <code>id</code> of the corresponding <code>TabPanel</code>.' },
		{ group: 'Tab', name: 'icon', type: 'IconDefinition', description: 'Optional icon shown before the tab label.' },

		{ group: 'TabPanel', name: 'id', type: 'string', description: 'Matches the <code>Tab</code> with the same <code>id</code>. Panel is rendered only when its tab is active.' },
	];
</script>

<DocTitle>Tabs</DocTitle>
<DocText>
	A set of context-connected components — <InlineCode>Tabs</InlineCode>, <InlineCode>TabList</InlineCode>, <InlineCode>Tab</InlineCode>, <InlineCode>TabPanels</InlineCode>, <InlineCode>TabPanel</InlineCode> — for organizing content into switchable views.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Line Variant</DocSubtitle>
		<DocText>The default <InlineCode>line</InlineCode> variant shows an underline indicator on the active tab.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Button Variant</DocSubtitle>
		<DocText>Use <InlineCode>variant="button"</InlineCode> for a segmented control style.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
	<div>
		<DocSubtitle>With Icons</DocSubtitle>
		<DocText>Pass an <InlineCode>icon</InlineCode> to each <InlineCode>Tab</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
</div>
