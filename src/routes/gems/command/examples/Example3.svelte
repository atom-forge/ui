<script lang="ts">
	import {Button, getModalManager, getToastManager} from "$lib";
	import {CommandPalette, type CommandItem} from "$lib/gems/command";
	import {FileSearch} from "lucide-svelte";

	const modal = getModalManager();
	const toast = getToastManager();

	async function searchFiles(query: string): Promise<CommandItem[]> {
		if (!query) return [];
		await new Promise(r => setTimeout(r, 250));
		const files = [
			{ id: 'f1', name: 'report-q1.pdf',      size: '1.2 MB' },
			{ id: 'f2', name: 'planning-q2.docx',   size: '340 KB' },
			{ id: 'f3', name: 'design-tokens.json', size: '12 KB'  },
			{ id: 'f4', name: 'meeting-notes.txt',  size: '4 KB'   },
			{ id: 'f5', name: 'annual-report.pdf',  size: '8.5 MB' },
		].filter(f => f.name.toLowerCase().includes(query.toLowerCase()));

		return files.map(f => ({
			id: f.id,
			label: f.name,
			description: f.size,
			icon: FileSearch,
			group: 'Files',
			onSelect: () => { modal.close(); toast.show(`Opening ${f.name}`); },
		}));
	}

	function open() {
		modal.open(CommandPalette, {
			placeholder: 'Search files...',
			items: searchFiles,
			close: () => modal.close(),
		});
	}
</script>

<div class="flex flex-col gap-3">
	<p class="text-sm text-muted-contrast">Results are fetched asynchronously as you type. Try <strong>pdf</strong>, <strong>report</strong> or <strong>notes</strong>.</p>
	<Button label="Search Files (Async)" onclick={open}/>
</div>


