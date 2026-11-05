<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import rootCode from './examples/RootSetup.svelte?raw';
	import manualCode from './examples/ManualSetup.svelte?raw';
	const props: PropDef[] = [
		{ group: 'ModalContainer / DrawerContainer', name: 'props', type: 'none', description: 'Either component renders the entire shared modal/drawer stack. Mount only one, and neither when using Root.' },
		{ group: 'PopupContainer', name: 'children', type: 'Snippet', description: 'Without children, renders the nearest manager. With children, creates a child manager context and renders its popup. This is the supported nested-popup boundary.' },
		{ group: 'ToastContainer', name: 'props', type: 'none', description: 'Renders the nearest manager’s toasts, including custom components with only the props passed to showCustom. No id or options are injected into custom content.' },
		{ group: 'Root', name: 'children', type: 'Snippet', description: 'Required application content rendered beneath the provider context.' },
		{ group: 'Root', name: 'manageBodyStyle', type: 'boolean', default: 'true', description: 'Applies canvas background/text colors to the body. Disabling this does not disable theme class or localStorage updates.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Overlay Containers &amp; Lifecycle</ProseTitle>
		<ProseText>The public <DocInlineCode>ModalContainer</DocInlineCode>, <DocInlineCode>DrawerContainer</DocInlineCode>, <DocInlineCode>PopupContainer</DocInlineCode> and <DocInlineCode>ToastContainer</DocInlineCode> render manager state. They are not triggers. Import them from <DocInlineCode>@atom-forge/ui</DocInlineCode> only when implementing manual setup or a supported nested popup.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props} /></DocApiBlock>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Recommended application layout</ProseTitle>
		<ProseText>The provider is Root. Place Root once in the application layout. It creates all four managers, a theme manager and the portal target, and mounts the renderers. Do not add extra containers under it. Context getters belong in descendant component initialization.</ProseText>
		<DocShowExample code={rootCode} />
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Manual SvelteKit setup</ProseTitle>
		<ProseText>This alternative deliberately omits Root and its theme/body styling. It registers all overlay managers and renders the shared stack exactly once. ModalContainer and DrawerContainer are equivalent wrappers around the same internal renderer: using both duplicates every modal and drawer. Supply your own theme setup and load the library stylesheet in the application.</ProseText>
		<DocShowExample code={manualCode} />
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Shared stack and navigation</ProseTitle>
		<ProseText>Modal and Drawer share opening order and a single visible backdrop. A manager’s close/resolve targets the last overlay of that kind, which need not be the topmost overall. User dismissal only closes the topmost closable overlay. Keys deduplicate within the overlay kind; duplicate opens resolve immediately with undefined.</ProseText>
		<ProseText>Root’s navigation hook clears every modal/drawer and resolves their promises with undefined, even when closable=false. It also resolves the root popup immediately. Toasts survive navigation and retain their timers. Manual setups need equivalent cleanup, as shown above.</ProseText>
		<ProseText>Popup and Toast use separate fixed tiers above the shared stack. Zen is a separate declarative overlay, not a managed stack entry. To customize the shared backdrop, override the library’s overlay-backdrop CSS class in a stylesheet loaded after the library.</ProseText>
		<ProseText>See <a href="/ui/overlays/modal">Modal</a>, <a href="/ui/overlays/drawer">Drawer</a>, <a href="/ui/overlays/popup">Popup</a> and <a href="/ui/overlays/toast">Toast</a> for opening content, results and nested popups.</ProseText>
	</ProseParagraph>
</ProsePage>
