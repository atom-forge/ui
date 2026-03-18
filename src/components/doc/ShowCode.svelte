<script module lang="ts">
	export type { CodeFile } from '../../bricks/ShowCode.svelte';
</script>

<script lang="ts">
	import ShowCode from '../../bricks/ShowCode.svelte';
	import type { CodeFile } from '../../bricks/ShowCode.svelte';

	let {
		code,
		file,
		class: classes
	}: {
		code: string | CodeFile[];
		file?: string;
		class?: string;
	} = $props();

	function displayCode(raw: string) {
		return raw.replaceAll('$lib', '@atom-forge/core');
	}
</script>

<ShowCode {code} {file} {displayCode} class={classes} />
