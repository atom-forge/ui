<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import ShowCode from "../../../components/doc/ShowCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable, {type PropDef} from "../../../components/doc/ApiTable.svelte";

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";

	const props: PropDef[] = [
		{ name: 'label', type: 'string', description: 'Text displayed for the item. Not used for separators.' },
		{ name: 'icon', type: 'IconDefinition', description: 'Optional icon shown to the left of the label.' },
		{ name: 'warning', type: 'boolean', description: 'Applies destructive (red) text styling to the item.' },
		{ name: 'disabled', type: 'boolean', description: 'Disables the item.' },
		{ name: 'chevron', type: 'boolean', description: 'Override chevron visibility. By default a chevron is shown only when <code>submenu</code> is set.' },
		{ name: 'separator', type: 'true', description: 'Renders a horizontal divider. All other properties are ignored when this is set.' },
		{ name: 'resolveWith', type: 'any', description: 'Resolves the root popup promise with this value and closes the entire menu stack.' },
		{ name: 'onclick', type: '(event: MouseEvent, manager: PopupManager) => void', description: 'Callback executed on click. Receives the mouse event and the <code>PopupManager</code>.' },
		{ name: 'submenu', type: 'ContextMenuItemConfig[]', description: 'Nested menu items. Opens as a side popup on hover/click.' },
	];
</script>

<DocTitle>Context Menu</DocTitle>
<DocText>Data-driven, multi-level context menu built on the Popup system. Pass a configuration array to <InlineCode>popupManager.open.component()</InlineCode> — submenus are handled automatically.</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<ApiBlock title="Usage">
	<ShowCode code={`import { ContextMenu, getPopupManager } from '$lib';

const popupManager = getPopupManager();

const menuConfig = [
    { label: 'Action',   resolveWith: 'action' },
    { label: 'Submenu',  submenu: [
        { label: 'Sub Action', resolveWith: 'sub' }
    ]},
    { separator: true },
    { label: 'Delete',   warning: true, resolveWith: 'delete' }
];

async function onContextMenu(event: MouseEvent) {
    event.preventDefault();
    const result = await popupManager.open.component(
        ContextMenu, { config: menuConfig }, { pos: event }
    );
}`} class="mt-2"/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Example</DocSubtitle>
		<DocText>Multi-level menu with icons, a submenu, an external link item with a forced chevron, and a destructive delete action.</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>
</div>
