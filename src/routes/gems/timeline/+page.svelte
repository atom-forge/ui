<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable, { type PropDef } from '../../../components/doc/ApiTable.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ name: 'items', type: 'any[]', description: 'Data array. Each element is passed as-is to the <code>children</code> and <code>dot</code> snippets.' },
		{ name: 'right', type: 'boolean', description: 'Vertical timeline — content to the right of the line. Default when no direction prop is set.' },
		{ name: 'left', type: 'boolean', description: 'Vertical timeline — content to the left of the line.' },
		{ name: 'bottom', type: 'boolean', description: 'Horizontal timeline — content below the line.' },
		{ name: 'top', type: 'boolean', description: 'Horizontal timeline — content above the line.' },
		{ name: 'alternate', type: 'boolean', default: 'false', description: 'Alternates content between both sides of the line on each successive item.' },
		{ name: 'children', type: 'Snippet<[any]>', description: 'Required. Renders each item\'s content. Receives the item from the <code>items</code> array.' },
		{ name: 'dot', type: 'Snippet<[any]>', description: 'Optional. Renders the node on the line. Defaults to a small circle. Receives the item.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes applied to the connecting line element.' },
	];
</script>

<DocTitle>Timeline</DocTitle>
<DocText>A flexible timeline that renders items along a vertical or horizontal line. Use the <InlineCode>children</InlineCode> snippet for item content and the <InlineCode>dot</InlineCode> snippet to customise the node on the line.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Vertical</DocSubtitle>
		<DocText>Use <InlineCode>right</InlineCode> (default) or <InlineCode>left</InlineCode> to place content on either side of the line.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>Alternate with Custom Dots</DocSubtitle>
		<DocText>Add <InlineCode>alternate</InlineCode> to flip content left/right on each item. Use the <InlineCode>dot</InlineCode> snippet to render icons or status indicators in place of the default circle.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Horizontal</DocSubtitle>
		<DocText>Use <InlineCode>bottom</InlineCode> or <InlineCode>top</InlineCode> for a horizontal layout. Works with <InlineCode>alternate</InlineCode> too.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
</div>
