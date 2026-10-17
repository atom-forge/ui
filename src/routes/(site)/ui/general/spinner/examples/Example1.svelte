<script lang="ts">
	import { Spinner, Switch } from '@atom-forge/ui';

	let loading = $state(true);
</script>

<div class="space-y-4">
	<Switch bind:value={loading} label="Loading"/>
	<div role="status" class="flex items-center gap-2 text-sm text-muted-contrast">
		{#if loading}
			<Spinner class="h-5 w-5 text-accent" aria-hidden="true"/>
			<span>Loading results…</span>
		{:else}
			<span>Results loaded.</span>
		{/if}
	</div>
	<div class="flex items-center gap-4" aria-hidden="true">
		<Spinner class="h-4 w-4"/>
		<Spinner class="h-6 w-6 text-accent"/>
		<Spinner class="h-8 w-8 text-error"/>
	</div>
</div>
