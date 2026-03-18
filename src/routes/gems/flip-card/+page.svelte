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
	import Example4 from './examples/Example4.svelte';
	import example4 from './examples/Example4.svelte?raw';

	const props: PropDef[] = [
		{ name: 'flipped', type: 'boolean', default: 'false', description: 'Bindable flipped state. Use <code>bind:flipped</code> for external control.' },
		{ name: 'trigger', type: "'hover' | 'click' | 'manual'", default: "'hover'", description: 'What interaction flips the card. <code>manual</code> disables built-in flipping entirely.' },
		{ name: 'follow', type: '{ tilt?: number; brightness?: number | { day?: number; night?: number } }', description: 'Enables a 3D mouse-tracking effect. <code>tilt</code> sets the max rotation in degrees; <code>brightness</code> adjusts the brightness offset (day/night variants supported).' },
		{ name: 'front', type: 'Snippet<[flip: () => void]>', description: 'Front face content. Receives a <code>flip()</code> function to trigger the flip from within.' },
		{ name: 'back', type: 'Snippet<[flip: () => void]>', description: 'Back face content. Receives the same <code>flip()</code> function.' },
	];
</script>

<DocTitle>Flip Card</DocTitle>
<DocText>
	Two-sided card with a 3D flip animation. Define the <InlineCode>front</InlineCode> and <InlineCode>back</InlineCode> snippets — each receives a <InlineCode>flip()</InlineCode> function for internal control.
	Flipping can be driven by hover, click, or externally via <InlineCode>bind:flipped</InlineCode>.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="mt-8 space-y-8">
	<div>
		<DocSubtitle>Hover Trigger</DocSubtitle>
		<DocText>Default mode — the card flips when the mouse enters and resets on leave.</DocText>
		<ShowExample component={Example1} code={example1} />
	</div>
	<div>
		<DocSubtitle>External Control</DocSubtitle>
		<DocText>Set <InlineCode>trigger="manual"</InlineCode> and bind <InlineCode>flipped</InlineCode> to control the state from outside the card.</DocText>
		<ShowExample component={Example2} code={example2} />
	</div>
	<div>
		<DocSubtitle>Internal Control via Snippet Param</DocSubtitle>
		<DocText>Each snippet receives a <InlineCode>flip()</InlineCode> function as its first parameter — use it to trigger the flip from within the card's content.</DocText>
		<ShowExample component={Example3} code={example3} />
	</div>
	<div>
		<DocSubtitle>Follow Effect</DocSubtitle>
		<DocText>The <InlineCode>follow</InlineCode> prop adds a 3D tilt and brightness shift as the mouse moves over the card.</DocText>
		<ShowExample component={Example4} code={example4} />
	</div>
</div>
