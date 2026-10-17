<script lang="ts">
	import { Button, getToastManager } from "@atom-forge/ui";

	const toastManager = getToastManager();

	function showSuccessToast() {
		toastManager.show("Operation successful!", { type: "success" });
	}

	function showWarningToast() {
		toastManager.show("Something went wrong.", { type: "warning" });
	}

	function showErrorToast() {
		toastManager.show("Failed to save data.", { type: "error" });
	}
</script>

<div class="flex flex-wrap items-center gap-4">
	<Button label="Show Success" onclick={showSuccessToast}/>
	<Button label="Show Warning" onclick={showWarningToast}/>
	<Button label="Show Error" onclick={showErrorToast}/>
</div>
