// src/routes/+layout.svelte

<script lang="ts">
	import { createDrawerManager, DrawerContainer } from '$lib';

	// Create the manager instance when the app starts
	createDrawerManager();
</script>

<!-- ... your layout ... -->

<!-- Add the container to the root of your app -->
<DrawerContainer />
