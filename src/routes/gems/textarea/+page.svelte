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
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3Raw from './examples/Example3.svelte?raw';
	import Example4 from './examples/Example4.svelte';
	import example4Raw from './examples/Example4.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Core',        name: 'value',       type: 'string',    default: "''",     description: 'Bindable text content.' },
		{ group: 'Core',        name: 'dirty',       type: 'boolean',   default: 'false',  description: 'Bindable. <code>true</code> if the value has changed from the initial value.' },
		{ group: 'Core',        name: 'placeholder', type: 'string',    default: '—',      description: 'Placeholder text.' },
		{ group: 'Core',        name: 'disabled',    type: 'boolean',   default: 'false',  description: 'Disables the textarea.' },
		{ group: 'Core',        name: 'invalid',     type: 'boolean',   default: 'false',  description: 'Shows a red destructive border.' },
		{ group: 'Sizing',      name: 'rows',        type: 'number',    default: '3',      description: 'Minimum number of visible rows.' },
		{ group: 'Sizing',      name: 'maxRows',     type: 'number',    default: '—',      description: 'Maximum rows the field can grow to with autogrow.' },
		{ group: 'Sizing',      name: 'resizable',   type: 'boolean',   default: 'false',  description: 'Enables the native resize handle.' },
		{ group: 'Sizing',      name: 'compact',     type: 'boolean',   default: '—',      description: 'Compact size. Mutually exclusive with <code>small</code>.' },
		{ group: 'Sizing',      name: 'small',       type: 'boolean',   default: '—',      description: 'Small size. Mutually exclusive with <code>compact</code>.' },
		{ group: 'Functional',  name: 'maxLength',   type: 'number',    default: '—',      description: 'Maximum number of characters.' },
		{ group: 'Functional',  name: 'showCounter', type: 'boolean',   default: 'false',  description: 'Shows a character counter in the bottom-right corner.' },
		{ group: 'Functional',  name: 'monospace',   type: 'boolean',   default: 'false',  description: 'Uses a monospace font (<code>font-mono</code>).' },
		{ group: 'Functional',  name: 'handleTab',   type: 'boolean',   default: 'false',  description: 'Enables smart Tab / Shift+Tab indent handling.' },
		{ group: 'Functional',  name: 'tabSize',     type: 'number',    default: '2',      description: 'Indent size in spaces. <code>0</code> inserts a literal tab character.' },
		{ group: 'Snippets',    name: 'toolbar',     type: 'Snippet',   default: '—',      description: 'Rendered above the textarea in a toolbar strip.' },
		{ group: 'Snippets',    name: 'adornment',   type: 'Snippet',   default: '—',      description: 'Rendered in the bottom-right corner inside the field. Overrides <code>showCounter</code>.' },
		{ group: 'Snippets',    name: 'counter',     type: 'Snippet<[{count, max, words, letters}]>', default: '—', description: 'Custom counter snippet. Receives <code>count</code>, <code>max</code>, <code>words</code>, <code>letters</code>.' },
	];
</script>

<DocTitle>Textarea</DocTitle>
<DocText>
	A multi-line text input that matches the visual style of <InlineCode>Input</InlineCode>. Features autogrow,
	character counter, dirty tracking, smart Tab indentation, and a programmatic API for text manipulation via <InlineCode>bind:this</InlineCode>.
</DocText>

<ApiBlock title="API">
	<ApiTable {props}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic & Autogrow</DocSubtitle>
		<DocText>
			Bind <InlineCode>value</InlineCode>. The field grows automatically as content fills it.
			Use <InlineCode>maxRows</InlineCode> to cap the growth and <InlineCode>showCounter</InlineCode> + <InlineCode>maxLength</InlineCode> to add a character counter.
		</DocText>
		<ShowExample component={Example1} code={example1Raw}/>
	</div>
	<div>
		<DocSubtitle>Code Editor (monospace + Tab)</DocSubtitle>
		<DocText>
			Enable <InlineCode>monospace</InlineCode> and <InlineCode>handleTab</InlineCode> for a lightweight code editor feel.
			<InlineCode>Tab</InlineCode> indents, <InlineCode>Shift+Tab</InlineCode> outdents — both work on single lines and multi-line selections.
			Bind <InlineCode>dirty</InlineCode> to track unsaved changes.
		</DocText>
		<ShowExample component={Example2} code={example2Raw}/>
	</div>
	<div>
		<DocSubtitle>Toolbar & bind:this API</DocSubtitle>
		<DocText>
			Use the <InlineCode>toolbar</InlineCode> snippet for a button bar above the field.
			Access <InlineCode>wrapSelection()</InlineCode>, <InlineCode>insertAtCursor()</InlineCode>, and <InlineCode>selectAll()</InlineCode> via <InlineCode>bind:this</InlineCode>.
		</DocText>
		<ShowExample component={Example3} code={example3Raw}/>
	</div>
	<div>
		<DocSubtitle>Sizes & States</DocSubtitle>
		<DocText>Three sizes: normal, <InlineCode>compact</InlineCode>, <InlineCode>small</InlineCode>. Plus <InlineCode>invalid</InlineCode> and <InlineCode>disabled</InlineCode> states.</DocText>
		<ShowExample component={Example4} code={example4Raw}/>
	</div>
</div>

