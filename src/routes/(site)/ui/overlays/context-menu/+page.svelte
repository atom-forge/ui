<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";

	const props: PropDef[] = [
        { group: 'ContextMenu', name: 'config', type: 'ContextMenuItemConfig[]', description: 'Required menu configuration. The following fields describe a configuration entry, not component props.' },
		{ name: 'label', type: 'string', description: 'Text displayed for the item. Not used for separators.' },
		{ name: 'icon', type: 'IconDefinition', description: 'Optional icon shown to the left of the label.' },
		{ name: 'warning', type: 'boolean', description: 'Applies destructive (red) text styling to the item.' },
		{ name: 'centered', type: 'boolean', description: 'Omits the growing label area for centered entries, such as a disabled empty-result message.' },
				{ name: 'disabled', type: 'boolean', description: 'Disables the item.' },
		{ name: 'chevron', type: 'boolean', description: 'Override chevron visibility. By default a chevron is shown only when <code>submenu</code> is set.' },
		{ name: 'separator', type: 'true', description: 'Renders a horizontal divider. All other properties are ignored when this is set.' },
		{ name: 'resolveWith', type: 'any', description: 'Resolves the root popup promise with this value and closes the entire menu stack.' },
		{ name: 'onclick', type: '(event: MouseEvent, manager: PopupManager) => void', description: 'Callback executed on click. Receives the mouse event and child PopupManager. Call resolveRoot(value) or closeRoot() explicitly to dismiss the menu chain.' },
		{ name: 'submenu', type: 'ContextMenuItemConfig[]', description: 'Nested menu items. Opens as a side popup on click, not hover.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Context Menu</ProseTitle>
		<ProseText>Data-driven, multi-level context menu built on the Popup system. Pass a configuration array to <DocInlineCode>popupManager.open.component()</DocInlineCode> — submenus are handled automatically.</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>

	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Example</ProseTitle>
				<ProseText>Multi-level menu with icons, a submenu, an external link item with a forced chevron, and a destructive delete action.</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>
</ProsePage>
