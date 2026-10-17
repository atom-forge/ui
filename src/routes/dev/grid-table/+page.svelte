<script lang="ts">
	import {ExternalLink} from 'lucide-svelte';
	import {GridTable, type GridTableColumnDef, type GridTableSort} from '../../../lib/dev/grid-table';
	import {Button} from '../../../lib/controls/general/button';
	import {Chip} from '../../../lib/controls/general/chip';

	type Project = {
		id: string;
		title: string;
		reference: string;
		code: string;
		owner: string;
		status: 'Active' | 'Paused' | 'Review' | 'Blocked';
		priority: 'Low' | 'Medium' | 'High';
		budget: number;
		progress: number;
		notes: string;
	};

	const projects: Project[] = [
		{
			id: 'AF-104',
			title: 'Component audit',
			reference: 'component-audit-dashboard-row-density-check',
			code: 'GRID-AUDIT-ALPHA-001',
			owner: 'Design Systems',
			status: 'Active',
			priority: 'Low',
			budget: 42000,
			progress: 76,
			notes: 'Short identifier stays fully visible while the reference is allowed to truncate.',
		},
		{
			id: 'AF-118-LONG',
			title: 'Overlay migration with compatibility bridge',
			reference: 'overlay-migration-context-stack-regression-suite',
			code: 'OVERLAY-MIGRATION-COMPAT-BRIDGE-VERY-LONG',
			owner: 'Frontend',
			status: 'Review',
			priority: 'Medium',
			budget: 61000,
			progress: 48,
			notes: 'The ID column grows to the longest ID because it is a content-sized track.',
		},
		{
			id: 'AF-127',
			title: 'Editor polishing',
			reference: 'editor-block-toolbar-selection-state',
			code: 'EDITOR-BLOCK-TOOLBAR-STATE',
			owner: 'Product',
			status: 'Paused',
			priority: 'High',
			budget: 28000,
			progress: 34,
			notes: 'Fill receives the remaining room after content columns and truncatable columns settle.',
		},
		{
			id: 'AF-139',
			title: 'Docs refresh',
			reference: 'docs-refresh-api-table-page',
			code: 'DOCS-REFRESH',
			owner: 'Platform',
			status: 'Active',
			priority: 'Low',
			budget: 19000,
			progress: 92,
			notes: 'This row keeps the table boring on purpose.',
		},
		{
			id: 'AF-144',
			title: 'GridTable sizing experiment',
			reference: 'grid-table-content-truncate-fill-track-model',
			code: 'GRIDTABLE-SIZING-PROOF-OF-CONCEPT',
			owner: 'UI Library',
			status: 'Blocked',
			priority: 'High',
			budget: 36000,
			progress: 12,
			notes: 'This row is intentionally tense: long enough to test truncation, content tracks, and row styling.',
		},
	];

	const manyProjects: Project[] = Array.from({length: 18}, (_, index) => {
		const source = projects[index % projects.length];
		return {
			...source,
			id: `${source.id}-${index + 1}`,
			title: `${source.title} ${index + 1}`,
			progress: (source.progress + index * 7) % 100,
			budget: source.budget + index * 1750,
		};
	});

	let selectedProject = $state('No row selected yet');
	let actionLog = $state('No action button clicked yet');
	let sortLog = $state('No sort requested yet');
	let mainSort = $state<GridTableSort<Project>>([]);

	function money(value: number) {
		return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(value);
	}

	function statusColor(status: Project['status']) {
		if (status === 'Active') return 'green';
		if (status === 'Review') return 'blue';
		if (status === 'Blocked') return 'red';
		return 'yellow';
	}

	function priorityColor(priority: Project['priority']) {
		if (priority === 'High') return 'red';
		if (priority === 'Medium') return 'yellow';
		return 'green';
	}

	function dangerRowStyle(isHighlighted: boolean) {
		return isHighlighted
			? {style: 'background-color: color-mix(in srgb, var(--color-error) 12%, var(--color-surface));'}
			: '';
	}

	function getSortValue(row: Project, key: keyof Project) {
		return row[key];
	}

	const sortedProjects = $derived.by(() => {
		if (mainSort.length === 0) return projects;

		return [...projects].sort((left, right) => {
			for (const sortRule of mainSort) {
				const leftValue = getSortValue(left, sortRule.key);
				const rightValue = getSortValue(right, sortRule.key);
				const direction = sortRule.direction === 'asc' ? 1 : -1;

				if (typeof leftValue === 'number' && typeof rightValue === 'number') {
					const result = (leftValue - rightValue) * direction;
					if (result !== 0) return result;
					continue;
				}

				const result = String(leftValue).localeCompare(String(rightValue), undefined, {numeric: true}) * direction;
				if (result !== 0) return result;
			}

			return 0;
		});
	});

	let mainColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'reference', label: 'Reference', sizing: 'truncate', overflow: 'ellipsis', width: '18rem', sortable: true},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', sortable: true, style: {cell: 'font-medium'}},
		{key: 'owner', label: 'Owner', sizing: 'content', sortable: true},
		{key: 'status', label: 'Status', sizing: 'content', sortable: true, snippet: statusCell},
		{key: 'priority', label: 'Priority', sizing: 'content', sortable: true, snippet: priorityCell},
		{key: 'budget', label: 'Budget', sizing: 'content', sortable: true, formatter: (row) => money(row.budget), style: {header: 'text-right', cell: 'text-right tabular-nums'}},
		{key: 'code', label: 'Open', sizing: 'content', snippet: actionCell},
	]);

	let overflowColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'reference', label: 'Ellipsis', sizing: 'truncate', overflow: 'ellipsis', width: '15rem'},
		{key: 'code', label: 'Clip', sizing: 'truncate', overflow: 'clip', width: '11rem'},
		{key: 'notes', label: 'Wrapped fill', sizing: 'fill', overflow: 'wrap'},
	]);

	let compactColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'reference', label: 'Reference', sizing: 'truncate', overflow: 'ellipsis', width: '12rem'},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
	]);

	let headerlessColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
		{key: 'status', label: 'Status', sizing: 'content', snippet: statusCell},
	]);

	let scrollColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
		{key: 'owner', label: 'Owner', sizing: 'content'},
		{key: 'progress', label: 'Progress', sizing: 'content', formatter: (row) => `${row.progress}%`, style: {header: 'text-right', cell: 'text-right tabular-nums'}},
	]);

	let horizontalColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'reference', label: 'Reference', sizing: 'truncate', overflow: 'ellipsis', width: '20rem'},
		{key: 'title', label: 'Title', sizing: 'truncate', overflow: 'ellipsis', width: '18rem', style: {cell: 'font-medium'}},
		{key: 'owner', label: 'Owner', sizing: 'content'},
		{key: 'status', label: 'Status', sizing: 'content', snippet: statusCell},
		{key: 'priority', label: 'Priority', sizing: 'content', snippet: priorityCell},
		{key: 'budget', label: 'Budget', sizing: 'content', formatter: (row) => money(row.budget), style: {header: 'text-right', cell: 'text-right tabular-nums'}},
		{key: 'progress', label: 'Progress', sizing: 'content', formatter: (row) => `${row.progress}%`, style: {header: 'text-right', cell: 'text-right tabular-nums'}},
	]);

	let styledColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, sizing: 'content', visible: false, style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Styled title', sizing: 'fill', minWidth: '12rem', overflow: 'ellipsis', style: {header: 'text-accent normal-case', cell: 'font-medium'}},
		{key: 'owner', label: 'Owner', sizing: 'content', style: {cell: (row) => row.owner === 'UI Library' ? 'font-semibold text-accent' : ''}},
		{key: 'budget', label: 'Budget', sizing: 'content', width: '7rem', formatter: (row) => money(row.budget), style: {header: 'text-right normal-case', cell: 'text-right tabular-nums'}},
		{key: 'status', label: 'Status', sizing: 'content', snippet: statusCell},
	]);

	let defaultDensityColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
		{key: 'status', label: 'Status', sizing: 'content', snippet: statusCell},
	]);

	let compactDensityColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
		{key: 'status', label: 'Status', sizing: 'content', snippet: statusCell},
	]);

	let smallDensityColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
		{key: 'status', label: 'Status', sizing: 'content', snippet: statusCell},
	]);

	let framelessDividerColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
		{key: 'owner', label: 'Owner', sizing: 'content'},
	]);

	let noDividerColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
		{key: 'owner', label: 'Owner', sizing: 'content'},
	]);

	let alternateDividerColumns = $state<GridTableColumnDef<Project>[]>([
		{key: 'id', label: 'ID', sizing: 'content', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'title', label: 'Title', sizing: 'fill', overflow: 'ellipsis', style: {cell: 'font-medium'}},
		{key: 'owner', label: 'Owner', sizing: 'content'},
	]);

