<script lang="ts">
	import { createToastManager, ToastContainer } from '$lib';

	// Create the manager instance when the app starts
	createToastManager();
</script>

<!-- ... your layout ... -->

<!-- Add the container to the root of your app -->
<ToastContainer />
