<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import drawerContentCode from "./examples/DrawerContent.svelte?raw";

	import setupCode from "./examples/setup.example.svelte?raw";

    const props: PropDef[] = [
        { group: 'DrawerOptions', name: 'class', type: 'string', description: 'Classes forwarded to the drawer panel, including size overrides.' },
        { group: 'Drawer', name: 'position / size', type: 'DrawerPosition / DrawerSize', description: 'Required when using the low-level Drawer panel directly. The manager supplies defaults.' },
        { group: 'Drawer', name: 'children / class', type: 'Snippet / string', description: 'Panel content and classes. The panel alone does not create a backdrop, a manager or dismiss handlers.' },
        { group: 'DrawerOptions', name: 'key', type: 'string', description: 'Deduplication key scoped to the overlay kind. A duplicate open resolves immediately with undefined.' },
        { group: 'DrawerManager', name: 'closeTopmostIfClosable(value?)', type: 'boolean', description: 'Dismisses only the topmost closable overlay in the shared modal/drawer stack; it may be the other kind. Returns whether it closed one.' },
        { group: 'DrawerManager', name: 'isTopmost(state)', type: 'boolean', description: 'Tests whether a state is topmost in the shared modal/drawer stack.' },
        { group: 'DrawerManager', name: 'drawers', type: 'DrawerState[]', description: 'Current states of this kind in the shared overlay stack.' },
		{ group: 'Setup', name: 'createDrawerManager()', type: 'OverlayStackManager', description: 'Creates and registers a <code>DrawerManager</code> via Svelte context. Call once in your root layout.' },
		{ group: 'Setup', name: 'getDrawerManager()', type: 'DrawerManager', description: 'Retrieves the nearest <code>DrawerManager</code> from context.' },

		{ group: 'DrawerManager', name: 'open(component, props?, options?)', type: 'Promise<any>', description: 'Opens a drawer with the given Svelte component. Returns a promise that resolves when the drawer closes.' },
		{ group: 'DrawerManager', name: 'close(value?) / resolve(value?)', type: 'void', description: 'Closes the topmost drawer and resolves its promise with <code>value</code>.' },

		{ group: 'DrawerOptions', name: 'position', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Side from which the drawer slides in.' },
		{ group: 'DrawerOptions', name: 'size', type: "'normal' | 'compact' | 'small'", default: "'normal'", description: 'Panel width for left/right drawers, height for top/bottom drawers. Override with the class option.' },
		{ group: 'DrawerOptions', name: 'closable', type: 'boolean', default: 'true', description: 'Whether clicking the backdrop or pressing Escape closes the drawer.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Drawer</ProseTitle>
		<ProseText>
			Promise-based side panel system. Works identically to <DocInlineCode>Modal</DocInlineCode> — <DocInlineCode>open()</DocInlineCode>
			returns a <code>Promise</code> that resolves when the drawer calls <DocInlineCode>close(value)</DocInlineCode>.
			Drawers slide in from any screen edge. Left/right drawers use widths; top/bottom drawers use heights.
		</ProseText>

		<ProseText>Use <DocInlineCode>Root</DocInlineCode> once in the application layout: it sets up all managers, the portal target and the shared modal/drawer renderer. Do not add ModalContainer or DrawerContainer under Root, or render both containers together: each renders the same shared stack. Programmatic close/resolve closes the last overlay of that kind even when closable is false; backdrop/Escape only dismiss the overall topmost closable overlay, and an Escape already handled inside it (<DocInlineCode>preventDefault()</DocInlineCode>) is ignored.</ProseText>
        <DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Pass a Svelte component to <DocInlineCode>drawerManager.open()</DocInlineCode>. The component receives any <DocInlineCode>props</DocInlineCode> you provide, plus access to <DocInlineCode>getDrawerManager()</DocInlineCode> to close itself.</ProseText>
				<DocShowExample component={Example1} code={[
					{ name: 'Example1.svelte', code: example1 },
					{ name: 'DrawerContent.svelte', code: drawerContentCode },
				]}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Position & Size</ProseTitle>
				<ProseText>Use the options parameter to set an edge, named size or class override. Left/right widths are small=320px, compact=384px, normal=512px; top/bottom heights are small=192px, compact=256px, normal=384px.</ProseText>
				<DocShowExample component={Example2} code={[
					{ name: 'Example2.svelte', code: example2 },
					{ name: 'DrawerContent.svelte', code: drawerContentCode },
				]}/>
	</ProseParagraph>
    <ProseDivider />
    <ProseParagraph>
        <ProseTitle level={3}>Application setup</ProseTitle>
        <ProseText>Place Root in the application layout, not inside each example. Context getters must run during component initialization under this provider.</ProseText>
        <DocShowExample code={setupCode} />
    </ProseParagraph>
</ProsePage>
