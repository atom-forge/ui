<script lang="ts">
	import {Button, getDrawerManager, type DrawerPosition, type DrawerSize} from '../../../lib/index.js';

	let {
		position,
		size,
		customClass = ''
	}: {
		position: DrawerPosition;
		size: DrawerSize;
		customClass?: string;
	} = $props();

	const drawer = getDrawerManager();
</script>

<div class="flex h-full flex-col overflow-hidden">
	<header class="flex items-center justify-between gap-3 border-b border-frame px-5 py-4">
		<div class="min-w-0">
			<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">{position} drawer</p>
			<h2 class="truncate text-base font-semibold">Drawer demo panel</h2>
		</div>
		<Button ghost compact label="Close" onclick={() => drawer.close('closed')}/>
	</header>

	<div class="flex min-h-0 grow flex-col gap-4 overflow-auto p-5">
		<div class="grid gap-3 sm:grid-cols-3">
			<div class="rounded-surface border border-frame bg-secondary/50 p-3">
				<p class="text-xs text-muted-contrast">Position</p>
				<p class="font-medium">{position}</p>
			</div>
			<div class="rounded-surface border border-frame bg-secondary/50 p-3">
				<p class="text-xs text-muted-contrast">Size</p>
				<p class="font-medium">{size}</p>
			</div>
			<div class="rounded-surface border border-frame bg-secondary/50 p-3">
				<p class="text-xs text-muted-contrast">Class</p>
				<p class="truncate font-medium">{customClass || 'default'}</p>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<p class="text-sm text-muted-contrast">
				This content is intentionally scrollable and uses the full drawer height, so every edge and custom
				size can be checked quickly.
			</p>
			<div class="grid gap-2">
				{#each Array.from({length: 8}) as _, index}
					<div class="flex items-center justify-between rounded-surface border border-frame px-3 py-2">
						<span class="text-sm">Preview row {index + 1}</span>
						<span class="text-xs text-muted-contrast">#{String(index + 1).padStart(2, '0')}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
