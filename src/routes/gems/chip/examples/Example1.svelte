<script lang="ts">
	import { Chip, defineIcon, getToastManager } from '$lib';
	import { CircleCheck, Info, AlertTriangle, Flame, Hand } from 'lucide-svelte';

	const toastManager = getToastManager();
</script>

<div class="flex flex-wrap gap-4 items-center">
	<Chip color="base">Default</Chip>
	<Chip color="green">Success</Chip>
	<Chip color="blue">Info</Chip>
	<Chip color="yellow">Warning</Chip>
	<Chip color="red">Error</Chip>
	<Chip color="green" icon={defineIcon(CircleCheck)}>Success with Icon</Chip>
	<Chip color="blue" icon={defineIcon(Info)}>Info with Icon</Chip>
	<Chip color="yellow" icon={defineIcon(AlertTriangle)}>Warning with Icon</Chip>
	<Chip color="red" icon={defineIcon(Flame)}>Error with Icon</Chip>
	<Chip
		color="blue"
		icon={defineIcon(Hand)}
		onclick={() => toastManager.show('Chip clicked!')}
		class="cursor-pointer hover:scale-105 transition-transform"
	>
		Click me
	</Chip>
</div>
