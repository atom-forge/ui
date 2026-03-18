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

	const props: PropDef[] = [
		{ group: 'PopupManager', name: 'open.snippet(snippet, params, args, ref?)', type: 'Promise<any>', description: 'Opens a popup rendering a Svelte snippet. Returns a promise that resolves when the popup closes.' },
		{ group: 'PopupManager', name: 'open.component(component, params, args, ref?)', type: 'Promise<any>', description: 'Opens a popup rendering a Svelte component. Returns a promise that resolves when the popup closes.' },
		{ group: 'PopupManager', name: 'close()', type: 'void', description: 'Closes the popup, resolving the promise with <code>undefined</code>.' },
		{ group: 'PopupManager', name: 'resolve(value?)', type: 'void', description: 'Closes the popup and resolves the promise with <code>value</code>.' },
		{ group: 'PopupManager', name: 'closeRoot()', type: 'void', description: 'In nested popups, traverses up to the root manager and closes the entire stack.' },
		{ group: 'PopupManager', name: 'resolveRoot(value?)', type: 'void', description: 'In nested popups, traverses up to the root manager and resolves it with <code>value</code>.' },

		{ group: 'Positioning args', name: 'pos', type: 'MouseClientEvent', description: 'Positions the popup at the mouse cursor (<code>{ clientX, clientY }</code>). Mutually exclusive with <code>anchor</code>.' },
		{ group: 'Positioning args', name: 'anchor', type: 'Element | MouseEvent', description: 'Positions the popup relative to a DOM element. Passing a <code>MouseEvent</code> uses its <code>currentTarget</code>. Mutually exclusive with <code>pos</code>.' },
		{ group: 'Positioning args', name: 'align', type: "'auto' | 'left' | 'right' | 'both' | 'side'", default: "'auto'", description: 'Horizontal alignment relative to the anchor. <code>both</code> matches the anchor width. <code>side</code> opens to the right or left (for submenus). <code>auto</code> picks a side based on the screen quadrant.' },
		{ group: 'Positioning args', name: 'offset', type: 'number', default: '4', description: 'Pixel gap between the popup and its anchor or cursor position.' },
		{ group: 'Positioning args', name: 'ref', type: 'any', description: 'Deduplication key — if a popup with the same ref is already open, the call is a no-op. Prevents flickering on rapid <code>mouseenter</code> events.' },
	];
</script>

<DocTitle>Popup</DocTitle>
<DocText>
	A floating overlay system for context menus, dropdowns, and any temporary anchored content.
	Supports cursor and element anchoring, multiple alignment modes, promise-based results, and nested popup hierarchies.
</DocText>
<DocText>
	The global <InlineCode>PopupManager</InlineCode> is created automatically by <InlineCode>AtomForge</InlineCode>.
	Access it anywhere with <InlineCode>getPopupManager()</InlineCode>.
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Cursor &amp; Anchored Positioning</DocSubtitle>
		<DocText>
			Use <InlineCode>pos</InlineCode> to open at the cursor position, or <InlineCode>anchor</InlineCode> to open relative to an element.
			Pass a <InlineCode>MouseEvent</InlineCode> directly as <InlineCode>anchor</InlineCode> — the manager resolves <InlineCode>currentTarget</InlineCode> automatically.
			<InlineCode>await</InlineCode> the return value to get the resolved result.
		</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Nested Popups</DocSubtitle>
		<DocText>
			Wrap popup content in a <InlineCode>PopupContainer</InlineCode> to create an isolated child manager for that level.
			Use <InlineCode>resolveRoot()</InlineCode> to resolve the top-level promise from anywhere in the hierarchy.
			Right-click the area below.
		</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Alignment Modes</DocSubtitle>
		<DocText>
			The <InlineCode>align</InlineCode> option controls how the popup lines up with its anchor.
			<InlineCode>both</InlineCode> expands the popup to match the anchor's width — useful for full-width dropdowns.
		</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>
</div>
