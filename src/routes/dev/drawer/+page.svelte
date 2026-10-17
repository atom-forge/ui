<script lang="ts">
	import {Button, Card, getDrawerManager, type DrawerPosition, type DrawerSize} from '../../../lib/index.js';
	import DrawerDemoPanel from './DrawerDemoPanel.svelte';

	const drawer = getDrawerManager();

	const positions: DrawerPosition[] = ['left', 'right', 'top', 'bottom'];
	const sizes: DrawerSize[] = ['small', 'compact', 'normal'];

	let position = $state<DrawerPosition>('right');
	let size = $state<DrawerSize>('normal');
	let customClass = $state('');

	function openDrawer(options: {position?: DrawerPosition; size?: DrawerSize; class?: string} = {}) {
		const nextPosition = options.position || position;
		const nextSize = options.size || size;
		const nextClass = options.class ?? customClass;

		drawer.open(DrawerDemoPanel, {
			position: nextPosition,
			size: nextSize,
			customClass: nextClass
		}, {
			position: nextPosition,
			size: nextSize,
			class: nextClass || undefined
		});
	}
</script>

<div class="p-8 flex flex-col gap-8">
	<section class="flex flex-col gap-3">
		<h1 class="text-lg font-semibold">Drawer</h1>
		<div class="flex flex-wrap gap-2">
			<Button label="Open configured drawer" onclick={() => openDrawer()}/>
			<Button secondary label="Bottom h-19" onclick={() => openDrawer({position: 'bottom', size: 'compact', class: 'h-19'})}/>
			<Button secondary label="Left narrow" onclick={() => openDrawer({position: 'left', size: 'small', class: 'w-72'})}/>
		</div>
	</section>

	<section class="grid gap-4 xl:grid-cols-[minmax(0,28rem)_minmax(0,1fr)]">
		<Card class="p-5 flex flex-col gap-5" elevate={1}>
			<div class="flex flex-col gap-1">
				<h2 class="text-sm font-semibold">Configuration</h2>
				<p class="text-sm text-muted-contrast">Choose an edge, a named size, and an optional class override.</p>
			</div>

			<div class="flex flex-col gap-3">
				<h3 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Position</h3>
				<div class="grid grid-cols-2 gap-2">
					{#each positions as value}
						{#if position === value}
							<Button label={value} secondary onclick={() => position = value}/>
						{:else}
							<Button label={value} outline onclick={() => position = value}/>
						{/if}
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<h3 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Size</h3>
				<div class="flex flex-wrap gap-2">
					{#each sizes as value}
						{#if size === value}
							<Button label={value} secondary onclick={() => size = value}/>
						{:else}
							<Button label={value} outline onclick={() => size = value}/>
						{/if}
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<label for="drawer-class" class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Class</label>
				<input
					id="drawer-class"
					class="h-10 rounded-control border border-frame bg-canvas px-3 text-sm text-canvas-contrast outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
					bind:value={customClass}
					placeholder="h-19, w-72, max-w-[90vw]"
				/>
			</div>
		</Card>

		<div class="grid gap-4 md:grid-cols-2">
			<Card class="p-5 flex flex-col gap-4" elevate={1}>
				<div class="flex flex-col gap-1">
					<h2 class="text-sm font-semibold">Edges</h2>
					<p class="text-sm text-muted-contrast">Open the same panel from each supported edge.</p>
				</div>
				<div class="grid grid-cols-2 gap-2">
					{#each positions as value}
						<Button label={value} onclick={() => openDrawer({position: value})}/>
					{/each}
				</div>
			</Card>

			<Card class="p-5 flex flex-col gap-4" elevate={1}>
				<div class="flex flex-col gap-1">
					<h2 class="text-sm font-semibold">Preset Sizes</h2>
					<p class="text-sm text-muted-contrast">Named sizes map to width on left/right and height on top/bottom.</p>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each sizes as value}
						<Button label={value} onclick={() => openDrawer({size: value})}/>
					{/each}
				</div>
			</Card>

			<Card class="p-5 flex flex-col gap-4 md:col-span-2" elevate={1}>
				<div class="flex flex-col gap-1">
					<h2 class="text-sm font-semibold">Class Overrides</h2>
					<p class="text-sm text-muted-contrast">The custom class is merged last, so size utilities override the default panel size.</p>
				</div>
				<div class="flex flex-wrap gap-2">
					<Button label="bottom h-19" onclick={() => openDrawer({position: 'bottom', class: 'h-19'})}/>
					<Button label="top h-80" onclick={() => openDrawer({position: 'top', class: 'h-80'})}/>
					<Button label="right w-[42rem]" onclick={() => openDrawer({position: 'right', class: 'w-[42rem]'})}/>
					<Button label="left w-72" onclick={() => openDrawer({position: 'left', class: 'w-72'})}/>
				</div>
			</Card>
		</div>
	</section>
</div>
