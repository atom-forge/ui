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
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ name: 'active',          type: 'boolean', default: 'false', description: 'Bindable. Controls visibility. Set to <code>false</code> to close.' },
		{ name: 'closeOnEsc',      type: 'boolean', default: 'true',  description: 'Close when the <code>Escape</code> key is pressed.' },
		{ name: 'closeOnBackdrop', type: 'boolean', default: 'true',  description: 'Close when clicking the backdrop.' },
		{ name: 'title',           type: 'string',  default: '—',     description: 'Optional label rendered in a slim strip at the bottom of the overlay.' },
		{ name: 'backdropClass',   type: 'string',  default: '—',     description: 'Extra Tailwind classes on the backdrop overlay element.' },
		{ name: 'zenClass',        type: 'string',  default: '—',     description: 'Extra Tailwind classes on the inner content/layout wrapper.' },
		{ name: 'closeButton',     type: 'Snippet<[{ close: () => void }]>', default: '—', description: 'Custom close button snippet. Receives a <code>close</code> callback. If omitted, a default × button is shown.' },
	];
</script>

<DocTitle>Zen</DocTitle>
<DocText>
	Fullscreen overlay for distraction-free focus mode. Activated exclusively via <InlineCode>bind:active</InlineCode> — no built-in trigger.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Focus Mode Editor</DocSubtitle>
		<DocText>
			Open <InlineCode>Zen</InlineCode> with an external trigger. Both <InlineCode>Textarea</InlineCode> instances share the same <InlineCode>bind:value</InlineCode>.
		</DocText>
		<ShowExample component={Example1} code={example1Raw}/>
	</div>
	<div>
		<DocSubtitle>Toolbar Editor</DocSubtitle>
		<DocText>
			<InlineCode>Zen</InlineCode> works seamlessly with <InlineCode>Textarea</InlineCode>'s toolbar snippet and <InlineCode>bind:this</InlineCode> API.
		</DocText>
		<ShowExample component={Example2} code={example2Raw}/>
	</div>
</div>

