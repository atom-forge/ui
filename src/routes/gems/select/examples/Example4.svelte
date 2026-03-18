<script lang="ts">
	import {Select} from '$lib';
	import {twMerge} from 'tailwind-merge';

	const options = [
		{value: 'active',  label: 'Active',  dot: 'bg-green-400',  text: 'text-green-400'},
		{value: 'idle',    label: 'Idle',    dot: 'bg-yellow-400', text: 'text-yellow-400'},
		{value: 'offline', label: 'Offline', dot: 'bg-frame',     text: 'text-muted-contrast'},
		{value: 'error',   label: 'Error',   dot: 'bg-red-400',    text: 'text-red-400'},
	];

	let value = $state<string>('active');
</script>

<div class="max-w-xs">
	<Select {options} bind:value>
		{#snippet trigger(opt)}
			{@const dot = (opt as any).dot}
			{@const text = (opt as any).text}
			<span class="flex items-center gap-2">
				<span class="w-2 h-2 rounded-full shrink-0 {dot}"></span>
				<span class={text}>{opt.label}</span>
			</span>
		{/snippet}
		{#snippet option(opt, isHighlighted)}
			{@const dot = (opt as any).dot}
			<div class={twMerge(
				'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
				isHighlighted ? 'bg-accent text-accent-contrast' : 'hover:bg-secondary',
			)}>
				<span class="w-2 h-2 rounded-full shrink-0 {dot}"></span>
				<span>{opt.label}</span>
			</div>
		{/snippet}
	</Select>
</div>
