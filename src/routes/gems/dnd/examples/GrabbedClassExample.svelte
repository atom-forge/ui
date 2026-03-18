<script lang="ts">
	import SortableList from "$lib/gems/dnd/SortableList.svelte";

	let items = $state([
		{id: "1", title: "Design tokens", color: "bg-accent/10 border-accent/30"},
		{id: "2", title: "SortableList", color: "bg-green-500/10 border-green-500/30"},
		{id: "3", title: "Documentation", color: "bg-blue-500/10 border-blue-500/30"},
		{id: "4", title: "Unit tests", color: "bg-purple-500/10 border-purple-500/30"},
		{id: "5", title: "Publish", color: "bg-orange-500/10 border-orange-500/30"},
	]);
</script>

<SortableList
	bind:items
	id="grabbed-class-example"
	class="gap-2"
	grabbedClass="rotate-3 scale-105 shadow-lg"
	grabbedPadding={0}
>
	{#snippet item(task)}
		{@const color = task?.color ?? 'bg-accent/10'}
		{@const title = task?.title ?? 'Unknown'}
		<div class="px-3 py-2 rounded-lg text-canvas-contrast text-sm cursor-grab active:cursor-grabbing select-none border {color}">
			{title}
		</div>
	{/snippet}
</SortableList>
