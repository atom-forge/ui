<script lang="ts">
	import {GripHorizontal, GripVertical} from 'lucide-svelte';
	import {SortableGroup, SortableList} from '../../../lib/controls/data/sortable';

	type Task = {
		id: string;
		title: string;
		meta: string;
		tone: string;
	};

	type Chip = {
		id: string;
		label: string;
	};

	type LaneItem = {
		id: string;
		title: string;
		type: 'task';
	};

	let tasks = $state<Task[]>([
		{id: 'audit', title: 'Audit drag affordances', meta: 'Design review', tone: 'bg-accent/10 text-accent'},
		{id: 'preview', title: 'Tune native preview', meta: 'Interaction', tone: 'bg-success/10 text-success'},
		{id: 'docs', title: 'Refresh component docs', meta: 'Library', tone: 'bg-warning/10 text-warning'},
		{id: 'qa', title: 'Check mobile touch targets', meta: 'QA pass', tone: 'bg-info/10 text-info'},
	]);

	let chips = $state<Chip[]>([
		{id: 'alpha', label: 'Alpha'},
		{id: 'beta', label: 'Beta'},
		{id: 'gamma', label: 'Gamma'},
		{id: 'delta', label: 'Delta'},
		{id: 'omega', label: 'Omega'},
	]);

	let backlog = $state<LaneItem[]>([
		{id: 'sort-1', title: 'Expose placement style props', type: 'task'},
		{id: 'sort-2', title: 'Remove debug logging', type: 'task'},
		{id: 'sort-3', title: 'Document drag state classes', type: 'task'},
	]);

	let active = $state<LaneItem[]>([
		{id: 'sort-4', title: 'Try custom drop indicator', type: 'task'},
	]);

	let done = $state<LaneItem[]>([
		{id: 'sort-5', title: 'Keep SortableJS as fallback option', type: 'task'},
	]);

	const taskOrder = $derived(tasks.map(item => item.title).join(' / '));
	const chipOrder = $derived(chips.map(item => item.label).join(', '));

	function laneOrder(items: LaneItem[]) {
		return items.map(item => item.title).join(', ') || 'Empty';
	}
</script>

