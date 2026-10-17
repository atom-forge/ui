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
	import Example8 from "./examples/Example8.svelte";
	import example8 from "./examples/Example8.svelte?raw";

	const props: PropDef[] = [
		{group: 'Content', name: 'label', type: 'string', description: 'Button text. Custom <code>children</code> take precedence when supplied.'},
		{group: 'Content', name: 'icon', type: 'IconDefinition', description: 'Leading icon.'},
		{group: 'Content', name: 'endIcon', type: 'IconDefinition', description: 'Trailing icon.'},
		{group: 'Content', name: 'children', type: 'Snippet', description: 'Custom content snippet, rendered instead of the label and icons when not loading.'},

		{group: 'Variants', name: 'secondary', type: 'boolean', default: 'false', description: 'Secondary variant.'},
		{group: 'Variants', name: 'destructive', type: 'boolean', default: 'false', description: 'Destructive (red) variant.'},
		{group: 'Variants', name: 'ghost', type: 'boolean', default: 'false', description: 'Ghost — transparent background, no border, subtle hover.'},
		{group: 'Variants', name: 'link', type: 'boolean', default: 'false', description: 'Link — accent-colored text, no background, underline on hover. Same physical size as other buttons.'},
		{group: 'Variants', name: 'muted', type: 'boolean', default: 'false', description: 'Muted — low-emphasis style.'},
		{group: 'Variants', name: 'accent', type: 'boolean', default: 'false', description: 'Accent color variant.'},
		{group: 'Variants', name: 'outline', type: 'boolean', default: 'false', description: 'Turns any solid variant into a bordered, transparent version. No effect on <code>ghost</code> or <code>link</code>.'},

		{group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — h-8, text-xs.'},
		{group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small size — h-6, text-xs.'},
		{group: 'Size', name: 'micro', type: 'boolean', default: 'false', description: 'Micro size — h-5, text-[10px]. For use in dense UI like table rows or cards. Default is normal (h-10, text-sm).'},

		{group: 'Modifiers', name: 'pill', type: 'boolean', default: 'false', description: 'Fully rounded corners.'},
		{group: 'Modifiers', name: 'grow', type: 'boolean', default: 'false', description: 'Stretches to full container width.'},
		{group: 'Modifiers', name: 'borderless', type: 'boolean', default: 'false', description: 'Removes the border.'},

		{group: 'State', name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button. Also set automatically when <code>loading</code> is truthy.'},
		{group: 'State', name: 'loading', type: 'boolean | number', description: '<code>true</code> → spinner + disabled. Number (0–100) → progress fill; a nonzero number also shows a spinner and label and disables the button. At 0 the button remains interactive.'},

		{group: 'Events & Styling', name: 'element', type: 'HTMLButtonElement', description: 'Bindable native button reference via <code>bind:element</code>.'},
				{group: 'Events & Styling', name: 'onclick', type: '(e: MouseEvent) => void', description: 'Click handler.'},
		{group: 'Events & Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes, merged via twMerge.'},
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Button</ProseTitle>
		<ProseText>A clickable element for triggering actions. Supports 7 variants, an outline modifier, 4 sizes, loading states, and icon composition.</ProseText>
		<DocApiBlock title="Props">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseParagraph>
		<ProseTitle level={3}>Variants</ProseTitle>
		<ProseText>
			Seven variants:
			<DocInlineCode>primary</DocInlineCode>
			(default),
			<DocInlineCode>secondary</DocInlineCode>
			,
			<DocInlineCode>destructive</DocInlineCode>
			,
			<DocInlineCode>muted</DocInlineCode>
			,
			<DocInlineCode>accent</DocInlineCode>
			,
			<DocInlineCode>ghost</DocInlineCode>
			, and
			<DocInlineCode>link</DocInlineCode>
			.
			Choose at most one variant boolean; the public types make them mutually exclusive. Primary is the default, not a boolean prop.
		</ProseText>
		<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider/>

	<ProseParagraph>
		<ProseTitle level={3}>Outline modifier</ProseTitle>
		<ProseText>
			Add
			<DocInlineCode>outline</DocInlineCode>
			to any solid variant for a bordered, transparent version.
			Has no effect on
			<DocInlineCode>ghost</DocInlineCode>
			or
			<DocInlineCode>link</DocInlineCode>
			.
		</ProseText>
		<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider/>

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
		<ProseText>
			Four sizes: normal (h-10, default),
			<DocInlineCode>compact</DocInlineCode>
			(h-8),
			<DocInlineCode>small</DocInlineCode>
			(h-6),
			<DocInlineCode>micro</DocInlineCode>
			(h-5).
			Icon-only buttons automatically become square. Use
			<DocInlineCode>micro</DocInlineCode>
			for dense UI contexts like table rows, card footers, or inline actions.
		</ProseText>
		<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider/>

	<ProseParagraph>
		<ProseTitle level={3}>Icons</ProseTitle>
		<ProseText>
			Use
			<DocInlineCode>icon</DocInlineCode>
			for a leading icon and
			<DocInlineCode>endIcon</DocInlineCode>
			for trailing.
			Providing only
			<DocInlineCode>icon</DocInlineCode>
			(no label, endIcon, or children) makes the button square automatically.
		</ProseText>
		<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider/>

	<ProseParagraph>
		<ProseTitle level={3}>Loading</ProseTitle>
		<ProseText>
			<DocInlineCode>loading</DocInlineCode>
			disables the button and shows a spinner.
			Pass a number (0–100) to turn it into a progress bar — the fill adapts to the variant's color automatically.
			Click the last button to see the animation.
		</ProseText>
		<DocShowExample component={Example5} code={example5}/>
	</ProseParagraph>

	<ProseDivider/>

	<ProseParagraph>
		<ProseTitle level={3}>Disabled</ProseTitle>
		<ProseText>The
			<DocInlineCode>disabled</DocInlineCode>
			prop makes the button inert. Also set automatically when
			<DocInlineCode>loading</DocInlineCode>
			is truthy.
		</ProseText>
		<DocShowExample component={Example6} code={example6}/>
	</ProseParagraph>

	<ProseDivider/>

	<ProseParagraph>
		<ProseTitle level={3}>Modifiers</ProseTitle>
		<ProseText>
			<DocInlineCode>pill</DocInlineCode>
			rounds corners fully.
			<DocInlineCode>grow</DocInlineCode>
			stretches to full width.
			<DocInlineCode>borderless</DocInlineCode>
			removes the border.
		</ProseText>
		<DocShowExample component={Example7} code={example7}/>
	</ProseParagraph>

	<ProseDivider/>

	<ProseParagraph>
		<ProseTitle level={3}>Custom content</ProseTitle>
		<ProseText>
			Pass children for complex layouts, or override styles via the
			<DocInlineCode>class</DocInlineCode>
			prop (merged with twMerge).
		</ProseText>
		<DocShowExample component={Example8} code={example8}/>
	</ProseParagraph>
</ProsePage>
