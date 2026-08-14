<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { computeLayout, overlaps } from './layout.js';
	import type { BlockedRegion, GhostState, OrganizerAxisMark, OrganizerCellMeta, OrganizerItem, OrganizerItemRendered, OrganizerSubdivisions, OrganizerSubdivision, OverlapStrategy } from './types.js';

	// ── props ─────────────────────────────────────────────────────────────────

	let {
		items = $bindable([]),
		item: itemSnippet,
		cols = 12,
		rows,
		rowHeight = 50,
		draggable = true,
		resizable = true,
		allowOverlap = false,
		overlapStrategy = 'compress' as OverlapStrategy,
		blocked = [],
		subdivisions = {},
		minColWidth = 0,
		minW = 1,
		maxW,
		minH = 1,
		maxH,
		colHeader,
		rowHeader,
		rowHeaderWidth,
		footer,
		cell,
		class: classes = '',
	}: {
		items?: OrganizerItem[];
		item: Snippet<[OrganizerItemRendered]>;
		cols?: number;
		rows?: number;
		rowHeight?: number;
		draggable?: boolean;
		resizable?: boolean | 'vertical' | 'horizontal';
		allowOverlap?: boolean;
		overlapStrategy?: OverlapStrategy;
		blocked?: BlockedRegion[];
		subdivisions?: OrganizerSubdivisions;
		minColWidth?: number;
		minW?: number;
		maxW?: number;
		minH?: number;
		maxH?: number;
		colHeader?: Snippet<[OrganizerAxisMark]>;
		rowHeader?: Snippet<[OrganizerAxisMark]>;
		rowHeaderWidth?: number | string;
		footer?: Snippet;
		cell?: Snippet<[OrganizerCellMeta]>;
		class?: string;
	} = $props();

	// ── state ─────────────────────────────────────────────────────────────────

	let gridEl = $state<HTMLDivElement | undefined>();
	let scrollerEl = $state<HTMLDivElement | undefined>();
	let colHeaderTrackEl = $state<HTMLDivElement | undefined>();
	let rowHeaderEl = $state<HTMLDivElement | undefined>();
	let rowHeaderMeasuredWidth = $state(0);
	let scrollFrame = 0;
	let ghost = $state<GhostState | null>(null);
	let draggingId = $state<string | null>(null);

	// ── derived ───────────────────────────────────────────────────────────────

	const effectiveRows = $derived(
		rows ?? Math.max(1, ...items.map(i => i.y + i.h)),
	);

	const effectiveStrategy = $derived(
		resizable === true && (overlapStrategy === 'calendar' || overlapStrategy === 'calendar-v')
			? 'compress'
			: overlapStrategy,
	);

	const renderedItems = $derived(computeLayout(items, cols, effectiveStrategy, rowHeight));

	const xMarks = $derived(range(cols).map(index => axisMark(index, subdivisions.x)));
	const yMarks = $derived(range(effectiveRows).map(index => axisMark(index, subdivisions.y)));

	const gridMinWidth = $derived(minColWidth > 0 ? `${cols * minColWidth}px` : '100%');
	const rowHeaderTrack = $derived(rowHeaderWidth === undefined
		? rowHeaderMeasuredWidth > 0 ? `${rowHeaderMeasuredWidth}px` : 'auto'
		: typeof rowHeaderWidth === 'number'
			? `${rowHeaderWidth}px`
			: rowHeaderWidth);

	// ── scroll sync ───────────────────────────────────────────────────────────

	function syncScrollPosition(left: number, top: number) {
		if (colHeaderTrackEl) colHeaderTrackEl.style.transform = `translate3d(${-left}px, 0, 0)`;
		if (rowHeaderEl) rowHeaderEl.style.transform = `translate3d(0, ${-top}px, 0)`;
	}

	function scheduleScrollSync(left: number, top: number) {
		if (scrollFrame) cancelAnimationFrame(scrollFrame);
		scrollFrame = requestAnimationFrame(() => {
			syncScrollPosition(left, top);
			scrollFrame = 0;
		});
	}

	$effect(() => {
		const scroller = scrollerEl;
		if (!scroller) return;

		function handleScroll() {
			scheduleScrollSync(scroller.scrollLeft, scroller.scrollTop);
		}

		scroller.addEventListener('scroll', handleScroll, {passive: true});
		syncScrollPosition(scroller.scrollLeft, scroller.scrollTop);

		return () => {
			scroller.removeEventListener('scroll', handleScroll);
			if (scrollFrame) cancelAnimationFrame(scrollFrame);
			scrollFrame = 0;
		};
	});

	// ── helpers ───────────────────────────────────────────────────────────────

	function range(n: number): number[] {
		return Array.from({ length: n }, (_, i) => i);
	}

	function isEvery(index: number, every: number | undefined, offset = 0): boolean {
		if (!every || every <= 0) return false;
		return (index - offset) % every === 0;
	}

	function axisMark(index: number, subdivision: OrganizerSubdivision | undefined): OrganizerAxisMark {
		const offset = subdivision?.offset ?? 0;
		const alternateEvery = subdivision?.alternateEvery;

		return {
			index,
			minor: isEvery(index, subdivision?.minorEvery, offset),
			major: isEvery(index, subdivision?.majorEvery, offset),
			alternate: alternateEvery !== undefined && alternateEvery > 0
				? Math.floor((index - offset) / alternateEvery) % 2 !== 0
				: false,
		};
	}

	function snapX(rawX: number, itemW: number): number {
		return Math.max(0, Math.min(cols - itemW, Math.round(rawX)));
	}

	function snapY(rawY: number): number {
		return Math.max(0, Math.round(rawY));
	}

	function ghostStyle(sx: number, sy: number, itemW: number, itemH: number): GhostState {
		return {
			left: `${(sx / cols) * 100}%`,
			width: `${(itemW / cols) * 100}%`,
			top: sy * rowHeight,
			height: itemH * rowHeight,
		};
	}

	// ── drag ──────────────────────────────────────────────────────────────────

	function startDrag(e: MouseEvent, ritem: OrganizerItemRendered) {
		if (e.button !== 0) return;
		if (!gridEl) return;
		e.preventDefault();
		e.stopPropagation();

		const startMouseX = e.clientX;
		const startMouseY = e.clientY;
		const origX = ritem.x;
		const origY = ritem.y;
		let sx = origX;
		let sy = origY;

		draggingId = ritem.id;

		function onMove(ev: MouseEvent) {
			if (!gridEl) return;
			const rect = gridEl.getBoundingClientRect();
			const colW = rect.width / cols;
			sx = snapX(origX + (ev.clientX - startMouseX) / colW, ritem.w);
			sy = snapY(origY + (ev.clientY - startMouseY) / rowHeight);
			ghost = ghostStyle(sx, sy, ritem.w, ritem.h);
		}

		function onUp() {
			ghost = null;
			draggingId = null;

			const moved = sx !== origX || sy !== origY;
			if (moved) {
				const candidate = { ...ritem, x: sx, y: sy };
				if (!allowOverlap && items.some(i => i.id !== ritem.id && overlaps(candidate, i))) { cleanup(); return; }
				if (blocked.some(b => overlaps(candidate, b))) { cleanup(); return; }
				items = items.map(i => i.id === ritem.id ? { ...i, x: sx, y: sy } : i);
			}
			cleanup();
		}

		function cleanup() {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseup', onUp);
		}

		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onUp);
	}

	// ── resize ────────────────────────────────────────────────────────────────

	function startResize(e: MouseEvent, ritem: OrganizerItemRendered) {
		if (e.button !== 0) return;
		if (!gridEl) return;
		e.preventDefault();
		e.stopPropagation();

		const startMouseX = e.clientX;
		const startMouseY = e.clientY;
		const origW = ritem.w;
		const origH = ritem.h;
		let sw = origW;
		let sh = origH;

		draggingId = ritem.id;

		function onMove(ev: MouseEvent) {
			if (!gridEl) return;
			const rect = gridEl.getBoundingClientRect();
			const colW = rect.width / cols;
			if (resizable !== 'vertical')
				sw = Math.max(minW, Math.min(maxW ?? cols - ritem.x, Math.round(origW + (ev.clientX - startMouseX) / colW)));
			if (resizable !== 'horizontal')
				sh = Math.max(minH, Math.min(maxH ?? Infinity, Math.round(origH + (ev.clientY - startMouseY) / rowHeight)));
			ghost = ghostStyle(ritem.x, ritem.y, sw, sh);
		}

		function onUp() {
			ghost = null;
			draggingId = null;

			const changed = sw !== origW || sh !== origH;
			if (changed) {
				const candidate = { ...ritem, w: sw, h: sh };
				if (!allowOverlap && items.some(i => i.id !== ritem.id && overlaps(candidate, i))) { cleanup(); return; }
				if (blocked.some(b => overlaps(candidate, b))) { cleanup(); return; }
				items = items.map(i => i.id === ritem.id ? { ...i, w: sw, h: sh } : i);
			}
			cleanup();
		}

		function cleanup() {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseup', onUp);
		}

		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onUp);
	}

	// ── styles ────────────────────────────────────────────────────────────────

	const rootClass = $derived(twMerge('flex flex-col select-none overflow-hidden bg-surface', classes));