<div class="min-h-screen bg-canvas p-8 text-canvas-contrast">
	<div class="mx-auto flex max-w-6xl flex-col gap-8">
		<header class="flex flex-col gap-2">
			<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Data controls</p>
			<h1 class="text-2xl font-semibold">Sortable</h1>
		</header>

		<section class="flex flex-col gap-3">
			<div class="flex items-end justify-between gap-4">
				<div>
					<h2 class="text-sm font-semibold">Default placement preview</h2>
					<p class="text-xs text-muted-contrast">Drag from the handle to see the new line indicator and native preview.</p>
				</div>
				<p class="max-w-md truncate text-right text-xs text-muted-contrast">{taskOrder}</p>
			</div>

			<SortableList
				bind:items={tasks}
				id="sortable-tasks"
				class="gap-2"
				dragHandleSelector="[data-task-handle]"
				draggingClass="opacity-30 scale-[0.99]"
			>
				{#snippet item(task)}
					<div class="flex items-center gap-3 rounded-control border border-frame bg-surface-primary px-3 py-2 shadow-sm">
						<button
							type="button"
							data-task-handle
							class="flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded-control text-muted-contrast hover:bg-secondary hover:text-canvas-contrast active:cursor-grabbing"
							aria-label="Drag task"
						>
							<GripVertical size={16}/>
						</button>
						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-medium">{task.title}</p>
							<p class="text-xs text-muted-contrast">{task.meta}</p>
						</div>
						<span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium {task.tone}">Ready</span>
					</div>
				{/snippet}
			</SortableList>
		</section>

		<section class="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
			<div class="flex flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Horizontal chips</h2>
					<p class="text-xs text-muted-contrast">{chipOrder}</p>
				</div>

				<SortableList
					bind:items={chips}
					id="sortable-chips"
					orientation="horizontal"
					class="flex-wrap gap-2"
					dragHandleSelector="[data-chip-handle]"
					dropIndicatorClass="self-auto"
					grabbedClass="rounded-full bg-surface-primary px-3 py-1.5 shadow-xl ring-1 ring-accent/40"
				>
					{#snippet item(chip)}
						<div class="flex items-center gap-1.5 rounded-full border border-frame bg-surface-primary px-3 py-1.5 text-sm shadow-sm">
							<GripHorizontal data-chip-handle size={14} class="cursor-grab text-muted-contrast"/>
							<span>{chip.label}</span>
						</div>
					{/snippet}
				</SortableList>
			</div>

			<div class="flex flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Custom indicator</h2>
					<p class="text-xs text-muted-contrast">This uses the same SortableList behavior with a local insertion preview.</p>
				</div>

				<SortableList
					bind:items={tasks}
					id="sortable-custom"
					class="gap-1"
					dragHandleSelector="[data-custom-handle]"
					grabbedClass="rounded-control bg-control shadow-xl ring-2 ring-accent/40"
				>
					{#snippet item(task)}
						<div class="flex items-center gap-2 rounded-control bg-control px-3 py-2 text-sm">
							<GripVertical data-custom-handle size={15} class="cursor-grab text-muted-contrast"/>
							<span class="truncate">{task.title}</span>
						</div>
					{/snippet}

					{#snippet dropIndicator(draggingItem)}
						<div class="py-1">
							<div class="flex items-center gap-2 rounded-control border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent">
								<span class="h-2 w-2 rounded-full bg-accent"></span>
								<span>{draggingItem?.title ?? 'Drop here'}</span>
							</div>
						</div>
					{/snippet}
				</SortableList>
			</div>
		</section>

		<section class="flex flex-col gap-3">
			<div>
				<h2 class="text-sm font-semibold">Cross-list group</h2>
				<p class="text-xs text-muted-contrast">Move items between lanes. Each lane is still a normal SortableList.</p>
			</div>

			<SortableGroup class="grid gap-4 md:grid-cols-3">
				<div class="flex min-h-64 flex-col gap-3 rounded-control border border-frame bg-surface-primary p-3">
					<h3 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Backlog</h3>
					<SortableList bind:items={backlog} id="backlog" class="min-h-40 gap-2" dragHandleSelector="[data-lane-handle]">
						{#snippet item(item)}
							<div class="flex items-center gap-2 rounded-control border border-frame bg-canvas px-3 py-2 text-sm">
								<GripVertical data-lane-handle size={14} class="cursor-grab text-muted-contrast"/>
								<span>{item.title}</span>
							</div>
						{/snippet}
					</SortableList>
					<p class="mt-auto text-xs text-muted-contrast">{laneOrder(backlog)}</p>
				</div>

				<div class="flex min-h-64 flex-col gap-3 rounded-control border border-frame bg-surface-primary p-3">
					<h3 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Active</h3>
					<SortableList bind:items={active} id="active" class="min-h-40 gap-2" dragHandleSelector="[data-lane-handle]">
						{#snippet item(item)}
							<div class="flex items-center gap-2 rounded-control border border-frame bg-canvas px-3 py-2 text-sm">
								<GripVertical data-lane-handle size={14} class="cursor-grab text-muted-contrast"/>
								<span>{item.title}</span>
							</div>
						{/snippet}
					</SortableList>
					<p class="mt-auto text-xs text-muted-contrast">{laneOrder(active)}</p>
				</div>

				<div class="flex min-h-64 flex-col gap-3 rounded-control border border-frame bg-surface-primary p-3">
					<h3 class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Done</h3>
					<SortableList bind:items={done} id="done" class="min-h-40 gap-2" dragHandleSelector="[data-lane-handle]">
						{#snippet item(item)}
							<div class="flex items-center gap-2 rounded-control border border-frame bg-canvas px-3 py-2 text-sm">
								<GripVertical data-lane-handle size={14} class="cursor-grab text-muted-contrast"/>
								<span>{item.title}</span>
							</div>
						{/snippet}
					</SortableList>
					<p class="mt-auto text-xs text-muted-contrast">{laneOrder(done)}</p>
				</div>
			</SortableGroup>
		</section>
	</div>
</div>
