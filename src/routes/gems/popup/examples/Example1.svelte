<script lang="ts">
	import { Button, getPopupManager, getToastManager, Card } from "$lib";

	const popupManager = getPopupManager();
	const toastManager = getToastManager();
	type PopupDataType = { message: string };

	function showPopup(event: MouseEvent) {
		popupManager.open.snippet(
			popupWithData,
			{message: "Some data from the caller"},
			{pos: event}
		);
	}

	async function showAnchoredPopup(event: MouseEvent) {
		let result = await popupManager.open.snippet(
			anchoredSnippet,
			{},
			{anchor: event}
		);
		toastManager.show(`Popup result: ${result}`);
	}
</script>

{#snippet popupWithData(data: PopupDataType)}
	<Card class="p-4 w-64">
		<h3 class="text-lg font-bold mb-2">Hello from Popup!</h3>
		<p>Data: {data.message}</p>
	</Card>
{/snippet}


{#snippet anchoredSnippet()}
	<Card class="p-4">
		I resolves with "OK" when the button is clicked.
		<Button label="OK" onclick={() => popupManager.resolve("OK")}/>
	</Card>
{/snippet}

<div class="flex flex-row gap-2">
	<Button label="Show Popup at Cursor" onclick={showPopup}/>
	<Button label="Show Anchored Popup" onclick={showAnchoredPopup}/>
</div>
