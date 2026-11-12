<script lang="ts">
	import {createCheckboxGroupManager} from './checkbox-group-manager.svelte';
	import type {ChildrenProp} from '@atom-forge/svelte-helpers';

	let {children}: ChildrenProp = $props();
	createCheckboxGroupManager()
</script>

{@render children()}
