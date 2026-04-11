<script lang="ts">
	import { untrack } from 'svelte';

	let {
		metadata,
		oncontent,
	}: {
		metadata: { urls: string[] };
		oncontent: (content: string) => void;
	} = $props();

	// untrack: intentionally capture initial value as local edit state.
	let urls = $state(untrack(() => [...metadata.urls]));

	function commit() {
		oncontent(`block:gallery\n${urls.filter(u => u.trim()).join('\n')}`);
	}

	function update(i: number, value: string) {
		urls[i] = value;
		commit();
	}

	function remove(i: number) {
		urls.splice(i, 1);
		commit();
	}

	function add() {
		urls.push('');
	}
</script>

<div class="space-y-2 py-1">
	<!-- URL list -->
	{#each urls as url, i}
		<div class="flex items-center gap-1">
			<input
				type="text"
				value={url}
				onchange={(e) => update(i, (e.target as HTMLInputElement).value)}
				placeholder="https://example.com/image.jpg"
				class="min-w-0 flex-1 rounded border border-frame bg-surface-primary px-2 py-1 text-xs text-canvas-contrast focus:border-accent focus:outline-none"
			/>
			<button
				onclick={() => remove(i)}
				class="shrink-0 rounded px-1.5 py-1 text-xs text-muted-contrast hover:text-error hover:bg-error/10"
				aria-label="Remove"
			>✕</button>
		</div>
	{/each}
	<button
		onclick={add}
		class="text-xs text-accent hover:underline"
	>+ Add image</button>

	<!-- Preview -->
	{#if urls.some(u => u.trim())}
		<div class="flex flex-wrap gap-2 pt-1">
			{#each urls.filter(u => u.trim()) as url}
				<img src={url} alt="" class="h-24 w-auto rounded object-cover" />
			{/each}
		</div>
	{/if}
</div>
