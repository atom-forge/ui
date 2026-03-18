// src/routes/+layout.svelte

<script lang="ts">
	import { createPopupManager, PopupContainer } from '$lib';

	// Create the manager instance when the app starts
	createPopupManager();
</script>

<!-- ... your layout ... -->

<!-- Add the container to the root of your app -->
<PopupContainer />
