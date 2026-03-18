<script lang="ts">
	import { onMount } from 'svelte';
	import { ProgressRing } from '$lib';

	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);

	onMount(() => {
		const updateTime = () => {
			const now = new Date();
			hours = now.getHours();
			minutes = now.getMinutes();
			seconds = now.getSeconds();
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="flex items-center justify-center p-8 rounded-lg">
	<ProgressRing
		size={180}
		strokeWidth={12}
		trackColor="var(--color-secondary-m)"
		gap={6}
		rings={[
			{ value: hours, max: 24, color: 'var(--color-red-700)' },
			{ value: minutes, max: 60, color: 'var(--color-orange-500)' },
			{ value: seconds, max: 60, color: 'var(--color-yellow-400)' },
		]}
	>
		{#snippet children()}
			<div class="flex flex-col items-center leading-tight tabular-nums font-bold text-canvas-contrast">
				<span class="text-2xl">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}</span>
				<span class="text-sm text-muted-contrast">{String(seconds).padStart(2, '0')}s</span>
			</div>
		{/snippet}
	</ProgressRing>
</div>
