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

	const fieldProps: PropDef[] = [
		{ group: 'Content', name: 'label', type: 'string', description: 'Label text above (or beside) the control.' },
		{ group: 'Content', name: 'hint', type: 'string', description: 'Helper text shown below the control.' },
		{ group: 'Content', name: 'error', type: 'string', description: 'Error message shown below the control. Takes precedence over <code>hint</code>.' },
		{ group: 'Content', name: 'required', type: 'boolean', default: 'false', description: 'Appends a red <code>*</code> to the label.' },
		{ group: 'Content', name: 'optional', type: 'boolean', default: 'false', description: 'Appends an <code>(optional)</code> badge to the label.' },
		{ group: 'Layout', name: 'layout', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Vertical stacks label above the control. Horizontal is designed for use inside <code>FieldGroup</code>.' },
		{ group: 'Snippets', name: 'labelSnippet', type: 'Snippet', description: 'Overrides the <code>label</code> prop. Use for rich label content.' },
		{ group: 'Snippets', name: 'hintSnippet', type: 'Snippet', description: 'Overrides the <code>hint</code> prop.' },
		{ group: 'Snippets', name: 'errorSnippet', type: 'Snippet', description: 'Overrides the <code>error</code> prop.' },
		{ group: 'Snippets', name: 'action', type: 'Snippet', description: 'Rendered on the right side of the label row (e.g. a "Forgot?" link).' },
	];

	const groupProps: PropDef[] = [
		{ name: 'labelWidth', type: 'string', default: "'auto'", description: 'Width of the label column. Accepts any CSS value e.g. <code>"150px"</code>, <code>"30%"</code>. Defaults to <code>max-content</code>.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the grid container.' },
	];
</script>

<DocTitle>Field</DocTitle>
<DocText>
	A wrapper that pairs a form control with a label, hint, and error message.
	Use <InlineCode>FieldGroup</InlineCode> to align multiple horizontal fields into a two-column grid,
	and <InlineCode>FieldSpan</InlineCode> to let any element break out of the grid and span the full width.
</DocText>

<ApiBlock title="Field props">
	<ApiTable props={fieldProps}/>
</ApiBlock>

<ApiBlock title="FieldGroup props">
	<ApiTable props={groupProps}/>
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic (Vertical)</DocSubtitle>
		<DocText>
			Wrap any control with <InlineCode>Field</InlineCode> and provide a <InlineCode>label</InlineCode>.
			Use <InlineCode>hint</InlineCode> for helper text, <InlineCode>error</InlineCode> for validation messages,
			<InlineCode>required</InlineCode> or <InlineCode>optional</InlineCode> to annotate the label.
		</DocText>
		<ShowExample component={Example1} code={example1Raw}/>
	</div>
	<div>
		<DocSubtitle>Horizontal layout with FieldGroup</DocSubtitle>
		<DocText>
			Set <InlineCode>layout="horizontal"</InlineCode> and wrap fields in a <InlineCode>FieldGroup</InlineCode> to get a
			two-column grid with aligned labels. Use <InlineCode>FieldSpan</InlineCode> to make any element span both columns.
		</DocText>
		<ShowExample component={Example2} code={example2Raw}/>
	</div>
	<div>
		<DocSubtitle>Snippet overrides</DocSubtitle>
		<DocText>
			Replace <InlineCode>label</InlineCode>, <InlineCode>hint</InlineCode>, <InlineCode>error</InlineCode> with snippets for rich content.
			Use the <InlineCode>action</InlineCode> snippet for a right-aligned element in the label row.
		</DocText>
		<ShowExample component={Example3} code={example3Raw}/>
	</div>
</div>

