<script lang="ts">
	import {MultiSelect, type SelectOption} from '$lib';

	const USERS: SelectOption[] = [
		{ label: 'Alice Johnson', value: 'usr_001' },
		{ label: 'Bob Smith',     value: 'usr_002' },
		{ label: 'Carol White',   value: 'usr_003' },
		{ label: 'David Brown',   value: 'usr_004' },
		{ label: 'Eva Martinez',  value: 'usr_005' },
		{ label: 'Frank Lee',     value: 'usr_006' },
	];

	const source = {
		search: async (query: string): Promise<SelectOption[]> => {
			await new Promise(r => setTimeout(r, 300));
			const q = query.toLowerCase();
			return USERS.filter(u => String(u.label).toLowerCase().includes(q));
		},
		get: async (values: (string | number)[]): Promise<SelectOption[]> => {
			return USERS.filter(u => values.includes(u.value));
		},
	};

	let selected = $state<string[]>([]);
</script>

<div class="flex flex-col gap-3 w-80">
	<MultiSelect options={source} bind:value={selected} placeholder="Search users…"/>
	<p class="text-xs text-muted-contrast">Stored IDs: <code>{JSON.stringify(selected)}</code></p>
</div>
