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

	const props: PropDef[] = [
		{ name: 'value', type: 'number', default: '0', description: 'Current progress value.' },
		{ name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
		{ name: 'compact', type: 'boolean', default: '—', description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ name: 'small', type: 'boolean', default: '—', description: 'Small size. Mutually exclusive with <code>compact</code>.' },
	];
</script>

<DocTitle>Progress Bar</DocTitle>
<DocText>
	Visual indicator of task completion. The fill width is derived from <InlineCode>value</InlineCode> relative to <InlineCode>max</InlineCode>.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Bind a value and drive it with a <InlineCode>Slider</InlineCode> or any other input.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>Three sizes available: normal (default), <InlineCode>compact</InlineCode>, and <InlineCode>small</InlineCode>.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
</div>
