<script lang="ts">
	import { ContextMenu, getPopupManager, getToastManager, type ContextMenuItemConfig } from '$lib';
	import {Instagram, ExternalLink, Mailbox, UserCircle, Users, UserCheck, UserX} from 'lucide-svelte';


	const popupManager = getPopupManager();
	const toastManager = getToastManager();


	const menuConfig: ContextMenuItemConfig[] = [
		{icon: UserCircle, label: 'Get information', resolveWith: 'get-information'},
		{icon: Users, label: 'Clone user', resolveWith: 'clone-user'},
		{
			icon: UserCheck,
			label: 'Share',
			submenu: [
				{icon: Mailbox, label: 'Email', resolveWith: 'share-via-email'},
				{icon: Instagram, label: 'Instagram', resolveWith: 'share-via-instagram'}
			]
		},
		{
			icon: ExternalLink,
			label: 'Open Link',
			chevron: true, // Force chevron even without a submenu
			onclick: () => window.open('https://svelte.dev', '_blank')
		},
		{separator: true},
		{icon: UserX, label: 'Delete', warning: true, resolveWith: 'delete-user'}
	];

	async function openContextMenu(event: MouseEvent) {
		event.preventDefault();
		const result = await popupManager.open.component(ContextMenu, {config: menuConfig}, {pos: event});
		toastManager.show(result ?? 'No action selected', {type: result ? 'success' : 'warning'});
	}
</script>

<div role="none"
     class="w-full h-64 bg-canvas rounded-lg flex items-center justify-center"
     oncontextmenu={openContextMenu}
>
	<p class="text-muted-contrast">Right-click anywhere in this box</p>
</div>
