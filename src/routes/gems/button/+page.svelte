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
	import Example8 from "./examples/Example8.svelte";
	import example8 from "./examples/Example8.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Content', name: 'label', type: 'string', description: 'Button text. Mutually exclusive with <code>children</code>.' },
		{ group: 'Content', name: 'icon', type: 'IconDefinition', description: 'Leading icon.' },
		{ group: 'Content', name: 'endIcon', type: 'IconDefinition', description: 'Trailing icon.' },
		{ group: 'Content', name: 'children', type: 'Snippet', description: 'Custom content slot. Mutually exclusive with <code>label</code> / <code>icon</code>.' },

		{ group: 'Variants', name: 'secondary', type: 'boolean', default: 'false', description: 'Secondary variant.' },
		{ group: 'Variants', name: 'destructive', type: 'boolean', default: 'false', description: 'Destructive (red) variant.' },
		{ group: 'Variants', name: 'ghost', type: 'boolean', default: 'false', description: 'Ghost — transparent background, no border, subtle hover.' },
		{ group: 'Variants', name: 'link', type: 'boolean', default: 'false', description: 'Link — accent-colored text, no background, underline on hover. Same physical size as other buttons.' },
		{ group: 'Variants', name: 'muted', type: 'boolean', default: 'false', description: 'Muted — low-emphasis style.' },
		{ group: 'Variants', name: 'accent', type: 'boolean', default: 'false', description: 'Accent color variant.' },
		{ group: 'Variants', name: 'outline', type: 'boolean', default: 'false', description: 'Turns any solid variant into a bordered, transparent version. No effect on <code>ghost</code> or <code>link</code>.' },

		{ group: 'Size', name: 'compact', type: 'boolean', default: 'false', description: 'Compact size — h-8, text-xs.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: 'false', description: 'Small size — h-6, text-xs.' },
		{ group: 'Size', name: 'micro', type: 'boolean', default: 'false', description: 'Micro size — h-5, text-[10px]. For use in dense UI like table rows or cards. Default is normal (h-10, text-sm).' },

		{ group: 'Modifiers', name: 'pill', type: 'boolean', default: 'false', description: 'Fully rounded corners.' },
		{ group: 'Modifiers', name: 'grow', type: 'boolean', default: 'false', description: 'Stretches to full container width.' },
		{ group: 'Modifiers', name: 'borderless', type: 'boolean', default: 'false', description: 'Removes the border.' },

		{ group: 'State', name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button. Also set automatically when <code>loading</code> is truthy.' },
		{ group: 'State', name: 'loading', type: 'boolean | number', description: '<code>true</code> → spinner + disabled. Number (0–100) → progress bar + label.' },

		{ group: 'Events & Styling', name: 'onclick', type: '(e: MouseEvent) => void', description: 'Click handler.' },
		{ group: 'Events & Styling', name: 'class', type: 'string', description: 'Extra Tailwind classes, merged via twMerge.' },
	];
</script>

<DocTitle>Button</DocTitle>
<DocText>A clickable element for triggering actions. Supports 7 variants, an outline modifier, 3 sizes, loading states, and icon composition.</DocText>

<ApiBlock title="Props">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Variants</DocSubtitle>
		<DocText>
			Seven variants: <InlineCode>primary</InlineCode> (default), <InlineCode>secondary</InlineCode>,
			<InlineCode>destructive</InlineCode>, <InlineCode>muted</InlineCode>, <InlineCode>accent</InlineCode>,
			<InlineCode>ghost</InlineCode>, and <InlineCode>link</InlineCode>.
			Only one is active at a time — the first truthy prop wins.
		</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Outline modifier</DocSubtitle>
		<DocText>
			Add <InlineCode>outline</InlineCode> to any solid variant for a bordered, transparent version.
			Has no effect on <InlineCode>ghost</InlineCode> or <InlineCode>link</InlineCode>.
		</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>
			Four sizes: normal (h-10, default), <InlineCode>compact</InlineCode> (h-8), <InlineCode>small</InlineCode> (h-6), <InlineCode>micro</InlineCode> (h-5).
			Icon-only buttons automatically become square. Use <InlineCode>micro</InlineCode> for dense UI contexts like table rows, card footers, or inline actions.
		</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>

	<div>
		<DocSubtitle>Icons</DocSubtitle>
		<DocText>
			Use <InlineCode>icon</InlineCode> for a leading icon and <InlineCode>endIcon</InlineCode> for trailing.
			Providing only <InlineCode>icon</InlineCode> (no label, endIcon, or children) makes the button square automatically.
		</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>

	<div>
		<DocSubtitle>Loading</DocSubtitle>
		<DocText>
			<InlineCode>loading</InlineCode> disables the button and shows a spinner.
			Pass a number (0–100) to turn it into a progress bar — the fill adapts to the variant's color automatically.
			Click the last button to see the animation.
		</DocText>
		<ShowExample component={Example5} code={example5}/>
	</div>

	<div>
		<DocSubtitle>Disabled</DocSubtitle>
		<DocText>The <InlineCode>disabled</InlineCode> prop makes the button inert. Also set automatically when <InlineCode>loading</InlineCode> is truthy.</DocText>
		<ShowExample component={Example6} code={example6}/>
	</div>

	<div>
		<DocSubtitle>Modifiers</DocSubtitle>
		<DocText>
			<InlineCode>pill</InlineCode> rounds corners fully.
			<InlineCode>grow</InlineCode> stretches to full width.
			<InlineCode>borderless</InlineCode> removes the border.
		</DocText>
		<ShowExample component={Example7} code={example7}/>
	</div>

	<div>
		<DocSubtitle>Custom content</DocSubtitle>
		<DocText>
			Pass children for complex layouts, or override styles via the <InlineCode>class</InlineCode> prop (merged with twMerge).
		</DocText>
		<ShowExample component={Example8} code={example8}/>
	</div>
</div>
