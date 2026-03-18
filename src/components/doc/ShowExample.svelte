<script lang="ts">
	import ShowExample from '../../bricks/ShowExample.svelte';
	import type { Component } from 'svelte';
	import type { CodeFile } from '../../bricks/ShowCode.svelte';

	let {
		component: Control,
		code
	}: {
		component?: Component;
		code: string | CodeFile[];
	} = $props();

	function displayCode(raw: string) {
		return raw.replaceAll('$lib', '@atom-forge/core');
	}
</script>

<ShowExample {code} component={Control} {displayCode} />
