<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Tabs', name: 'initialTabId', type: 'string', description: 'Required ID of the tab active on first render. Read at initialization; changing this prop does not control the active tab.' },
		{ group: 'Tabs', name: 'variant', type: "'line' | 'button'", default: "'line'", description: 'Visual style. <code>line</code> shows an underline indicator; <code>button</code> renders a segmented control.' },
		{ group: 'Tabs', name: 'onTabChange', type: '(id: string) => void', description: 'Notification callback when a tab is selected, not a controlled-value API or an initial-mount notification.' },

		{ group: 'Tabs', name: 'children', type: 'Snippet', description: 'Required TabList and TabPanels content. Descendant tab components need the Tabs context.' },
				{ group: 'Tab', name: 'children', type: 'Snippet', description: 'Required tab label content. Tab does not accept class or arbitrary HTML attributes.' },
				{ group: 'TabPanel', name: 'children', type: 'Snippet', description: 'Required panel content. Additional HTML attributes, including class, are forwarded to its div.' },
				{ group: 'Tab', name: 'id', type: 'string', description: 'Unique identifier. Must match the <code>id</code> of the corresponding <code>TabPanel</code>.' },
		{ group: 'Tab', name: 'icon', type: 'IconDefinition', description: 'Optional icon shown before the tab label.' },

		{ group: 'TabList', name: 'children / class', type: 'Snippet / string', description: 'Required tab content and optional list wrapper classes.' },
				{ group: 'TabPanels', name: 'children / class', type: 'Snippet / string', description: 'Required panel content and optional content wrapper classes.' },
				{ group: 'TabPanels', name: 'smooth', type: 'boolean', default: 'false', description: 'Animate panel height with a spring and enable a scroll container capped at 70vh.' },
				{ group: 'TabPanels', name: 'scrollClass', type: 'string', description: 'Extra classes on the scroll container; only used with smooth enabled.' },
				{ group: 'TabPanel', name: 'id', type: 'string', description: 'Matches the <code>Tab</code> with the same <code>id</code>. Panel is rendered only when its tab is active.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Tabs</ProseTitle>
		<ProseText>
			A set of context-connected components — <DocInlineCode>Tabs</DocInlineCode>, <DocInlineCode>TabList</DocInlineCode>, <DocInlineCode>Tab</DocInlineCode>, <DocInlineCode>TabPanels</DocInlineCode>, <DocInlineCode>TabPanel</DocInlineCode> — for organizing content into switchable views.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Line Variant</ProseTitle>
				<ProseText>The default <DocInlineCode>line</DocInlineCode> variant shows an underline indicator on the active tab.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Button Variant</ProseTitle>
				<ProseText>Use <DocInlineCode>variant="button"</DocInlineCode> for a segmented control style.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Icons</ProseTitle>
				<ProseText>Pass an <DocInlineCode>icon</DocInlineCode> to each <DocInlineCode>Tab</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>
</ProsePage>
