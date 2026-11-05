<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";
	import Example4 from "./examples/Example4.svelte";
	import example4 from "./examples/Example4.svelte?raw";
	import Example6 from "./examples/Example6.svelte";
	import example6 from "./examples/Example6.svelte?raw";
	import Example7 from "./examples/Example7.svelte";
	import example7 from "./examples/Example7.svelte?raw";
	import customToastCode from "./examples/CustomToast.svelte?raw";

	import setupCode from "./examples/setup.example.svelte?raw";

    const props: PropDef[] = [
        { group: 'Toast', name: 'id / message / options', type: 'string / string / ToastOptions', description: 'Low-level toast view. Requires id and message; options control appearance, action, dismissal and duration. Dismissal uses the nearest toast manager.' },
        { group: 'ToastContainer', name: 'props', type: 'none', description: 'Renders the nearest manager’s toast collection. Already mounted by Root.' },
		{ group: 'Setup', name: 'createToastManager()', type: 'ToastManager', description: 'Creates and registers a <code>ToastManager</code> instance via Svelte context. Call once in your root layout.' },
		{ group: 'Setup', name: 'getToastManager()', type: 'ToastManager', description: 'Retrieves the nearest <code>ToastManager</code> from context. Use in any child component.' },

		{ group: 'ToastManager', name: 'show(message, options?)', type: 'string', description: 'Displays a toast and returns its <code>id</code>. Auto-dismisses after <code>duration</code> ms (default 3000). Set <code>duration: 0</code> for persistent.' },
		{ group: 'ToastManager', name: 'dismiss(id)', type: 'void', description: 'Immediately dismisses the toast with the given <code>id</code>.' },
		{ group: 'ToastManager', name: 'showCustom(component, props, options?)', type: 'string', description: 'Renders a custom component with exactly the supplied props. Returns its id, but does not inject id or options into the component. Pass a dismissal callback that captures the returned id.' },

		{ group: 'ToastOptions', name: 'type', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Controls the accent stripe color and default icon.' },
		{ group: 'ToastOptions', name: 'duration', type: 'number', default: '3000', description: 'Auto-dismiss delay in milliseconds. <code>0</code> = never auto-dismiss.' },
		{ group: 'ToastOptions', name: 'closable', type: 'boolean', default: 'true', description: 'Shows a close button in the top-right corner.' },
		{ group: 'ToastOptions', name: 'icon', type: 'IconDefinition', default: 'type icon', description: 'Overrides the default icon for the given type.' },
		{ group: 'ToastOptions', name: 'action', type: '{ label: string; callback: () => void }', description: 'Renders an action button inside the toast. Clicking it calls the callback and dismisses the toast.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Toast</ProseTitle>
		<ProseText>
			Non-blocking, temporary notifications managed by a global <DocInlineCode>ToastManager</DocInlineCode>.
			Use <DocInlineCode>Root</DocInlineCode> once in your application layout (it creates the manager and mounts ToastContainer); call <DocInlineCode>getToastManager()</DocInlineCode> anywhere in the tree to trigger toasts.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Call <DocInlineCode>toastManager.show()</DocInlineCode> with a message. Dismisses automatically after 3 seconds.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Toast Types</ProseTitle>
				<ProseText>Use the <DocInlineCode>type</DocInlineCode> option to change the accent color and default icon.</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom Icon</ProseTitle>
				<ProseText>Pass an <DocInlineCode>icon</DocInlineCode> to override the default type icon.</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Duration</ProseTitle>
				<ProseText>Control visibility duration. Set <DocInlineCode>duration: 0</DocInlineCode> for a persistent toast that can close via its button, action or manager.dismiss(id).</ProseText>
				<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Action</ProseTitle>
				<ProseText>Include an action button with a callback using the <DocInlineCode>action</DocInlineCode> option.</ProseText>
				<DocShowExample component={Example6} code={example6}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Custom Component</ProseTitle>
				<ProseText>Use <DocInlineCode>showCustom()</DocInlineCode> to render any Svelte component as a toast. Only your supplied props reach the component. Capture the returned id and pass an explicit onclose callback to dismiss it. Custom content must render its own close/action controls; options still control the manager’s auto-dismiss timer.</ProseText>
				<DocShowExample component={Example7} code={[
					{ name: 'Example7.svelte', code: example7 },
					{ name: 'CustomToast.svelte', code: customToastCode },
				]}/>
	</ProseParagraph>
    <ProseDivider />
    <ProseParagraph>
        <ProseTitle level={3}>Application setup</ProseTitle>
        <ProseText>Place Root in the application layout, not inside each example. Context getters must run during component initialization under this provider.</ProseText>
        <DocShowExample code={setupCode} />
    </ProseParagraph>
</ProsePage>
