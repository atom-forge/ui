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
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";
	import Example4 from "./examples/Example4.svelte";
	import example4 from "./examples/Example4.svelte?raw";
	import Example6 from "./examples/Example6.svelte";
	import example6 from "./examples/Example6.svelte?raw";
	import Example7 from "./examples/Example7.svelte";
	import example7 from "./examples/Example7.svelte?raw";
	import customToastCode from "./examples/CustomToast.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Setup', name: 'createToastManager()', type: 'ToastManager', description: 'Creates and registers a <code>ToastManager</code> instance via Svelte context. Call once in your root layout.' },
		{ group: 'Setup', name: 'getToastManager()', type: 'ToastManager', description: 'Retrieves the nearest <code>ToastManager</code> from context. Use in any child component.' },

		{ group: 'ToastManager', name: 'show(message, options?)', type: 'string', description: 'Displays a toast and returns its <code>id</code>. Auto-dismisses after <code>duration</code> ms (default 3000). Set <code>duration: 0</code> for persistent.' },
		{ group: 'ToastManager', name: 'dismiss(id)', type: 'void', description: 'Immediately dismisses the toast with the given <code>id</code>.' },
		{ group: 'ToastManager', name: 'showCustom(component, props, options?)', type: 'string', description: 'Renders an arbitrary Svelte component as a toast. The component receives <code>id</code> automatically so it can call <code>dismiss()</code>.' },

		{ group: 'ToastOptions', name: 'type', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Controls the accent stripe color and default icon.' },
		{ group: 'ToastOptions', name: 'duration', type: 'number', default: '3000', description: 'Auto-dismiss delay in milliseconds. <code>0</code> = never auto-dismiss.' },
		{ group: 'ToastOptions', name: 'closable', type: 'boolean', default: 'true', description: 'Shows a close button in the top-right corner.' },
		{ group: 'ToastOptions', name: 'icon', type: 'IconDefinition', default: 'type icon', description: 'Overrides the default icon for the given type.' },
		{ group: 'ToastOptions', name: 'action', type: '{ label: string; callback: () => void }', description: 'Renders an action button inside the toast. Clicking it calls the callback and dismisses the toast.' },
	];
</script>

<DocTitle>Toast</DocTitle>
<DocText>
	Non-blocking, temporary notifications managed by a global <InlineCode>ToastManager</InlineCode>.
	Place <InlineCode>ToastContainer</InlineCode> once in your root layout; call <InlineCode>getToastManager()</InlineCode> anywhere in the tree to trigger toasts.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Call <InlineCode>toastManager.show()</InlineCode> with a message. Dismisses automatically after 3 seconds.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
	<div>
		<DocSubtitle>Toast Types</DocSubtitle>
		<DocText>Use the <InlineCode>type</InlineCode> option to change the accent color and default icon.</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>
	<div>
		<DocSubtitle>Custom Icon</DocSubtitle>
		<DocText>Pass an <InlineCode>icon</InlineCode> to override the default type icon.</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
	<div>
		<DocSubtitle>Duration</DocSubtitle>
		<DocText>Control visibility duration. Set <InlineCode>duration: 0</InlineCode> for a persistent toast that only closes via the close button.</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>
	<div>
		<DocSubtitle>With Action</DocSubtitle>
		<DocText>Include an action button with a callback using the <InlineCode>action</InlineCode> option.</DocText>
		<ShowExample component={Example6} code={example6}/>
	</div>
	<div>
		<DocSubtitle>Custom Component</DocSubtitle>
		<DocText>Use <InlineCode>showCustom()</InlineCode> to render any Svelte component as a toast. The component receives <InlineCode>id</InlineCode> so it can dismiss itself.</DocText>
		<ShowExample component={Example7} code={[
			{ name: 'Example7.svelte', code: example7 },
			{ name: 'CustomToast.svelte', code: customToastCode },
		]}/>
	</div>
</div>
