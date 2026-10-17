<script lang="ts">
	import {Table, type ColumnDef} from '../../../lib/controls/data/table';

	type Project = {
		id: string;
		name: string;
		owner: string;
		status: 'Active' | 'Paused' | 'Review';
		budget: number;
		risk: 'Low' | 'Medium' | 'High';
		reference: string;
		summary: string;
	};

	const projects: Project[] = [
		{
			id: 'AF-104',
			name: 'Component audit',
			owner: 'Design Systems',
			status: 'Active',
			budget: 42000,
			risk: 'Low',
			reference: 'component-audit-dashboard-row-density-check',
			summary: 'Checks dense table rendering across compact dashboard panels and embedded data views.',
		},
		{
			id: 'AF-118',
			name: 'Overlay migration with compatibility bridge',
			owner: 'Frontend',
			status: 'Review',
			budget: 61000,
			risk: 'Medium',
			reference: 'overlay-migration-context-stack-regression-suite',
			summary: 'Tracks nested overlay behavior while keeping legacy consumers on the old popup entry points.',
		},
		{
			id: 'AF-127',
			name: 'Editor polishing',
			owner: 'Product',
			status: 'Paused',
			budget: 28000,
			risk: 'High',
			reference: 'editor-block-toolbar-selection-state',
			summary: 'Long-form editing surfaces need wrapped descriptions because the content is more important than row height.',
		},
		{
			id: 'AF-139',
			name: 'Docs refresh',
			owner: 'Platform',
			status: 'Active',
			budget: 19000,
			risk: 'Low',
			reference: 'docs-refresh-api-table-page',
			summary: 'Refreshes public examples after the sizing and overflow API lands.',
		},
	];

	let baseColumns = $state<ColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, width: '7ch', shrink: true},
		{key: 'name', label: 'Project', minWidth: '14rem', grow: true},
		{key: 'owner', label: 'Owner', width: '10rem'},
		{
			key: 'status',
			label: 'Status',
			width: '8rem',
			style: {
				cell: (row) => row.status === 'Active' ? 'font-medium text-success' : row.status === 'Review' ? 'font-medium text-accent' : 'text-muted-contrast',
			},
		},
		{
			key: 'budget',
			label: 'Budget',
			width: '8rem',
			formatter: (row) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(row.budget),
			style: {
				header: 'text-right',
				cell: 'text-right tabular-nums',
			},
		},
	]);

	let framelessColumns = $state<ColumnDef<Project>[]>([
		{key: 'name', label: 'Project', minWidth: '14rem', grow: true},
		{key: 'owner', label: 'Owner', width: '10rem'},
		{
			key: 'risk',
			label: 'Risk',
			width: '6rem',
			shrink: true,
			style: {
				header: 'text-right',
				cell: (row) => row.risk === 'High' ? 'text-right font-medium text-error' : row.risk === 'Medium' ? 'text-right font-medium text-warning' : 'text-right text-success',
			},
		},
	]);

	let hiddenHeaderColumns = $state<ColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, width: '7ch', shrink: true, style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'name', label: 'Project', minWidth: '16rem', grow: true, style: {cell: 'font-medium'}},
		{key: 'status', label: 'Status', width: '8rem', shrink: true, style: {cell: 'text-muted-contrast'}},
	]);

	let ellipsisColumns = $state<ColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, width: '7ch', overflow: 'clip', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'reference', label: 'Reference', width: '14rem', overflow: 'ellipsis'},
		{key: 'name', label: 'Project', minWidth: '18rem', grow: true, overflow: 'ellipsis'},
		{key: 'risk', label: 'Risk', width: '6rem', overflow: 'clip'},
	]);

	let wrapColumns = $state<ColumnDef<Project>[]>([
		{key: 'id', label: 'ID', fixed: true, width: '7ch', overflow: 'clip', style: {cell: 'font-mono text-xs text-muted-contrast'}},
		{key: 'name', label: 'Project', width: '14rem', overflow: 'wrap', style: {cell: 'font-medium'}},
		{key: 'summary', label: 'Summary', minWidth: '24rem', grow: true, overflow: 'wrap'},
		{key: 'owner', label: 'Owner', width: '10rem', overflow: 'ellipsis'},
	]);
</script>

<div class="min-h-screen bg-canvas p-8 text-canvas-contrast">
	<div class="mx-auto flex w-full max-w-6xl flex-col gap-8">
		<header class="flex flex-col gap-2">
			<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast">Data controls</p>
			<h1 class="text-2xl font-semibold">Table</h1>
		</header>

		<section class="flex min-w-0 flex-col gap-3">
			<div>
				<h2 class="text-sm font-semibold">Default table</h2>
				<p class="text-xs text-muted-contrast">No-scroll layout with explicit width weights, fluid project column, sticky headers, and editable column visibility.</p>
			</div>

			<Table data={projects} bind:columns={baseColumns} columnsEditable noScroll class="max-h-72"/>
		</section>

		<section class="grid min-w-0 gap-8 lg:grid-cols-2">
			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Shared header styling</h2>
					<p class="text-xs text-muted-contrast">Header classes apply to every header cell, while column styles can still override individual cells.</p>
				</div>

				<Table
					data={projects}
					bind:columns={baseColumns}
					noScroll
					headerClass="bg-surface-primary normal-case text-muted-contrast"
					class="max-h-72"
				/>
			</div>

			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Frameless table</h2>
					<p class="text-xs text-muted-contrast">The wrapper frame and row dividers are removed for embedded layouts.</p>
				</div>

				<div class="bg-surface-primary p-4">
					<Table
						data={projects}
						bind:columns={framelessColumns}
						frameless
						noScroll
						headerClass="bg-surface-primary normal-case text-muted-contrast"
					/>
				</div>
			</div>
		</section>

		<section class="flex min-w-0 flex-col gap-3">
			<div>
				<h2 class="text-sm font-semibold">Hidden header</h2>
				<p class="text-xs text-muted-contrast">Column sizing still holds when the header is not rendered.</p>
			</div>

			<Table
				data={projects}
				bind:columns={hiddenHeaderColumns}
				hideHeader
				frameless
				noScroll
				rowStyle={(row) => row.risk === 'High' ? 'bg-error/10' : ''}
				class="max-h-72"
			/>
		</section>

		<section class="grid min-w-0 gap-8 lg:grid-cols-2">
			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Narrow ellipsis</h2>
					<p class="text-xs text-muted-contrast">Long identifiers stay on one line and truncate inside narrow columns.</p>
				</div>

				<div class="max-w-xl">
					<Table
						data={projects}
						bind:columns={ellipsisColumns}
						noScroll
						overflow="ellipsis"
						headerClass="normal-case"
						class="max-h-72"
					/>
				</div>
			</div>

			<div class="flex min-w-0 flex-col gap-3">
				<div>
					<h2 class="text-sm font-semibold">Wide wrapping</h2>
					<p class="text-xs text-muted-contrast">Descriptive columns can wrap while short metadata columns remain clipped or ellipsized.</p>
				</div>

				<Table
					data={projects}
					bind:columns={wrapColumns}
					noScroll
					layout="auto"
					overflow="wrap"
					headerClass="normal-case"
					class="max-h-80"
				/>
			</div>
		</section>
	</div>
</div>
