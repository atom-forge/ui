<script lang="ts">
	import { createModalManager, ModalContainer } from '$lib';

	// Create the manager instance when the app starts
	createModalManager();
</script>

<!-- ... your layout ... -->

<!-- Add the container to the root of your app -->
<ModalContainer />
