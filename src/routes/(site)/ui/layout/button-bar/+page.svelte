<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		{ group: 'ButtonBar', name: 'children', type: 'Snippet', description: 'Items to render inside the bar.' },

		{ group: 'ButtonBar', name: 'class', type: 'string', description: 'Extra classes on the outer span; additional HTML attributes are forwarded.' },
				{ group: 'ButtonBarItem', name: 'class', type: 'string', description: 'Extra classes on the item div; additional HTML attributes are forwarded.' },
				{ group: 'ButtonBarItem', name: 'children', type: 'Snippet', description: 'Component to wrap.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Button Bar</ProseTitle>
		<ProseText>
			A visual grouping wrapper that connects its children into a unified bar. Borders and rounded corners are automatically stripped from direct children — size is controlled on the children themselves.
			Use <DocInlineCode>ButtonBarItem</DocInlineCode> to wrap components that need a normalised container (background, padding, vertical stretch).
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Buttons</ProseTitle>
				<ProseText>Pass <DocInlineCode>compact</DocInlineCode> or <DocInlineCode>small</DocInlineCode> directly to the children — ButtonBar adapts to their height.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Mixed Components</ProseTitle>
				<ProseText>Any component with a styled outer element (Input, Select, etc.) works as a direct child — ButtonBar strips their border and rounding automatically.
					To make the bar full-width and let a child grow to fill the remaining space, add <DocInlineCode>class="flex w-full"</DocInlineCode> to <DocInlineCode>ButtonBar</DocInlineCode> and <DocInlineCode>class="flex-1"</DocInlineCode> to the stretching child.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>ButtonBarItem</ProseTitle>
				<ProseText>Wrap components without a standard control surface (Switch, Slider, ColorPicker…) in <DocInlineCode>ButtonBarItem</DocInlineCode> to give them a matching background and stretch to the bar's height.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>
</ProsePage>
