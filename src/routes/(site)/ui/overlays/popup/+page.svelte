<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	import setupCode from "./examples/setup.example.svelte?raw";

    const props: PropDef[] = [
        { group: 'Setup', name: 'createPopupManager(parent?)', type: 'PopupManager', description: 'Creates and registers a manager in component context. Use Root for application setup.' },
        { group: 'PopupContainer', name: 'children', type: 'Snippet', description: 'Optional content rendered inside a newly created child manager context; its child popup and backdrop are rendered too.' },
        { group: 'Popup', name: 'children', type: 'Snippet', description: 'Low-level positioned content shell. Requires an active popup in the nearest manager; use open.snippet/open.component rather than rendering Popup standalone.' },
		{ group: 'PopupManager', name: 'open.snippet(snippet, params, args, ref?)', type: 'Promise<any>', description: 'Opens a popup rendering a Svelte snippet. Returns a promise that resolves when the popup closes.' },
		{ group: 'PopupManager', name: 'open.component(component, params, args, ref?)', type: 'Promise<any>', description: 'Opens a popup rendering a Svelte component. Returns a promise that resolves when the popup closes.' },
		{ group: 'PopupManager', name: 'close()', type: 'void', description: 'Schedules dismissal after 10ms, resolving with undefined. Ignored during the first 100ms opening guard; use resolve() for immediate programmatic dismissal.' },
		{ group: 'PopupManager', name: 'resolve(value?)', type: 'void', description: 'Closes the popup and resolves the promise with <code>value</code>.' },
		{ group: 'PopupManager', name: 'closeRoot()', type: 'void', description: 'In nested popups, traverses up to the root manager and closes the entire stack.' },
		{ group: 'PopupManager', name: 'resolveRoot(value?)', type: 'void', description: 'In nested popups, traverses up to the root manager and resolves it with <code>value</code>.' },

		{ group: 'Positioning args', name: 'pos', type: 'MouseClientEvent', description: 'Positions the popup at the mouse cursor (<code>{ clientX, clientY }</code>). Mutually exclusive with <code>anchor</code>.' },
		{ group: 'Positioning args', name: 'anchor', type: 'Element | { currentTarget: EventTarget | null }', description: 'Positions the popup relative to a DOM element. Passing a <code>MouseEvent</code> uses its <code>currentTarget</code>. Mutually exclusive with <code>pos</code>.' },
		{ group: 'Positioning args', name: 'align', type: "'auto' | 'left' | 'right' | 'both' | 'side'", default: "'auto'", description: 'Horizontal alignment relative to the anchor. <code>both</code> sets a minimum width equal to the anchor. <code>side</code> opens to the right or left (for submenus). <code>auto</code> picks a side based on the screen quadrant.' },
		{ group: 'Positioning args', name: 'offset', type: 'number', default: '4', description: 'Anchor gap in pixels. Zero falls back to 4; cursor positioning always uses 4.' },
		{ group: 'Fourth argument', name: 'ref', type: 'any', description: 'Fourth-argument deduplication key. If the same ref is already active, returns its existing promise without reopening it. This differs from modal/drawer duplicate keys, which resolve immediately with undefined.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Popup</ProseTitle>
		<ProseText>
			A floating overlay system for context menus, dropdowns, and any temporary anchored content.
			Supports cursor and element anchoring, multiple alignment modes, promise-based results, and nested popup hierarchies.
		</ProseText>
		<ProseText>
			The global <DocInlineCode>PopupManager</DocInlineCode> is created automatically by <DocInlineCode>Root</DocInlineCode>.
			Retrieve it during descendant component initialization with <DocInlineCode>getPopupManager()</DocInlineCode>. When opening from an event, pass the event synchronously or capture currentTarget before awaiting; a null or non-element anchor throws.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Cursor &amp; Anchored Positioning</ProseTitle>
				<ProseText>
					Use <DocInlineCode>pos</DocInlineCode> to open at the cursor position, or <DocInlineCode>anchor</DocInlineCode> to open relative to an element.
					Pass a <DocInlineCode>MouseEvent</DocInlineCode> directly as <DocInlineCode>anchor</DocInlineCode> — the manager resolves <DocInlineCode>currentTarget</DocInlineCode> automatically.
					<DocInlineCode>await</DocInlineCode> the return value to get the resolved result.
				</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Nested Popups</ProseTitle>
				<ProseText>
					Wrap popup content in a <DocInlineCode>PopupContainer</DocInlineCode> to create an isolated child manager for that level.
					Use <DocInlineCode>resolveRoot()</DocInlineCode> to resolve the top-level promise from anywhere in the hierarchy.
					Right-click the area below.
				</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Alignment Modes</ProseTitle>
				<ProseText>
					The <DocInlineCode>align</DocInlineCode> option controls how the popup lines up with its anchor.
					<DocInlineCode>both</DocInlineCode> expands the popup to match the anchor's width — useful for full-width dropdowns.
				</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>
    <ProseDivider />
    <ProseParagraph>
        <ProseTitle level={3}>Application setup</ProseTitle>
        <ProseText>Place Root in the application layout, not inside each example. Context getters must run during component initialization under this provider.</ProseText>
        <DocShowExample code={setupCode} />
    </ProseParagraph>
</ProsePage>
