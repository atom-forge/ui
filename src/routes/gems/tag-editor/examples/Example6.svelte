<script lang="ts">
	import {Field, TagEditor} from '$lib';
	import {twMerge} from 'tailwind-merge';

	const PRIORITY = [
		{label: 'Low',    color: 'bg-green-500',  value: 'low'},
		{label: 'Medium', color: 'bg-yellow-400', value: 'medium'},
		{label: 'High',   color: 'bg-orange-500', value: 'high'},
		{label: 'Urgent', color: 'bg-red-500',    value: 'urgent'},
	];

	const colorMap = Object.fromEntries(PRIORITY.map(p => [p.value, p.color]));
	const options = PRIORITY.map(p => p.value);

	let tags = $state<string[]>([]);
</script>

<div class="w-96">
	<Field label="Custom chip + option snippets">
		<TagEditor bind:value={tags} {options} allowNew={false} placeholder="Pick priority…">
			{#snippet chip(tag, remove)}
				{@const color = colorMap[tag] ?? 'bg-secondary'}
				<span class="inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-1.5 py-0.5 text-xs font-medium text-white {color} shrink-0">
					{tag}
					<button
						type="button"
						tabindex="-1"
						class="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
						onclick={e => { e.stopPropagation(); remove(); }}
					>✕</button>
				</span>
			{/snippet}
			{#snippet option(item, isHighlighted)}
				{@const color = colorMap[item] ?? 'bg-secondary'}
				<div class={twMerge(
					'flex items-center gap-2.5 px-3 py-2 text-sm',
					isHighlighted ? 'text-accent-contrast' : 'text-canvas-contrast',
				)}>
					<span class="w-2 h-2 rounded-full shrink-0 {color}"></span>
					<span class="capitalize">{item}</span>
				</div>
			{/snippet}
		</TagEditor>
	</Field>
	<p class="mt-2 text-xs text-muted-contrast">Value: {JSON.stringify(tags)}</p>
</div>
