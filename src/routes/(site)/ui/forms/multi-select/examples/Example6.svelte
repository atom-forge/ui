<script lang="ts">
	import {MultiSelect} from '@atom-forge/ui';
	import {X} from 'lucide-svelte';
	import {Icon} from '@atom-forge/ui';

	const colors = [
		{ label: 'Red', value: 'red' },
		{ label: 'Green', value: 'green' },
		{ label: 'Blue', value: 'blue' },
		{ label: 'Purple', value: 'purple' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Teal', value: 'teal' },
	];


	let selected = $state(['red', 'blue']);
</script>

<div class="flex flex-col gap-3 w-96">
	<MultiSelect options={colors} bind:value={selected} placeholder="Select colors…">
		{#snippet chip(opt, remove)}
			<span class="inline-flex items-center gap-1.5 rounded-full pl-2 pr-1 py-0.5 text-xs font-medium bg-accent text-accent-contrast">
				<span>{opt.label}</span>
				<!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
				<span
					role="button"
					tabindex="-1"
					class="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
					onclick={(e) => { e.stopPropagation(); remove(); }}
					aria-label="Remove {opt.label}"
				>
					<Icon icon={X} pxSize={12}/>
				</span>
			</span>
		{/snippet}
	</MultiSelect>
	<p class="text-xs text-muted-contrast">Selected: <code>{JSON.stringify(selected)}</code></p>
</div>
