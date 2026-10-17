<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'RadioGroup', name: 'children / class', type: 'Snippet / string', description: 'Required radio items and optional wrapper classes. Additional HTML attributes are forwarded to the group div.' },
				{ group: 'RadioButton', name: 'class', type: 'string', description: 'Extra classes on the option wrapper.' },
				{ group: 'RadioGroup', name: 'value', type: 'any', description: 'Bindable selected value of the group.' },
		{ group: 'RadioGroup', name: 'size', type: "'normal' | 'compact' | 'small'", default: 'undefined', description: 'When supplied, overrides the size of every RadioButton child. When omitted, each child uses its own compact/small flag or normal size.' },
		{ group: 'RadioGroup', name: 'primary', type: 'boolean', default: '—', description: 'Primary color variant. Mutually exclusive with <code>accent</code>.' },
		{ group: 'RadioGroup', name: 'accent', type: 'boolean', default: '—', description: 'Accent color variant. Mutually exclusive with <code>primary</code>.' },

		{ group: 'RadioButton', name: 'value', type: 'any', description: 'The value this button represents. Selected when it matches the group value.' },
		{ group: 'RadioButton', name: 'label', type: 'string', description: 'Text label shown beside the button. When present, adds a hover highlight around the row.' },
		{ group: 'RadioButton', name: 'disabled', type: 'boolean', default: 'false', description: 'Makes the button inert and visually dimmed.' },
		{ group: 'RadioButton', name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with small; used only when the group size is omitted.' },
		{ group: 'RadioButton', name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with compact; used only when the group size is omitted.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Radio Button</ProseTitle>
		<ProseText>
			Single-selection input. Wrap <DocInlineCode>RadioButton</DocInlineCode> components in a <DocInlineCode>RadioGroup</DocInlineCode>,
			which manages shared state via context. Bind <DocInlineCode>value</DocInlineCode> on the group to track the selection.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Bind <DocInlineCode>value</DocInlineCode> on <DocInlineCode>RadioGroup</DocInlineCode> to track the selected option.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Sizes</ProseTitle>
				<ProseText>Set <DocInlineCode>size</DocInlineCode> on the group for a uniform size, or omit it to choose per-button sizes with <DocInlineCode>compact</DocInlineCode> / <DocInlineCode>small</DocInlineCode>.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Variants</ProseTitle>
				<ProseText>Set <DocInlineCode>primary</DocInlineCode> or <DocInlineCode>accent</DocInlineCode> on <DocInlineCode>RadioGroup</DocInlineCode> to change the color scheme. The default variant uses neutral tones.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>
</ProsePage>
