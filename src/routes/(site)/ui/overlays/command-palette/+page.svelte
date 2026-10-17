<script lang="ts">
	import { DocApiBlock, DocApiTable, DocShowExample, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import Example from './examples/Example.svelte';
	import code from './examples/Example.svelte?raw';

	const props: PropDef[] = [
		{ name: 'items', type: 'CommandItem[] | ((query: string) => Promise<CommandItem[]>)', default: '[]', description: 'Static commands are filtered by label, group, description, and keywords. Async sources perform their own filtering.' },
		{ name: 'placeholder', type: 'string', default: "'Search commands...'", description: 'Search field placeholder.' },
		{ name: 'close', type: '() => void', description: 'Called after selection and on Escape. Provide the overlay manager close function.' },
		{ name: 'option', type: 'Snippet<[CommandItem, boolean]>', description: 'Optional command renderer receiving the item and its highlighted state.' },
		{ group: 'CommandItem', name: 'id / label / onSelect', type: 'string / string / ((item: CommandItem) => void)', description: 'Required identity, display label, and selection handler.' },
		{ group: 'CommandItem', name: 'description / group / icon / keywords', type: 'string / string / IconDefinition / string[]', description: 'Optional descriptive, grouping, icon, and search metadata.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Command Palette</ProseTitle>
		<ProseText>A searchable, grouped command picker with keyboard navigation. CommandPalette is the picker content, not an overlay manager: open it through the modal manager supplied by Root and pass close explicitly. This example uses local commands and does not send queries to a service.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props} /></DocApiBlock>
	</ProseParagraph>
	<ProseParagraph><DocShowExample component={Example} {code} /></ProseParagraph>
</ProsePage>
