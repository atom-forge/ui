<script lang="ts">
	import { Button, Card, getPopupManager } from "$lib";

	const popupManager = getPopupManager();
</script>

{#snippet menuContent()}
	<Card class="p-1 flex flex-col gap-0 min-w-36" elevate={4}>
		<Button ghost compact label="Option 1" onclick={() => popupManager.close()}/>
		<Button ghost compact label="Option 2" onclick={() => popupManager.close()}/>
		<Button ghost compact label="Option 3" onclick={() => popupManager.close()}/>
	</Card>
{/snippet}

<div class="flex gap-2 flex-wrap items-center">
	<Button label="Left" secondary onclick={e => popupManager.open.snippet(menuContent, {}, { anchor: e, align: 'left' })}/>
	<Button label="Right" secondary onclick={e => popupManager.open.snippet(menuContent, {}, { anchor: e, align: 'right' })}/>
	<Button label="Auto" secondary onclick={e => popupManager.open.snippet(menuContent, {}, { anchor: e, align: 'auto' })}/>
	<Button label="Both (full width)" secondary class="w-48" onclick={e => popupManager.open.snippet(menuContent, {}, { anchor: e, align: 'both' })}/>
</div>
