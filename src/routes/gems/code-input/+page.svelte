<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable from '../../../components/doc/ApiTable.svelte';
	import type {PropDef} from '../../../components/doc/ApiTable.svelte';

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
		{ group: 'Props', name: 'layout',       type: 'number | number[]',                                               default: '6',      description: 'A number creates that many boxes. An array (e.g. <code>[4, 4]</code>) creates groups separated by <code>separator</code>.' },
		{ group: 'Props', name: 'separator',    type: 'string',                                                          default: "'-'",    description: 'Character shown between groups when <code>layout</code> is an array.' },
		{ group: 'Props', name: 'prefix',       type: 'string',                                                          default: "''",     description: 'Pre-filled read-only prefix. Prefix boxes are dimmed and non-interactive. <code>value</code> only contains the editable portion. Paste automatically strips the prefix if present.' },
		{ group: 'Props', name: 'characterSet', type: "'any' | 'numeric' | 'alpha' | 'alphanumeric' | (c) => boolean",  default: "'any'",  description: 'Restricts accepted characters. Pass a function for fully custom validation.' },
		{ group: 'Props', name: 'placeholder',  type: 'string',                                                          default: "''",     description: 'Character shown inside empty editable boxes.' },
		{ group: 'Props', name: 'uppercase',    type: 'boolean',                                                         default: 'false',  description: 'Auto-converts every character to uppercase on input and paste. Also normalises the <code>prefix</code>.' },
		{ group: 'Props', name: 'disabled',     type: 'boolean',                                                         default: 'false',  description: 'Disables the input.' },
		{ group: 'Props', name: 'compact',      type: 'boolean',                                                         default: '—',      description: 'Compact size (<code>w-8 h-10</code>). Mutually exclusive with <code>small</code>.' },
		{ group: 'Props', name: 'small',        type: 'boolean',                                                         default: '—',      description: 'Small size (<code>w-6 h-8</code>). Mutually exclusive with <code>compact</code>.' },
		{ group: 'Props', name: 'onComplete',   type: '(value: string) => void',                                         default: '—',      description: 'Called when every editable box is filled. Receives only the editable portion.' },
	];
</script>

<DocTitle>Code Input</DocTitle>
<DocText>
	A segmented input for fixed-length codes — OTPs, licence keys, activation codes.
	Visually renders individual character boxes while using a single hidden
	<InlineCode>&lt;input&gt;</InlineCode> underneath for accessibility and native paste support.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>OTP — numeric</DocSubtitle>
		<DocText>
			A 6-digit one-time password field. <InlineCode>onComplete</InlineCode> fires as soon
			as the last box is filled. Paste a 6-digit string to fill all boxes at once.
		</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Licence key — grouped layout</DocSubtitle>
		<DocText>
			Pass <InlineCode>layout</InlineCode> as an array to create groups.
			<InlineCode>separator</InlineCode> renders between each group.
		</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Custom character set</DocSubtitle>
		<DocText>
			Pass a function to <InlineCode>characterSet</InlineCode> for full control.
			This example accepts only hex characters and renders a live colour preview.
		</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>

	<div>
		<DocSubtitle>Prefix example</DocSubtitle>
		<DocText>
			Editable portion is still 6 boxes, but this time with a pre-filled
			<InlineCode>ABC-</InlineCode> prefix. The full value is therefore 10 characters.
		</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>

	<div>
		<DocSubtitle>Compact and small sizes</DocSubtitle>
		<DocText>
			<InlineCode>compact</InlineCode> and <InlineCode>small</InlineCode> props
			reduce the size of the input. Mutually exclusive.
		</DocText>
		<ShowExample component={Example5} code={example5}/>
	</div>
</div>

