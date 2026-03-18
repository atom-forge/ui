<script lang="ts">
	import ShowExample from '../../../components/doc/ShowExample.svelte';
	import 'svelte-highlight/styles/tokyo-night-dark.css';
	import InlineCode from '../../../components/doc/InlineCode.svelte';
	import DocTitle from '../../../components/doc/DocTitle.svelte';
	import DocSubtitle from '../../../components/doc/DocSubtitle.svelte';
	import DocText from '../../../components/doc/DocText.svelte';
	import ApiBlock from '../../../components/doc/ApiBlock.svelte';
	import ApiTable from '../../../components/doc/ApiTable.svelte';
	import type {PropDef} from '../../../components/doc/ApiTable.svelte';

	import Example1 from './examples/Example1.svelte';
	import example1 from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2 from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3 from './examples/Example3.svelte?raw';
	import Example4 from './examples/Example4.svelte';
	import example4 from './examples/Example4.svelte?raw';
	import Example5 from './examples/Example5.svelte';
	import example5 from './examples/Example5.svelte?raw';
	import Example6 from './examples/Example6.svelte';
	import example6 from './examples/Example6.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props', name: 'value',       type: 'string[]',   default: '[]',            description: 'The current list of tags. Use <code>bind:value</code> for two-way binding.' },
		{ group: 'Props', name: 'placeholder',  type: 'string',     default: "'Add tags...'", description: 'Placeholder shown when no tags are present.' },
		{ group: 'Props', name: 'disabled',     type: 'boolean',    default: 'false',         description: 'Disables the entire component.' },
		{ group: 'Props', name: 'clearable',    type: 'boolean',    default: 'false',         description: 'Shows a clear-all button when tags are present.' },
		{ group: 'Props', name: 'allowNew',     type: 'boolean',    default: 'true',          description: 'When <code>false</code>, only values from <code>options</code> can be added.' },
		{ group: 'Props', name: 'sortable',     type: 'boolean',    default: 'false',         description: 'Enables drag-and-drop reordering of tags.' },
		{ group: 'Props', name: 'uppercase',    type: 'boolean',    default: '—',             description: 'Normalizes every tag to uppercase. Mutually exclusive with <code>lowercase</code>.' },
		{ group: 'Props', name: 'lowercase',    type: 'boolean',    default: '—',             description: 'Normalizes every tag to lowercase. Mutually exclusive with <code>uppercase</code>.' },
		{ group: 'Props', name: 'compact',      type: 'boolean',    default: '—',             description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Props', name: 'small',        type: 'boolean',    default: '—',             description: 'Small size. Mutually exclusive with <code>compact</code>.' },
		{ group: 'Props', name: 'class',        type: 'string',     default: '—',             description: 'Extra classes forwarded to the wrapper element.' },

		{ group: 'Props', name: 'options', type: 'string[] | ((query: string) => Promise<string[]>)', default: '—', description: 'Static list or async function. Static arrays are filtered automatically by the current input. When omitted, no dropdown is shown.' },

		{ group: 'Snippets', name: 'chip',   type: 'Snippet<[string, () => void]>',  default: '—', description: 'Custom chip renderer. Receives the tag string and a <code>remove()</code> callback.' },
		{ group: 'Snippets', name: 'option', type: 'Snippet<[string, boolean]>',     default: '—', description: 'Custom dropdown item renderer. Receives the suggestion string and an <code>isHighlighted</code> flag.' },

		{ group: 'Keyboard', name: 'Enter',           type: '—', default: '—', description: 'Confirms the current input as a new tag, or selects the highlighted suggestion.' },
		{ group: 'Keyboard', name: 'ArrowDown / Up',  type: '—', default: '—', description: 'Navigates the suggestion dropdown.' },
		{ group: 'Keyboard', name: 'Escape',          type: '—', default: '—', description: 'Closes the suggestion dropdown.' },
		{ group: 'Keyboard', name: 'Backspace',       type: '—', default: '—', description: 'When the input is empty, removes the last tag.' },
	];
</script>

<DocTitle>Tag Editor</DocTitle>
<DocText>
	An interactive input that manages a list of string tags. Type and press
	<InlineCode>Enter</InlineCode> to add a tag; remove them with the
	<InlineCode>×</InlineCode> button or <InlineCode>Backspace</InlineCode>.
	Supports static and async autocomplete suggestions.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>
			Bind <InlineCode>value</InlineCode> to a <InlineCode>string[]</InlineCode>. Press
			<InlineCode>Enter</InlineCode> to confirm, <InlineCode>Backspace</InlineCode> on empty input removes the last tag.
		</DocText>
		<ShowExample component={Example1} code={example1}/>
	</div>

	<div>
		<DocSubtitle>Sizes</DocSubtitle>
		<DocText>
			Three sizes: <InlineCode>normal</InlineCode> (default), <InlineCode>compact</InlineCode>, <InlineCode>small</InlineCode>.
		</DocText>
		<ShowExample component={Example2} code={example2}/>
	</div>

	<div>
		<DocSubtitle>Disabled, Clearable & Case</DocSubtitle>
		<DocText>
			<InlineCode>disabled</InlineCode> prevents all interaction.
			<InlineCode>clearable</InlineCode> adds a clear-all button.
			<InlineCode>uppercase</InlineCode> and <InlineCode>lowercase</InlineCode> normalize input on the fly.
		</DocText>
		<ShowExample component={Example3} code={example3}/>
	</div>

	<div>
		<DocSubtitle>Options</DocSubtitle>
		<DocText>
			Pass a static array or an async function as <InlineCode>options</InlineCode>.
			A dropdown appears while typing; the highlighted option is added with <InlineCode>Enter</InlineCode>.
			Set <InlineCode>allowNew={false}</InlineCode> to restrict input to listed values only.
		</DocText>
		<ShowExample component={Example4} code={example4}/>
	</div>

	<div>
		<DocSubtitle>Sortable</DocSubtitle>
		<DocText>
			Add <InlineCode>sortable</InlineCode> to enable drag-and-drop reordering.
			The <InlineCode>value</InlineCode> binding stays in sync with the displayed order.
		</DocText>
		<ShowExample component={Example5} code={example5}/>
	</div>

	<div>
		<DocSubtitle>Custom Chip & Option</DocSubtitle>
		<DocText>
			Use the <InlineCode>chip</InlineCode> snippet for custom tag rendering and
			<InlineCode>option</InlineCode> for custom dropdown items.
		</DocText>
		<ShowExample component={Example6} code={example6}/>
	</div>
</div>
