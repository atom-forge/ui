<script lang="ts">
	import {Select, as} from '@atom-forge/ui';
	import {twMerge} from 'tailwind-merge';

	const options = [
		{value: 'active',  label: 'Active',  dot: 'bg-accent',    text: 'text-accent'},
		{value: 'idle',    label: 'Idle',    dot: 'bg-primary',   text: 'text-canvas-contrast'},
		{value: 'offline', label: 'Offline', dot: 'bg-frame',     text: 'text-muted-contrast'},
		{value: 'error',   label: 'Error',   dot: 'bg-error',     text: 'text-error'},
	];

	const toOption = as<(typeof options)[number]>;
		let value = $state<string>('active');
</script>

<div class="max-w-xs">
	<Select {options} bind:value>
		{#snippet trigger(opt)}
			{@const selected = toOption(opt)}
			{@const dot = selected.dot}
			{@const text = selected.text}
			<span class="flex items-center gap-2">
				<span class="w-2 h-2 rounded-full shrink-0 {dot}"></span>
				<span class={text}>{opt.label}</span>
			</span>
		{/snippet}
		{#snippet option(opt, isHighlighted)}
			{@const dot = toOption(opt).dot}
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