</script>

<div class={rootClass}>
	<!-- Col headers -->
	{#if colHeader}
		<div class="flex flex-none overflow-hidden bg-surface">
			{#if rowHeader}
				<div class="flex-none border-b border-r border-frame bg-surface" style="width:{rowHeaderTrack}"></div>
			{/if}
			<div class="min-w-0 flex-1 overflow-hidden">
				<div
					bind:this={colHeaderTrackEl}
					class="grid bg-surface"
					style="grid-template-columns: repeat({cols}, 1fr); min-width:{gridMinWidth}"
				>
					{#each xMarks as xMark}
						{@render colHeader(xMark)}
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<div class="flex min-h-0 flex-1 overflow-hidden">
		<!-- Row headers -->
		{#if rowHeader}
			<div
				class="flex-none overflow-hidden bg-surface"
				style="width:{rowHeaderTrack}"
			>
				<div
					bind:this={rowHeaderEl}
					bind:clientWidth={rowHeaderMeasuredWidth}
					class="bg-surface"
				>
					{#each yMarks as yMark}
						<div style="height:{rowHeight}px">{@render rowHeader(yMark)}</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Grid scroller -->
		<div
			bind:this={scrollerEl}
			class="min-w-0 flex-1 overflow-auto"
		>
			<div
				bind:this={gridEl}
				class="relative min-w-0 overflow-hidden"
				style="height:{effectiveRows * rowHeight}px; min-width:{gridMinWidth}"
			>
				<!-- Background cells -->
				{#if cell}
					<div
						class="absolute inset-0 grid"
						style="grid-template-columns:repeat({cols},1fr)"
					>
						{#each yMarks as yMark}
							{#each xMarks as xMark}
								<div style="height:{rowHeight}px">{@render cell({ x: xMark, y: yMark })}</div>
							{/each}
						{/each}
					</div>
				{/if}

				<!-- Column dividers -->
				<div class="absolute inset-0 grid pointer-events-none" style="grid-template-columns:repeat({cols},1fr)">
					{#each range(cols) as c}
						<div class={c < cols - 1 ? 'border-r border-frame' : ''}></div>
					{/each}
				</div>

				<!-- Blocked regions -->
				{#each blocked as b}
					<div
						class="absolute pointer-events-none bg-muted/40 striped-10"
						style="left:{(b.x / cols) * 100}%; width:{(b.w / cols) * 100}%; top:{b.y * rowHeight}px; height:{b.h * rowHeight}px; z-index:2"
					></div>
				{/each}

				<!-- Items -->
				{#each renderedItems as ritem (ritem.id)}
					<div
						class={twMerge(
							'absolute transition-shadow',
							draggable && 'cursor-grab active:cursor-grabbing',
							draggingId === ritem.id && 'opacity-50',
						)}
						style="left:{ritem._renderLeft}; width:{ritem._renderWidth}; top:{ritem._renderTop ?? ritem.y * rowHeight + 'px'}; height:{ritem._renderHeight ?? ritem.h * rowHeight + 'px'}; z-index:{draggingId === ritem.id ? 20 : 1}"
						onmousedown={draggable ? (e) => startDrag(e, ritem) : undefined}
						role="none"
					>
						{@render itemSnippet(ritem)}

						<!-- Resize handle -->
						{#if resizable}
							{#if resizable === 'vertical'}
								<div
									class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-3 cursor-s-resize z-10 flex items-end justify-center pb-0.5"
									onmousedown={(e) => startResize(e, ritem)}
									role="none"
								>
									<svg width="12" height="4" viewBox="0 0 12 4" class="opacity-40">
										<path d="M1 1h10M1 3h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									</svg>
								</div>
							{:else if resizable === 'horizontal'}
								<div
									class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-8 cursor-e-resize z-10 flex items-center justify-end pr-0.5"
									onmousedown={(e) => startResize(e, ritem)}
									role="none"
								>
									<svg width="4" height="12" viewBox="0 0 4 12" class="opacity-40">
										<path d="M1 1v10M3 1v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
									</svg>
								</div>
							{:else}
								<div
									class="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10 flex items-end justify-end pb-0.5 pr-0.5"
									onmousedown={(e) => startResize(e, ritem)}
									role="none"
								>
									<svg width="8" height="8" viewBox="0 0 8 8" class="opacity-40">
										<path d="M8 0L0 8" stroke="currentColor" stroke-width="1.5"/>
										<path d="M8 4L4 8" stroke="currentColor" stroke-width="1.5"/>
									</svg>
								</div>
							{/if}
						{/if}
					</div>
				{/each}

				<!-- Drag / resize ghost -->
				{#if ghost}
					<div
						class="absolute pointer-events-none border-2 border-dashed border-accent bg-accent/10 rounded z-30"
						style="left:{ghost.left}; width:{ghost.width}; top:{ghost.top}px; height:{ghost.height}px"
					></div>
				{/if}
			</div>
		</div>
	</div>

	{#if footer}
		<div class="flex-none">
			{@render footer()}
		</div>
	{/if}
</div>
