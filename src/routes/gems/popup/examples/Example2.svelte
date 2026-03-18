<script lang="ts">
	import { Button, Card, getPopupManager, PopupContainer, getToastManager } from '$lib';
	import {Instagram, ChevronRight, Mailbox, UserCircle, Users, UserCheck, UserX} from "lucide-svelte";

	const popupManager = getPopupManager();
	const toastManager = getToastManager();

	async function openContextMenu(event: MouseEvent) {
		event.preventDefault();
		let result = await popupManager.open.snippet(mainMenu, {}, {pos: event});
		toastManager.show(result ?? 'No action selected', {type: result ? 'success' : 'warning'});
	}
</script>

{#snippet mainMenu()}
	<PopupContainer>
		{@const popupManager = getPopupManager()}
		<Card class="p-1 flex flex-col gap-0" elevate={5}>
			<Button ghost compact icon={UserCircle} label="Get information" onclick={() => popupManager.resolveRoot('get-information')}/>
			<Button ghost compact icon={Users} label="Clone user" onclick={() => popupManager.resolveRoot('clone-user')}/>
			<Button ghost compact
			        icon={UserCheck}
			        label="Share"
			        endIcon={ChevronRight}
			        onclick={event => popupManager.open.snippet(shareMenu, {}, {anchor: event, align: 'side', offset: -8}, shareMenu)}/>
			<hr class="my-1 border-frame"/>
			<Button compact destructive icon={UserX} label="Delete" onclick={() => popupManager.resolveRoot('delete-user')}/>
		</Card>
	</PopupContainer>
{/snippet}

{#snippet shareMenu()}
	<PopupContainer>
		{@const popupManager = getPopupManager()}
		<Card class="p-1 flex flex-col gap-0" elevate={5}>
			<Button ghost compact icon={Mailbox} label="Email" onclick={() => popupManager.resolveRoot('share-via-email')}/>
			<Button ghost compact icon={Instagram} label="Instagram" onclick={() => popupManager.resolveRoot('share-via-instagram')}/>
		</Card>
	</PopupContainer>
{/snippet}

<div role="none"
     class="w-full h-48 bg-canvas rounded-lg flex items-center justify-center border border-frame"
     oncontextmenu={openContextMenu}>
	<p class="text-muted-contrast text-sm">Right-click anywhere in this area</p>
</div>
