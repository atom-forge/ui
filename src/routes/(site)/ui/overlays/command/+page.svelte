<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";

	import OptionsExample from "./examples/OptionsExample.svelte";
    import optionsExample from "./examples/OptionsExample.svelte?raw";

    const props: PropDef[] = [
        { group: 'CommandPalette props', name: 'option', type: 'Snippet<[CommandItem, boolean]>', description: 'Custom result renderer receiving the command and whether it is highlighted.' },
		{ group: 'CommandPalette props', name: 'items',       type: 'CommandItem[] | ((query: string) => Promise<CommandItem[]>)',                             default: '[]',               description: 'Static commands filtered locally, or an async query function. No search prop and no built-in debounce in 0.0.34.' },
		{ group: 'CommandPalette props', name: 'placeholder', type: 'string',                                    default: "'Search commands...'", description: 'Placeholder text for the search input.' },
		{ group: 'CommandPalette props', name: 'close',       type: '() => void',                                default: '() => {}',         description: 'Optional callback to close the palette. Pass explicitly when opened via modalManager.open(); it is not injected.' },

		{ group: 'CommandItem', name: 'id',          type: 'string',         default: '—', description: 'Unique identifier for the command.' },
		{ group: 'CommandItem', name: 'label',       type: 'string',         default: '—', description: 'Primary display text.' },
		{ group: 'CommandItem', name: 'description', type: 'string',         default: '—', description: 'Secondary hint shown below the label. Also matched during filtering.' },
		{ group: 'CommandItem', name: 'group',       type: 'string',         default: '—', description: 'Group heading. Items sharing the same group are visually sectioned together.' },
		{ group: 'CommandItem', name: 'icon',        type: 'IconDefinition', default: '—', description: 'Optional icon displayed to the left of the label.' },
		{ group: 'CommandItem', name: 'keywords',    type: 'string[]',       default: '—', description: 'Hidden search terms — matched during filtering but never rendered.' },
		{ group: 'CommandItem', name: 'onSelect',    type: '(item) => void', default: '—', description: 'Called when the user activates this item via click or <kbd>Enter</kbd>.' },

		{ group: 'ModalManager', name: 'open(component, props, options?)', type: 'Promise<any>', default: '—', description: 'Opens a modal. Pass { key: &quot;command-palette&quot;, closable: true } as the third argument to prevent duplicate palettes. A duplicate resolves immediately with undefined; it does not await the original palette. A string key is still accepted for compatibility.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Command Palette</ProseTitle>
		<ProseText>
			A keyboard-driven command palette opened as a modal. Supports static item lists, grouped results,
			descriptions, hidden keyword search, and fully async data fetching. Keyboard navigation with
			<DocInlineCode>↑</DocInlineCode> / <DocInlineCode>↓</DocInlineCode> auto-scrolls the active item into view.
			Bind <DocInlineCode>⌘K</DocInlineCode> / <DocInlineCode>Ctrl+K</DocInlineCode> in your application if desired; the component does not register a global shortcut.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Static Commands</ProseTitle>
				<ProseText>
					Pass a static <DocInlineCode>items</DocInlineCode> array. Items are filtered client-side by
					<DocInlineCode>label</DocInlineCode>, <DocInlineCode>group</DocInlineCode>, <DocInlineCode>description</DocInlineCode>
					and <DocInlineCode>keywords</DocInlineCode>. Use <DocInlineCode>group</DocInlineCode> to visually section commands.
				</ProseText>
				<DocShowExample component={Example1} code={example1}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Actions with Feedback</ProseTitle>
				<ProseText>
					Commands can trigger any side-effect — toasts, navigation, state changes.
					After calling onSelect, CommandPalette invokes its close prop. Supply <DocInlineCode>{'close: () => modalManager.close()'}</DocInlineCode> when opening it as a modal. Do not also close from onSelect, or a second close could dismiss an underlying modal. Async onSelect work is not awaited before closing.
				</ProseText>
				<DocShowExample component={Example2} code={example2}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Async Search</ProseTitle>
				<ProseText>
					Pass an async function as <DocInlineCode>items</DocInlineCode> for dynamic results.
					The function receives the current query string and must return a <DocInlineCode>Promise&lt;CommandItem[]&gt;</DocInlineCode>.
					A spinner is shown while loading.
				</ProseText>
				<DocShowExample component={Example3} code={example3}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Preventing Duplicates</ProseTitle>
				<ProseText>
					Pass an options object with a unique <DocInlineCode>key</DocInlineCode> as the third argument to <DocInlineCode>modalManager.open()</DocInlineCode>.
					If a modal with the same key is already open, subsequent calls resolve immediately with undefined —
					so repeated opens do not stack multiple palettes. This example also uses the option snippet to customize highlighted results.
				</ProseText>
				<DocShowExample component={OptionsExample} code={optionsExample}/>
	</ProseParagraph>
</ProsePage>
