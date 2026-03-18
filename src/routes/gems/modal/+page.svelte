<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable from "../../../components/doc/ApiTable.svelte";
	import type { PropDef } from "../../../components/doc/ApiTable.svelte";

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import simpleExampleModalCode from "./examples/SimpleExampleModal.svelte?raw";
	import nestedExampleModalCode from "./examples/NestedExampleModal.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Setup', name: 'createModalManager()', type: 'void', description: 'Creates and registers a <code>ModalManager</code> via Svelte context. Call once in your root layout.' },
		{ group: 'Setup', name: 'getModalManager()', type: 'ModalManager', description: 'Retrieves the nearest <code>ModalManager</code> from context.' },

		{ group: 'ModalManager', name: 'open(component, props?)', type: 'Promise<any>', description: 'Opens a modal with the given Svelte component. Returns a promise that resolves when the modal closes.' },
		{ group: 'ModalManager', name: 'openSnippet(snippet, args?)', type: 'Promise<any>', description: 'Convenience wrapper — renders a Svelte snippet inside a modal.' },
		{ group: 'ModalManager', name: 'resolve(value?)', type: 'void', description: 'Closes the topmost modal and resolves its promise with <code>value</code>.' },
		{ group: 'ModalManager', name: 'close(value?)', type: 'void', description: 'Alias for <code>resolve()</code>. Typically used for dismissive actions (Cancel, backdrop click, Escape).' },
	];
</script>

<DocTitle>Modal</DocTitle>
<DocText>
	Promise-based modal system. <InlineCode>open()</InlineCode> and <InlineCode>openSnippet()</InlineCode> return a <code>Promise</code> that resolves
	when the modal calls <InlineCode>resolve(value)</InlineCode> — enabling clean async confirmation flows.
	Modals stack; closing one reveals the one below it.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Use <InlineCode>openSnippet()</InlineCode> to define the modal inline. <InlineCode>await</InlineCode> the result to react to the user's choice.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Nested Modals</DocSubtitle>
		<DocText>Modals can open further modals. Each has its own promise; the stack is managed automatically.</DocText>
		<ShowExample component={Example2} code={[
			{ name: 'Example2.svelte', code: example2 },
			{ name: 'SimpleExampleModal.svelte', code: simpleExampleModalCode },
			{ name: 'NestedExampleModal.svelte', code: nestedExampleModalCode },
		]}/>
	</div>
</div>
