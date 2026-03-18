<script lang="ts">
	import {Accordion, AccordionItem, Avatar, Button, Card, Chip, Input, NativeSelect, Tooltip, getToastManager, Field} from "$lib";
	import {Download, Eye, File, FileSpreadsheet, FileText, FileX, Search} from "lucide-svelte";

	const toast = getToastManager();

	type Doc = {
		id: number;
		name: string;
		type: 'pdf' | 'xlsx' | 'csv' | 'doc';
		size: string;
		updated: string;
		updatedBy: string;
		downloads: number;
	};

	const deptOptions = [
		{value: 'all', label: 'All departments'},
		{value: 'hr', label: 'HR'},
		{value: 'finance', label: 'Finance'},
		{value: 'it', label: 'IT'},
		{value: 'general', label: 'General'},
	];

	const fileIcon = {
		pdf:  FileText,
		xlsx: FileX,
		csv:  FileSpreadsheet,
		doc:  File,
	};
	const fileColor = {
		pdf:  'text-red-500',
		xlsx: 'text-green-600',
		csv:  'text-blue-500',
		doc:  'text-blue-700',
	};

	type DocSection = {label: string; category: string; docs: Doc[]};

	const sections: DocSection[] = [
		{
			label: 'HR & People', category: 'hr', docs: [
				{id: 1, name: 'Employee Handbook 2025.pdf', type: 'pdf', size: '2.4 MB', updated: 'Jan 15', updatedBy: 'Sarah Connor', downloads: 48},
				{id: 2, name: 'Leave Policy.pdf', type: 'pdf', size: '0.8 MB', updated: 'Jan 3', updatedBy: 'Sarah Connor', downloads: 31},
				{id: 3, name: 'Onboarding Checklist.xlsx', type: 'xlsx', size: '120 KB', updated: 'Dec 20', updatedBy: 'Tom Reed', downloads: 12},
			]
		},
		{
			label: 'Finance', category: 'finance', docs: [
				{id: 4, name: 'Q3 2025 Financial Report.pdf', type: 'pdf', size: '5.1 MB', updated: 'Oct 12', updatedBy: 'John Martinez', downloads: 22},
				{id: 5, name: 'Budget Template 2026.xlsx', type: 'xlsx', size: '340 KB', updated: 'Nov 1', updatedBy: 'John Martinez', downloads: 19},
				{id: 6, name: 'Expense Report Q4.csv', type: 'csv', size: '88 KB', updated: 'Jan 8', updatedBy: 'Sarah Connor', downloads: 7},
			]
		},
		{
			label: 'IT & Engineering', category: 'it', docs: [
				{id: 7, name: 'Infrastructure Overview.pdf', type: 'pdf', size: '1.2 MB', updated: 'Jan 20', updatedBy: 'Andras Kovacs', downloads: 15},
				{id: 8, name: 'Security Policy v3.pdf', type: 'pdf', size: '0.6 MB', updated: 'Dec 5', updatedBy: 'Elvis', downloads: 33},
				{id: 9, name: 'VPN Setup Guide.pdf', type: 'pdf', size: '0.4 MB', updated: 'Nov 15', updatedBy: 'Andras Kovacs', downloads: 61},
			]
		},
		{
			label: 'General', category: 'general', docs: [
				{id: 10, name: 'Office Map & Floor Plan.pdf', type: 'pdf', size: '3.2 MB', updated: 'Sep 1', updatedBy: 'Tom Reed', downloads: 44},
				{id: 11, name: 'Brand Guidelines 2025.pdf', type: 'pdf', size: '8.7 MB', updated: 'Jan 2', updatedBy: 'Laura Kim', downloads: 28},
			]
		},
	];

	let search = $state('');
	let dept = $state('all');

	const filteredSections = $derived(
		sections
			.map(s => ({
				...s,
				docs: s.docs.filter(d =>
					(dept === 'all' || s.category === dept) &&
					(!search || d.name.toLowerCase().includes(search.toLowerCase()) || d.updatedBy.toLowerCase().includes(search.toLowerCase()))
				)
			}))
			.filter(s => s.docs.length > 0)
	);

	const totalDocs = $derived(filteredSections.reduce((sum, s) => sum + s.docs.length, 0));
</script>

<div class="flex flex-col gap-4">
	<!-- Search + filter -->
	<Card class="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
		<Field label="Search documents…" class="flex-1">
			<Input bind:value={search} leadingIcon={Search}/>
		</Field>
		<div class="sm:w-48">
			<Field label="Department">
				<NativeSelect options={deptOptions} bind:value={dept}/>
			</Field>
		</div>
		<span class="text-xs text-muted-contrast shrink-0">{totalDocs} document{totalDocs !== 1 ? 's' : ''}</span>
	</Card>

	<!-- Document sections in Accordion -->
	<Accordion>
		{#each filteredSections as section (section.label)}
			<AccordionItem title="{section.label} ({section.docs.length})">
				<div class="flex flex-col divide-y divide-border">
					{#each section.docs as doc (doc.id)}
						{@const FileIcon = fileIcon[doc.type]}
						{@const color = fileColor[doc.type]}
						<div class="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
							<FileIcon size={20} class="{color} shrink-0"/>
							<div class="grow min-w-0">
								<p class="text-sm font-medium text-canvas-contrast truncate">{doc.name}</p>
								<div class="flex items-center gap-2 mt-0.5">
									<span class="text-xs text-muted-contrast">{doc.size}</span>
									<span class="text-muted-contrast/50">·</span>
									<span class="text-xs text-muted-contrast">Updated {doc.updated}</span>
									<span class="text-muted-contrast/50">·</span>
									<div class="flex items-center gap-1">
										<Avatar name={doc.updatedBy} micro/>
										<span class="text-xs text-muted-contrast">{doc.updatedBy}</span>
									</div>
								</div>
							</div>
							<div class="flex items-center gap-2 shrink-0">
								<Chip>{doc.type.toUpperCase()}</Chip>
								<Tooltip label="{doc.downloads} downloads">
									<span class="text-xs text-muted-contrast">{doc.downloads}</span>
								</Tooltip>
								<Button icon={Eye} ghost micro/>
								<Button icon={Download} ghost micro onclick={() => toast.show(`Downloading ${doc.name}…`)}/>
							</div>
						</div>
					{/each}
				</div>
			</AccordionItem>
		{/each}
	</Accordion>

	{#if filteredSections.length === 0}
		<div class="flex flex-col items-center justify-center gap-3 py-16 text-muted-contrast">
			<File size={40} stroke={1.2}/>
			<p class="text-sm">No documents found</p>
		</div>
	{/if}
</div>
