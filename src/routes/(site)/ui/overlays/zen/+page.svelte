<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
		import Example3 from './examples/Example3.svelte';
		import example3Raw from './examples/Example3.svelte?raw';
		import CloseButtonExample from './examples/CloseButtonExample.svelte';
		import closeButtonCode from './examples/CloseButtonExample.svelte?raw';

	const props: PropDef[] = [
        { name: 'children', type: 'Snippet', description: 'Required focus-mode content.' },
        { name: 'class', type: 'string', description: 'Accepted but unused in 0.0.34. Zen renders nothing while inactive; use zenClass and backdropClass to style the active overlay.' },
		{ name: 'active',          type: 'boolean', default: 'false', description: 'Bindable. Controls visibility. Set to <code>false</code> to close.' },
		{ name: 'closeOnEsc',      type: 'boolean', default: 'true',  description: 'Close when the <code>Escape</code> key is pressed.' },
		{ name: 'closeOnBackdrop', type: 'boolean', default: 'true',  description: 'Close when clicking the backdrop.' },
		{ name: 'title',           type: 'string',  default: '—',     description: 'Optional label rendered in a slim strip at the bottom of the overlay.' },
		{ name: 'backdropClass',   type: 'string',  default: '—',     description: 'Extra Tailwind classes on the backdrop overlay element.' },
		{ name: 'zenClass',        type: 'string',  default: '—',     description: 'Extra Tailwind classes on the inner content/layout wrapper.' },
		{ name: 'closeButton',     type: 'Snippet<[{ close: () => void }]>', default: '—', description: 'Custom close button snippet. Receives a <code>close</code> callback. If omitted, a default × button is shown.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Zen</ProseTitle>
		<ProseText>
			Fullscreen overlay for distraction-free focus mode. Activated exclusively via <DocInlineCode>bind:active</DocInlineCode> — no built-in trigger.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Focus Mode Editor</ProseTitle>
				<ProseText>
					Open <DocInlineCode>Zen</DocInlineCode> with an external trigger. Both <DocInlineCode>Textarea</DocInlineCode> instances share the same <DocInlineCode>bind:value</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Toolbar Editor</ProseTitle>
				<ProseText>
					<DocInlineCode>Zen</DocInlineCode> works seamlessly with <DocInlineCode>Textarea</DocInlineCode>'s adornment snippet and <DocInlineCode>bind:this</DocInlineCode> API.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Form in focus mode</ProseTitle>
		<ProseText>Keep form values in the parent so closing and reopening the overlay preserves the draft.</ProseText>
		<DocShowExample component={Example3} code={example3Raw} />
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Custom close button and dismissal policy</ProseTitle>
		<ProseText>The closeButton snippet receives a close callback. Disabling Escape and backdrop dismissal does not disable this explicit close control. Zen is independent of the modal/drawer manager stack and does not provide a focus trap.</ProseText>
		<DocShowExample component={CloseButtonExample} code={closeButtonCode} />
	</ProseParagraph>
</ProsePage>
