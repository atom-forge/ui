<script lang="ts">
	import { untrack } from 'svelte';

	let {
		metadata,
		oncontent,
	}: {
		metadata: { url: string };
		oncontent: (content: string) => void;
	} = $props();

	// untrack: intentionally capture initial value as local edit state.
	// External metadata changes do not reset the user's in-progress input.
	let url = $state(untrack(() => metadata.url));

	function getVideoId(u: string): string | null {
		const match = u.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
		return match ? match[1] : null;
	}

	const videoId = $derived(getVideoId(url));

	function commit() {
		oncontent(`block:youtube\n${url}`);
	}
</script>

<div class="space-y-2 py-1">
	<input
		type="text"
		bind:value={url}
		onchange={commit}
		placeholder="https://www.youtube.com/watch?v=…"
		class="w-full rounded border border-frame bg-surface-primary px-2 py-1 text-xs text-canvas-contrast focus:border-accent focus:outline-none"
	/>
	{#if videoId}
		<div class="aspect-video w-full max-w-lg overflow-hidden rounded">
			<iframe
				src="https://www.youtube.com/embed/{videoId}"
				title="YouTube video"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				class="h-full w-full"
			></iframe>
		</div>
	{:else if url}
		<span class="text-muted-contrast text-xs">[youtube: invalid url]</span>
	{/if}
</div>
