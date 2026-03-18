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
	import Example7 from "./examples/Example7.svelte";
	import example7 from "./examples/Example7.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Accordion', name: 'multiple', type: 'boolean', default: 'false', description: 'Allows multiple items to be open simultaneously.' },
		{ group: 'Accordion', name: 'borderless', type: 'boolean', default: 'false', description: 'Removes borders from items.' },
		{ group: 'Accordion', name: 'joined', type: 'boolean', default: 'false', description: 'Renders items as a single connected list with dividers instead of separated cards.' },
		{ group: 'Accordion', name: 'compact', type: 'boolean', default: '—', description: 'Compact size — <code>p-2</code>, <code>text-sm</code>. Mutually exclusive with <code>small</code>.' },
		{ group: 'Accordion', name: 'small', type: 'boolean', default: '—', description: 'Small size — <code>p-1 px-2</code>, <code>text-xs</code>. Mutually exclusive with <code>compact</code>.' },

		{ group: 'AccordionItem', name: 'title', type: 'string', description: 'Text displayed in the header button.' },
		{ group: 'AccordionItem', name: 'icon', type: 'IconDefinition', description: 'Optional icon displayed before the title.' },
		{ group: 'AccordionItem', name: 'id', type: 'string', default: 'random UUID', description: 'Unique identifier for the item. Auto-generated if omitted.' },

		{ group: 'Collapsible', name: 'title', type: 'string', description: 'Text displayed in the header button.' },
		{ group: 'Collapsible', name: 'icon', type: 'IconDefinition', description: 'Optional icon displayed before the title.' },
		{ group: 'Collapsible', name: 'open', type: 'boolean', default: 'false', description: 'Bindable open/closed state.' },
		{ group: 'Collapsible', name: 'borderless', type: 'boolean', default: 'false', description: 'Removes the border.' },
		{ group: 'Collapsible', name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Collapsible', name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<DocTitle>Accordion</DocTitle>
<DocText>A vertically stacked set of interactive headings that each reveal a section of content. <InlineCode>Collapsible</InlineCode> is a standalone single-item variant that manages its own state.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Standard Accordion</DocSubtitle>
		<DocText>By default, only one item can be open at a time.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Multiple Open Items</DocSubtitle>
		<DocText>Use the <InlineCode>multiple</InlineCode> prop to allow multiple items to be open simultaneously.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>. Controls header padding and font size.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>

	<div>
		<DocSubtitle>Borderless</DocSubtitle>
		<DocText>Use <InlineCode>borderless</InlineCode> to remove the outer border from items — useful when nesting inside other surfaces.</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>

	<div>
		<DocSubtitle>With Icons</DocSubtitle>
		<DocText>Pass an <InlineCode>icon</InlineCode> to <InlineCode>AccordionItem</InlineCode> to display it before the title.</DocText>
		<ShowExample component={Example5} code={example5}/>
	</div>

	<div>
		<DocSubtitle>Joined</DocSubtitle>
		<DocText>Use <InlineCode>joined</InlineCode> to merge items into a single bordered list divided by separators, instead of separate cards.</DocText>
		<ShowExample component={Example6} code={example6}/>
	</div>

	<div>
		<DocSubtitle>Collapsible</DocSubtitle>
		<DocText>
			<InlineCode>Collapsible</InlineCode> is a self-contained single-item accordion — no <InlineCode>Accordion</InlineCode> wrapper needed.
			Use <InlineCode>bind:open</InlineCode> for two-way control.
		</DocText>
		<ShowExample component={Example7} code={example7}/>
	</div>
</div>
