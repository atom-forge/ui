<script lang="ts">
	import { Timeline } from '$lib';
	import { Check, Package, Truck, Home } from 'lucide-svelte';

	const steps = [
		{ label: 'Ordered', icon: Package, done: true },
		{ label: 'Packed', icon: Package, done: true },
		{ label: 'In transit', icon: Truck, done: true },
		{ label: 'Delivered', icon: Home, done: false },
	];
</script>

<Timeline items={steps} bottom>
	{#snippet dot(step)}
		<div class="w-8 h-8 rounded-full flex items-center justify-center
			{step.done ? 'bg-accent text-accent-contrast' : 'bg-secondary text-muted-contrast'}">
			<step.icon size={16} />
		</div>
	{/snippet}

	{#snippet children(step)}
		<p class="text-xs font-medium text-center {step.done ? 'text-canvas-contrast' : 'text-muted-contrast'}">
			{step.label}
		</p>
	{/snippet}
</Timeline>
