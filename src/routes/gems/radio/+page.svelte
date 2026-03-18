<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable, { type PropDef } from '../../../components/doc/ApiTable.svelte';
	import InlineCode from '../../../components/doc/InlineCode.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'RadioGroup', name: 'value', type: 'any', description: 'Bindable selected value of the group.' },
		{ group: 'RadioGroup', name: 'size', type: "'normal' | 'compact' | 'small'", default: "'normal'", description: 'Default size for all <code>RadioButton</code> children. Individual buttons can override this.' },
		{ group: 'RadioGroup', name: 'primary', type: 'boolean', default: '—', description: 'Primary color variant. Mutually exclusive with <code>accent</code>.' },
		{ group: 'RadioGroup', name: 'accent', type: 'boolean', default: '—', description: 'Accent color variant. Mutually exclusive with <code>primary</code>.' },

		{ group: 'RadioButton', name: 'value', type: 'any', description: 'The value this button represents. Selected when it matches the group value.' },
		{ group: 'RadioButton', name: 'label', type: 'string', description: 'Text label shown beside the button. When present, adds a hover highlight around the row.' },
		{ group: 'RadioButton', name: 'disabled', type: 'boolean', default: 'false', description: 'Makes the button inert and visually dimmed.' },
		{ group: 'RadioButton', name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>. Overrides the group size.' },
		{ group: 'RadioButton', name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>. Overrides the group size.' },
	];
</script>

<DocTitle>Radio Button</DocTitle>
<DocText>
	Single-selection input. Wrap <InlineCode>RadioButton</InlineCode> components in a <InlineCode>RadioGroup</InlineCode>,
	which manages shared state via context. Bind <InlineCode>value</InlineCode> on the group to track the selection.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Bind <InlineCode>value</InlineCode> on <InlineCode>RadioGroup</InlineCode> to track the selected option.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Set <InlineCode>size</InlineCode> on the group for a uniform size, or override per button with <InlineCode>compact</InlineCode> / <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Variants</DocSubtitle>
		<DocText>Set <InlineCode>primary</InlineCode> or <InlineCode>accent</InlineCode> on <InlineCode>RadioGroup</InlineCode> to change the color scheme. The default variant uses neutral tones.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
</div>