</script>

{#snippet statusCell(row: Project)}
	<Chip color={statusColor(row.status)}>{row.status}</Chip>
{/snippet}

{#snippet priorityCell(row: Project)}
	<Chip color={priorityColor(row.priority)}>{row.priority}</Chip>
{/snippet}

{#snippet actionCell(row: Project)}
	<Button
		icon={ExternalLink}
		small
		ghost
		data-table-row-click-ignore
		aria-label="Open project"
		onclick={(event) => {
			event.stopPropagation();
			actionLog = `Action clicked for ${row.id}`;
		}}
	/>
{/snippet}

<div class="min-h-screen bg-canvas p-8 text-canvas-contrast">
	<div class="mx-auto flex w-full max-w-6xl flex-col gap-8">
		<header class="flex flex-col gap-2">
			<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Data controls</p>
			<h1 class="text-2xl font-semibold">GridTable</h1>
		</header>

		<section class="flex min-w-0 flex-col gap-3">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h2 class="text-sm font-semibold">Full interaction surface</h2>
					<p class="text-xs text-muted-contrast">Click sortable headers to cycle sorting. Right-click a header to toggle columns.</p>
				</div>
				<div class="min-w-0 text-right">
					<p class="truncate text-xs text-muted-contrast">{selectedProject}</p>
					<p class="truncate text-xs text-muted-contrast">{actionLog}</p>
					<p class="truncate text-xs text-muted-contrast">{sortLog}</p>
				</div>
			</div>

			<GridTable
				data={sortedProjects}
				bind:columns={mainColumns}
				bind:sort={mainSort}
				columnsEditable
				hoverCell
				hoverRow
				hoverColumn
				fixedFirstColumn
				sortChange={(nextSort) => sortLog = nextSort.length === 0 ? 'Sort cleared' : `Sort requested: ${nextSort.map((item) => `${String(item.key)} ${item.direction}`).join(', ')}`}
				rowClick={(row) => selectedProject = `Selected ${row.id}: ${row.title}`}
				rowStyle={(row) => dangerRowStyle(row.priority === 'High')}
				class="max-h-96"
			/>
		</section>

		<section class="grid min-w-0 gap-8 lg:grid-cols-2">
			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Horizontal scrolling, fixed first column</h2>
					<p class="text-xs text-muted-contrast">Default overflow keeps wide content available and pins the first visible column.</p>
				</div>

				<GridTable
					data={projects}
					bind:columns={horizontalColumns}
					fixedFirstColumn
					hoverRow
					class="max-h-72"
				/>
			</div>

			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Column styling and visibility</h2>
					<p class="text-xs text-muted-contrast">Shows hidden columns, header and cell classes, minWidth, width, formatter, and snippets.</p>
				</div>

				<GridTable
					data={projects}
					bind:columns={styledColumns}
					columnsEditable
					headerClass="normal-case"
					rowStyle="bg-surface-primary"
					hoverCell
					hoverColumn
					noScroll
					class="max-h-72"
				/>
			</div>
		</section>

		<section class="grid min-w-0 gap-8 lg:grid-cols-2">
			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Narrow container</h2>
					<p class="text-xs text-muted-contrast">Uses noScroll: content-sized ID remains visible, reference truncates, title fills the rest.</p>
				</div>

				<div class="max-w-md">
					<GridTable
						data={projects}
						bind:columns={compactColumns}
						compact
						noScroll
						rowClick={(row) => selectedProject = `Selected ${row.id}: ${row.title}`}
						class="max-h-72"
					/>
				</div>
			</div>

			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Overflow modes</h2>
					<p class="text-xs text-muted-contrast">Ellipsis, clip, and wrapped fill are visible in one table.</p>
				</div>

				<GridTable data={projects} bind:columns={overflowColumns} headerClass="normal-case" class="max-h-80"/>
			</div>
		</section>

		<section class="flex min-w-0 flex-col gap-3">
			<div>
				<h2 class="text-sm font-semibold">Density variants</h2>
				<p class="text-xs text-muted-contrast">Default, compact, and small row density are shown side by side.</p>
			</div>

			<div class="grid min-w-0 gap-4 lg:grid-cols-3">
				<GridTable data={projects.slice(0, 3)} bind:columns={defaultDensityColumns} headerClass="normal-case"/>
				<GridTable data={projects.slice(0, 3)} bind:columns={compactDensityColumns} compact headerClass="normal-case"/>
				<GridTable data={projects.slice(0, 3)} bind:columns={smallDensityColumns} small headerClass="normal-case"/>
			</div>
		</section>

		<section class="flex min-w-0 flex-col gap-3">
			<div>
				<h2 class="text-sm font-semibold">Frame and divider modes</h2>
				<p class="text-xs text-muted-contrast">Frameless removes only the outer frame. Dividers control row separation.</p>
			</div>

			<div class="grid min-w-0 gap-4 lg:grid-cols-3">
				<GridTable data={projects.slice(0, 3)} bind:columns={framelessDividerColumns} frameless small headerClass="normal-case"/>
				<GridTable data={projects.slice(0, 3)} bind:columns={noDividerColumns} frameless dividers={false} small headerClass="normal-case"/>
				<GridTable data={projects.slice(0, 3)} bind:columns={alternateDividerColumns} frameless dividers="alternate" small headerClass="normal-case"/>
			</div>
		</section>

		<section class="grid min-w-0 gap-8 lg:grid-cols-2">
			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Hidden header, frameless</h2>
					<p class="text-xs text-muted-contrast">Headerless compact rows with no outer frame or row dividers.</p>
				</div>

				<div class="bg-surface-primary p-4">
					<GridTable data={projects} bind:columns={headerlessColumns} hideHeader frameless dividers={false} small class="max-h-72"/>
				</div>
			</div>

			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Vertical scrolling</h2>
					<p class="text-xs text-muted-contrast">The wrapper scrolls vertically while the header stays visible.</p>
				</div>

				<GridTable
					data={manyProjects}
					bind:columns={scrollColumns}
					headerClass="normal-case"
					hoverRow
					rowStyle={(row) => dangerRowStyle(row.status === 'Blocked')}
					class="max-h-64"
				/>
			</div>
		</section>
	</div>
</div>
