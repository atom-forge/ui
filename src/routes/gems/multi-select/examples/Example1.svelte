<script lang="ts">
	import {MultiSelect} from '$lib';

	const options = [
		{value: 'hu', label: 'Hungary'},
		{value: 'de', label: 'Germany'},
		{value: 'fr', label: 'France'},
		{value: 'it', label: 'Italy'},
		{value: 'es', label: 'Spain'},
		{value: 'pl', label: 'Poland'},
		{value: 'nl', label: 'Netherlands'},
		{value: 'se', label: 'Sweden'},
		{value: 'at', label: 'Austria'},
		{value: 'be', label: 'Belgium'},
	];

	let value = $state<string[]>([]);
</script>

<div class="max-w-sm space-y-2">
	<MultiSelect {options} bind:value placeholder="Select countries..."/>
	<p class="text-xs text-muted-contrast">value: <span class="text-canvas-contrast">{value.join(', ') || '—'}</span></p>
</div>
