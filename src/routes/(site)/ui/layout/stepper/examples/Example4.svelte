<script lang="ts">
	import { Stepper } from '@atom-forge/ui';
	import type { Step } from '@atom-forge/ui';

	const steps: Step[] = [
		{ id: 'account', label: 'Account', description: 'Set up your credentials' },
		{ id: 'profile', label: 'Profile', description: 'Tell us about yourself' },
		{ id: 'billing', label: 'Billing', description: 'Choose a plan' },
		{ id: 'confirm', label: 'Confirm', description: 'Review and submit' },
	];

	let current = $state('billing');
</script>

<Stepper {steps} bind:current compact />
