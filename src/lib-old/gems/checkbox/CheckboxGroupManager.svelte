<script lang="ts">
	import {createCheckboxGroupManager} from '$lib/gems/checkbox/checkbox-group-manager.svelte';
	import type {ChildrenProp} from "$lib/tools/types";

	let {children}: ChildrenProp = $props();
	createCheckboxGroupManager()
</script>

{@render children()}
