<script lang="ts">
	import { Button, Stepper } from '@atom-forge/ui';
	import type { Step } from '@atom-forge/ui';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	const steps: Step[] = [
		{ id: 'account', label: 'Account' },
		{ id: 'profile', label: 'Profile' },
		{ id: 'billing', label: 'Billing' },
		{ id: 'confirm', label: 'Confirm' },
	];

	let current = $state('account');

	const currentIndex = $derived(steps.findIndex(s => s.id === current));

	function prev() { if (currentIndex > 0) current = steps[currentIndex - 1].id; }
	function next() { if (currentIndex < steps.length - 1) current = steps[currentIndex + 1].id; }
</script>

<div class="flex flex-col gap-6">
	<Stepper {steps} bind:current readonly={false} />
	<div class="flex justify-between">
		<Button label="Back" icon={ChevronLeft} secondary onclick={prev} disabled={currentIndex === 0} />
		<Button label="Next" endIcon={ChevronRight} onclick={next} disabled={currentIndex === steps.length - 1} />
	</div>
</div>
