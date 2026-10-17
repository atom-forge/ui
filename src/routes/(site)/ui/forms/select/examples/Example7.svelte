<script lang="ts">
	import { Select, MultiSelect } from '@atom-forge/ui';
	import { Filter } from 'lucide-svelte';

	const options = [
		{ value: 'open', label: 'Open' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'closed', label: 'Closed' },
	];
	let status = $state<string | undefined>();
	let statuses = $state<(string | number)[]>([]);
</script>

<div class="space-y-3">
	<div class="flex flex-wrap gap-3">
		<Select {options} bind:value={status} button={{ label: 'Status', icon: Filter, secondary: true }} hideKeyboardHints/>
		<MultiSelect {options} bind:value={statuses} button={{ label: 'Filter statuses', icon: Filter, outline: true }} hideKeyboardHints/>
	</div>
	<p class="text-xs text-muted-contrast">Single: {status ?? '—'}; multiple: {statuses.join(', ') || '—'}</p>
</div>
