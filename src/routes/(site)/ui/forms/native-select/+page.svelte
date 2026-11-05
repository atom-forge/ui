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

	const props: PropDef[] = [
		{ name: 'options', type: '{ value: any; label: string }[]', description: 'List of options to render.' },
		{ name: 'value', type: 'any', description: 'Bindable value of the selected option.' },
		{ name: 'placeholder', type: 'string', default: "'Select an option'", description: 'Shown when no option is selected. The empty-state option is hidden from the option list.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
		{ name: 'borderless', type: 'boolean', default: 'false', description: 'Removes the border and makes the background transparent.' },
		{ group: 'Size', name: 'compact', type: 'boolean', default: '—', description: 'Compact size — <code>h-8</code>. Mutually exclusive with <code>small</code>.' },
		{ group: 'Size', name: 'small', type: 'boolean', default: '—', description: 'Small size — <code>h-6</code>. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Native Select</ProseTitle>
		<ProseText>A styled wrapper around the browser's native <DocInlineCode>&lt;select&gt;</DocInlineCode> element. Uses an invisible overlay technique — the native select is fully transparent and positioned over a custom-styled display. In 0.0.34 it does not expose class or forward arbitrary native attributes; wrap it for layout styling rather than passing id, name, or required.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Bind <DocInlineCode>value</DocInlineCode> to track the selected option.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Three sizes: normal (default), <DocInlineCode>compact</DocInlineCode>, and <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Borderless</ProseTitle>
				<ProseText>Use <DocInlineCode>borderless</DocInlineCode> to remove the border and background — useful inside toolbars or tables.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Disabled</ProseTitle>
				<ProseText>The <DocInlineCode>disabled</DocInlineCode> prop makes the select inert and visually dimmed.</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>
</ProsePage>
