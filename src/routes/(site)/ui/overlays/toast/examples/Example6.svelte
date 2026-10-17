<script lang="ts">
	import { Button, getToastManager } from "@atom-forge/ui";

	const toastManager = getToastManager();

	function showActionToast() {
		toastManager.show("File deleted successfully.", {
			type: "success",
			action: {
				label: "Undo",
				callback: () => alert("Undo action triggered!")
			}
		});
	}
</script>

<Button label="Show Action Toast" onclick={showActionToast}/>
