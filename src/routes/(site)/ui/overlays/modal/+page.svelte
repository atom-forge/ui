<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import simpleExampleModalCode from "./examples/SimpleExampleModal.svelte?raw";
	import nestedExampleModalCode from "./examples/NestedExampleModal.svelte?raw";

	import setupCode from "./examples/setup.example.svelte?raw";

    const props: PropDef[] = [
        { group: 'ModalOptions', name: 'closable', type: 'boolean', default: 'true', description: 'Allows backdrop/Escape dismissal. Pass an options object as the third argument; a string key is also accepted for compatibility. No close callback is injected into content props.' },
        { group: 'ModalOptions', name: 'key', type: 'string', description: 'Deduplication key scoped to the overlay kind. A duplicate open resolves immediately with undefined.' },
        { group: 'ModalManager', name: 'closeTopmostIfClosable(value?)', type: 'boolean', description: 'Dismisses only the topmost closable overlay in the shared modal/drawer stack; it may be the other kind. Returns whether it closed one.' },
        { group: 'ModalManager', name: 'isTopmost(state)', type: 'boolean', description: 'Tests whether a state is topmost in the shared modal/drawer stack.' },
        { group: 'ModalManager', name: 'modals', type: 'ModalState[]', description: 'Current states of this kind in the shared overlay stack.' },
		{ group: 'Setup', name: 'createModalManager()', type: 'OverlayStackManager', description: 'Creates and registers a <code>ModalManager</code> via Svelte context. Call once in your root layout.' },
		{ group: 'Setup', name: 'getModalManager()', type: 'ModalManager', description: 'Retrieves the nearest <code>ModalManager</code> from context.' },

		{ group: 'ModalManager', name: 'open(component, props?, options?)', type: 'Promise<any>', description: 'Opens a modal with the given Svelte component. Returns a promise that resolves when the modal closes.' },
		{ group: 'ModalManager', name: 'openSnippet(snippet, args?, options?)', type: 'Promise<any>', description: 'Convenience wrapper — renders a Svelte snippet inside a modal.' },
		{ group: 'ModalManager', name: 'resolve(value?)', type: 'void', description: 'Closes the topmost modal and resolves its promise with <code>value</code>.' },
		{ group: 'ModalManager', name: 'close(value?)', type: 'void', description: 'Alias for <code>resolve()</code>. Typically used for dismissive actions (Cancel, backdrop click, Escape).' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Modal</ProseTitle>
		<ProseText>
			Promise-based modal system. <DocInlineCode>open()</DocInlineCode> and <DocInlineCode>openSnippet()</DocInlineCode> return a <code>Promise</code> that resolves
			when the modal calls <DocInlineCode>resolve(value)</DocInlineCode> — enabling clean async confirmation flows.
			Modals stack; closing one reveals the one below it.
		</ProseText>

		<ProseText>Use <DocInlineCode>Root</DocInlineCode> once in the application layout: it sets up all managers, the portal target and the shared modal/drawer renderer. Do not add ModalContainer or DrawerContainer under Root, or render both containers together: each renders the same shared stack. Programmatic close/resolve closes the last overlay of that kind even when closable is false; backdrop/Escape only dismiss the overall topmost closable overlay, and an Escape already handled inside it (<DocInlineCode>preventDefault()</DocInlineCode>) is ignored.</ProseText>
        <DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Use <DocInlineCode>openSnippet()</DocInlineCode> to define the modal inline. <DocInlineCode>await</DocInlineCode> the result to react to the user's choice.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Nested Modals</ProseTitle>
				<ProseText>Modals can open further modals. Each has its own promise; the stack is managed automatically.</ProseText>
				<DocShowExample component={Example2} code={[
					{ name: 'Example2.svelte', code: example2 },
					{ name: 'SimpleExampleModal.svelte', code: simpleExampleModalCode },
					{ name: 'NestedExampleModal.svelte', code: nestedExampleModalCode },
				]}/>
	</ProseParagraph>
    <ProseDivider />
    <ProseParagraph>
        <ProseTitle level={3}>Application setup</ProseTitle>
        <ProseText>Place Root in the application layout, not inside each example. Context getters must run during component initialization under this provider.</ProseText>
        <DocShowExample code={setupCode} />
    </ProseParagraph>
</ProsePage>
