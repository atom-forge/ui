<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';
	import Example4 from './examples/Example4.svelte';
	import example4 from './examples/Example4.svelte?raw';
	import Example5 from './examples/Example5.svelte';
	import example5 from './examples/Example5.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props', name: 'value',        type: 'string',                                                          default: "''",     description: 'Bindable. Only the <em>editable</em> portion — prefix characters are excluded.' },
		{ group: 'Props', name: 'layout',       type: 'number | number[]',                                               default: '6',      description: 'A number creates that many total boxes, including prefix boxes. An array (e.g. <code>[4, 4]</code>) creates groups separated by <code>separator</code>.' },
		{ group: 'Props', name: 'separator',    type: 'string',                                                          default: "'-'",    description: 'Character shown between groups when <code>layout</code> is an array.' },
		{ group: 'Props', name: 'prefix',       type: 'string',                                                          default: "''",     description: 'Pre-filled read-only prefix occupying the first boxes of the layout, not additional boxes. Prefix boxes are dimmed and non-interactive. <code>value</code> only contains the editable portion. Paste automatically strips the prefix if present.' },
		{ group: 'Props', name: 'characterSet', type: "'any' | 'numeric' | 'alpha' | 'alphanumeric' | (c) => boolean",  default: "'any'",  description: 'Restricts accepted characters. Pass a function for fully custom validation.' },
		{ group: 'Props', name: 'placeholder',  type: 'string',                                                          default: "''",     description: 'Character shown inside empty editable boxes.' },
		{ group: 'Props', name: 'uppercase',    type: 'boolean',                                                         default: 'false',  description: 'Auto-converts every character to uppercase on input and paste. Also normalises the <code>prefix</code>.' },
		{ group: 'Props', name: 'disabled',     type: 'boolean',                                                         default: 'false',  description: 'Disables the input.' },
		{ group: 'Props', name: 'compact',      type: 'boolean',                                                         default: '—',      description: 'Compact size (<code>w-8 h-10</code>). Mutually exclusive with <code>small</code>.' },
		{ group: 'Props', name: 'small',        type: 'boolean',                                                         default: '—',      description: 'Small size (<code>w-6 h-8</code>). Mutually exclusive with <code>compact</code>.' },
		{ group: 'Props', name: 'onComplete',   type: '(value: string) => void',                                         default: '—',      description: 'Called when every editable box is filled. Receives only the editable portion.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Code Input</ProseTitle>
		<ProseText>
			A segmented input for fixed-length codes — OTPs, licence keys, activation codes.
			Visually renders individual character boxes while using a single hidden
			<DocInlineCode>&lt;input&gt;</DocInlineCode> underneath for accessibility and native paste support.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>OTP — numeric</ProseTitle>
				<ProseText>
					A 6-digit one-time password field. <DocInlineCode>onComplete</DocInlineCode> fires as soon
					as the last box is filled. Paste a 6-digit string to fill all boxes at once.
				</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Licence key — grouped layout</ProseTitle>
				<ProseText>
					Pass <DocInlineCode>layout</DocInlineCode> as an array to create groups.
					<DocInlineCode>separator</DocInlineCode> renders between each group.
				</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom character set</ProseTitle>
				<ProseText>
					Pass a function to <DocInlineCode>characterSet</DocInlineCode> for full control.
					This example accepts only hex characters and renders a live colour preview.
				</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Prefix example</ProseTitle>
				<ProseText>
					The <DocInlineCode>[3, 3, 3]</DocInlineCode> layout contains nine boxes: three read-only
					<DocInlineCode>ABC</DocInlineCode> prefix boxes and six editable digits. Separators are visual only;
					<DocInlineCode>value</DocInlineCode> contains only the six editable digits.
				</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Compact and small sizes</ProseTitle>
				<ProseText>
					<DocInlineCode>compact</DocInlineCode> and <DocInlineCode>small</DocInlineCode> props
					reduce the size of the input. Mutually exclusive.
				</ProseText>
				<DocShowExample component={Example5} code={example5}/>
	</ProseParagraph>
</ProsePage>
