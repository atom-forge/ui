<script lang="ts">
	import { Button, getToastManager } from "@atom-forge/ui";

	const toastManager = getToastManager();

	function showInfoToast() {
		toastManager.show("This is an info toast!");
	}
</script>

<Button label="Show Info Toast" onclick={showInfoToast}/>
