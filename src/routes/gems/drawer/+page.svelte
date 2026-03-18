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
	import drawerContentCode from "./examples/DrawerContent.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Setup', name: 'createDrawerManager()', type: 'void', description: 'Creates and registers a <code>DrawerManager</code> via Svelte context. Call once in your root layout.' },
		{ group: 'Setup', name: 'getDrawerManager()', type: 'DrawerManager', description: 'Retrieves the nearest <code>DrawerManager</code> from context.' },

		{ group: 'DrawerManager', name: 'open(component, props?, options?)', type: 'Promise<any>', description: 'Opens a drawer with the given Svelte component. Returns a promise that resolves when the drawer closes.' },
		{ group: 'DrawerManager', name: 'close(value?) / resolve(value?)', type: 'void', description: 'Closes the topmost drawer and resolves its promise with <code>value</code>.' },

		{ group: 'DrawerOptions', name: 'position', type: "'left' | 'right'", default: "'right'", description: 'Side from which the drawer slides in.' },
		{ group: 'DrawerOptions', name: 'size', type: "'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Width of the drawer panel.' },
		{ group: 'DrawerOptions', name: 'closable', type: 'boolean', default: 'true', description: 'Whether clicking the backdrop or pressing Escape closes the drawer.' },
	];
</script>

<DocTitle>Drawer</DocTitle>
<DocText>
	Promise-based side panel system. Works identically to <InlineCode>Modal</InlineCode> — <InlineCode>open()</InlineCode>
	returns a <code>Promise</code> that resolves when the drawer calls <InlineCode>close(value)</InlineCode>.
	Drawers slide in from the left or right and support configurable widths.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Pass a Svelte component to <InlineCode>drawerManager.open()</InlineCode>. The component receives any <InlineCode>props</InlineCode> you provide, plus access to <InlineCode>getDrawerManager()</InlineCode> to close itself.</DocText>
		<ShowExample component={Example1} code={[
			{ name: 'Example1.svelte', code: example1 },
			{ name: 'DrawerContent.svelte', code: drawerContentCode },
		]}/>
	</div>
	<div>
		<DocSubtitle>Position & Size</DocSubtitle>
		<DocText>Use the <InlineCode>options</InlineCode> parameter to control which side the drawer appears on and how wide it is.</DocText>
		<ShowExample component={Example2} code={[
			{ name: 'Example2.svelte', code: example2 },
			{ name: 'DrawerContent.svelte', code: drawerContentCode },
		]}/>
	</div>
</div>
