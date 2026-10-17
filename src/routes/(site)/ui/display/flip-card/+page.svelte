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

	const props: PropDef[] = [
		{ name: 'flipped', type: 'boolean', default: 'false', description: 'Bindable flipped state. Use <code>bind:flipped</code> for external control.' },
		{ name: 'trigger', type: "'hover' | 'click' | 'manual'", default: "'hover'", description: 'What interaction flips the card. <code>manual</code> disables built-in flipping entirely.' },
		{ name: 'follow', type: '{ tilt?: number; brightness?: number | { day?: number; night?: number } }', description: 'Enables a 3D mouse-tracking effect. <code>tilt</code> sets the max rotation in degrees; <code>brightness</code> adjusts the brightness offset (day/night variants supported).' },
		{ name: 'front', type: 'Snippet<[flip: () => void]>', description: 'Front face content. Receives a <code>flip()</code> function. Supply either front or children, not both.' },
				{ name: 'children', type: 'Snippet<[flip: () => void]>', description: 'Alternative to front for the front face.' },
				{ name: 'class', type: 'string', description: 'Root wrapper classes. Give the parent an explicit height; faces fill that space.' },
		{ name: 'back', type: 'Snippet<[flip: () => void]>', description: 'Back face content. Receives the same <code>flip()</code> function.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Flip Card</ProseTitle>
		<ProseText>
			Two-sided card with a 3D flip animation. Define the <DocInlineCode>front</DocInlineCode> and <DocInlineCode>back</DocInlineCode> snippets — each receives a <DocInlineCode>flip()</DocInlineCode> function for internal control.
			Flipping can be driven by hover, click, or externally via <DocInlineCode>bind:flipped</DocInlineCode>.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Hover Trigger</ProseTitle>
				<ProseText>Default mode — entering and leaving each toggle the flipped state. Keep the initial state false for the usual front-on-leave behavior.</ProseText>
				<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>External Control</ProseTitle>
				<ProseText>Set <DocInlineCode>trigger="manual"</DocInlineCode> and bind <DocInlineCode>flipped</DocInlineCode> to control the state from outside the card.</ProseText>
				<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Internal Control via Snippet Param</ProseTitle>
				<ProseText>Each snippet receives a <DocInlineCode>flip()</DocInlineCode> function as its first parameter — use it to trigger the flip from within the card's content.</ProseText>
				<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Follow Effect</ProseTitle>
				<ProseText>The <DocInlineCode>follow</DocInlineCode> prop adds a 3D tilt and brightness shift as the mouse moves over the card.</ProseText>
				<DocShowExample component={Example4} code={example4} />
	</ProseParagraph>
</ProsePage>
