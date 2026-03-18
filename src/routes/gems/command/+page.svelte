<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable from "../../../components/doc/ApiTable.svelte";
	import type {PropDef} from "../../../components/doc/ApiTable.svelte";

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	const props: PropDef[] = [
		{ group: 'CommandPalette props', name: 'items',       type: 'CommandItem[]',                             default: '[]',               description: 'Static list of commands to display and filter locally.' },
		{ group: 'CommandPalette props', name: 'search',      type: '(query: string) => Promise<CommandItem[]>', default: '—',                description: 'Async search function. When provided, <code>items</code> is ignored and results are fetched on every keystroke (debounced 200 ms). A spinner is shown while loading.' },
		{ group: 'CommandPalette props', name: 'placeholder', type: 'string',                                    default: "'Search commands...'", description: 'Placeholder text for the search input.' },
		{ group: 'CommandPalette props', name: 'close',       type: '() => void',                                default: '() => {}',         description: 'Optional callback to close the palette. Injected automatically when opened via <code>modalManager.open()</code>.' },

		{ group: 'CommandItem', name: 'id',          type: 'string',         default: '—', description: 'Unique identifier for the command.' },
		{ group: 'CommandItem', name: 'label',       type: 'string',         default: '—', description: 'Primary display text.' },
		{ group: 'CommandItem', name: 'description', type: 'string',         default: '—', description: 'Secondary hint shown below the label. Also matched during filtering.' },
		{ group: 'CommandItem', name: 'group',       type: 'string',         default: '—', description: 'Group heading. Items sharing the same group are visually sectioned together.' },
		{ group: 'CommandItem', name: 'icon',        type: 'IconDefinition', default: '—', description: 'Optional icon displayed to the left of the label.' },
		{ group: 'CommandItem', name: 'keywords',    type: 'string[]',       default: '—', description: 'Hidden search terms — matched during filtering but never rendered.' },
		{ group: 'CommandItem', name: 'onSelect',    type: '(item) => void', default: '—', description: 'Called when the user activates this item via click or <kbd>Enter</kbd>.' },

		{ group: 'ModalManager', name: 'open(component, props, key?)', type: 'Promise<any>', default: '—', description: 'Opens a modal. The optional <code>key</code> string makes the modal a singleton — if a modal with the same key is already open, the call is ignored. Use <code>"command-palette"</code> to prevent duplicate palettes.' },
	];
</script>

<DocTitle>Command Palette</DocTitle>
<DocText>
	A keyboard-driven command palette opened as a modal. Supports static item lists, grouped results,
	descriptions, hidden keyword search, and fully async data fetching. Keyboard navigation with
	<InlineCode>↑</InlineCode> / <InlineCode>↓</InlineCode> auto-scrolls the active item into view.
	Open it globally with <InlineCode>⌘K</InlineCode> / <InlineCode>Ctrl+K</InlineCode>.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Static Commands</DocSubtitle>
		<DocText>
			Pass a static <InlineCode>items</InlineCode> array. Items are filtered client-side by
			<InlineCode>label</InlineCode>, <InlineCode>group</InlineCode>, <InlineCode>description</InlineCode>
			and <InlineCode>keywords</InlineCode>. Use <InlineCode>group</InlineCode> to visually section commands.
		</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Actions with Feedback</DocSubtitle>
		<DocText>
			Commands can trigger any side-effect — toasts, navigation, state changes.
			Close the palette inside <InlineCode>onSelect</InlineCode> via the injected <InlineCode>close</InlineCode> prop
			or by calling <InlineCode>modalManager.close()</InlineCode>.
		</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Async Search</DocSubtitle>
		<DocText>
			Pass a <InlineCode>search</InlineCode> function instead of <InlineCode>items</InlineCode> for dynamic results.
			The function receives the current query string and must return a <InlineCode>Promise&lt;CommandItem[]&gt;</InlineCode>.
			A spinner is shown while loading.
		</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>

	<div>
		<DocSubtitle>Preventing Duplicates</DocSubtitle>
		<DocText>
			Pass a unique <InlineCode>key</InlineCode> string as the third argument to <InlineCode>modalManager.open()</InlineCode>.
			If a modal with the same key is already open, subsequent calls are silently ignored —
			so hammering <InlineCode>⌘K</InlineCode> will never stack multiple palettes.
		</DocText>
		<ShowExample code={`modalManager.open(
		CommandPalette,
		{
			items,
			close: () => modalManager.close()
		},
		'command-palette'
	);`}/>
	</div>
</div>
