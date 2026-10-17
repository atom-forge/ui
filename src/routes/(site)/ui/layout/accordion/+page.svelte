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
		{ group: 'Accordion', name: 'children', type: 'Snippet', description: 'Required AccordionItem content. Items require the Accordion context.' },
				{ group: 'Accordion', name: 'class', type: 'string', description: 'Root wrapper classes.' },
				{ group: 'AccordionItem', name: 'children', type: 'Snippet', description: 'Required revealed content.' },
				{ group: 'AccordionItem', name: 'class', type: 'string', description: 'Extra classes on the header button.' },
				{ group: 'AccordionItem', name: 'id', type: 'string', default: 'random string', description: 'Unique identifier for the item. Auto-generated if omitted.' },

		{ group: 'Collapsible', name: 'children', type: 'Snippet', description: 'Required revealed content; no Accordion ancestor needed.' },
				{ group: 'Collapsible', name: 'class', type: 'string', description: 'Extra classes forwarded to the header button.' },
				{ group: 'Collapsible', name: 'title', type: 'string', description: 'Text displayed in the header button.' },
		{ group: 'Collapsible', name: 'icon', type: 'IconDefinition', description: 'Optional icon displayed before the title.' },
		{ group: 'Collapsible', name: 'open', type: 'boolean', default: 'false', description: 'Bindable open/closed state.' },
		{ group: 'Collapsible', name: 'borderless', type: 'boolean', default: 'false', description: 'Removes the border.' },
		{ group: 'Collapsible', name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Collapsible', name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Accordion</ProseTitle>
		<ProseText>A vertically stacked set of interactive headings that each reveal a section of content. <DocInlineCode>Collapsible</DocInlineCode> is a standalone single-item variant that manages its own state.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Standard Accordion</ProseTitle>
				<ProseText>By default, only one item can be open at a time.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Multiple Open Items</ProseTitle>
				<ProseText>Use the <DocInlineCode>multiple</DocInlineCode> prop to allow multiple items to be open simultaneously.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>. Controls header padding and font size.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Borderless</ProseTitle>
				<ProseText>Use <DocInlineCode>borderless</DocInlineCode> to remove the outer border from items — useful when nesting inside other surfaces.</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Icons</ProseTitle>
				<ProseText>Pass an <DocInlineCode>icon</DocInlineCode> to <DocInlineCode>AccordionItem</DocInlineCode> to display it before the title.</ProseText>
				<DocShowExample component={Example5} code={example5}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Joined</ProseTitle>
				<ProseText>Use <DocInlineCode>joined</DocInlineCode> to merge items into a single bordered list divided by separators, instead of separate cards.</ProseText>
				<DocShowExample component={Example6} code={example6}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Collapsible</ProseTitle>
				<ProseText>
					<DocInlineCode>Collapsible</DocInlineCode> is a self-contained single-item accordion — no <DocInlineCode>Accordion</DocInlineCode> wrapper needed.
					Use <DocInlineCode>bind:open</DocInlineCode> for two-way control.
				</ProseText>
				<DocShowExample component={Example7} code={example7}/>
	</ProseParagraph>
</ProsePage>
