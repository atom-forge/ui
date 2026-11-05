<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3Raw from './examples/Example3.svelte?raw';

	const fieldProps: PropDef[] = [
		{ group: 'Content', name: 'label', type: 'string', description: 'Label text above (or beside) the control.' },
		{ group: 'Content', name: 'info', type: 'string', description: 'Small right-aligned text in the label row.' },
				{ group: 'Content', name: 'for', type: 'string', description: 'Explicit label target. Omit it to let Field bind the label to its first control automatically.' },
				{ group: 'Content', name: 'children', type: 'Snippet', description: 'Required control content.' },
				{ group: 'Styling', name: 'class', type: 'string', description: 'Vertical wrapper classes, or horizontal label-cell classes.' },
				{ group: 'Content', name: 'hint', type: 'string', description: 'Helper text shown below the control, connected to it with <code>aria-describedby</code>.' },
		{ group: 'Content', name: 'error', type: 'string', description: 'Error message shown below the control. Takes precedence over <code>hint</code>. Connected to the control with <code>aria-describedby</code> and sets <code>aria-invalid</code>.' },
		{ group: 'Content', name: 'required', type: 'boolean', default: 'false', description: 'Appends a red <code>*</code> to the label.' },
		{ group: 'Content', name: 'optional', type: 'boolean', default: 'false', description: 'Appends an <code>(optional)</code> badge to the label.' },
		{ group: 'Layout', name: 'layout', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Vertical stacks label above the control. Horizontal is designed for use inside <code>FieldGroup</code>.' },
		{ group: 'Snippets', name: 'labelSnippet', type: 'Snippet', description: 'Overrides the <code>label</code> prop. Use for rich label content.' },
		{ group: 'Snippets', name: 'hintSnippet', type: 'Snippet', description: 'Overrides the <code>hint</code> prop.' },
		{ group: 'Snippets', name: 'errorSnippet', type: 'Snippet', description: 'Overrides the <code>error</code> prop.' },
		{ group: 'Snippets', name: 'action', type: 'Snippet', description: 'Rendered on the right side of the label row (e.g. a "Forgot?" link).' },
	];

	const groupProps: PropDef[] = [
		{ name: 'children', type: 'Snippet', description: 'Required field content. FieldSpan accepts children and class and spans both columns.' },
				{ name: 'labelWidth', type: 'string', default: "'auto'", description: 'Width of the label column. Accepts any CSS value e.g. <code>"150px"</code>, <code>"30%"</code>. Defaults to <code>max-content</code>.' },
		{ name: 'class', type: 'string', description: 'Extra Tailwind classes on the grid container.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Field</ProseTitle>
		<ProseText>
			A wrapper that pairs a form control with a label, hint, and error message.
			Use <DocInlineCode>FieldGroup</DocInlineCode> to align multiple horizontal fields into a two-column grid,
			and <DocInlineCode>FieldSpan</DocInlineCode> to let any element break out of the grid and span the full width.
		</ProseText>

		<DocApiBlock title="Field props">
			<DocApiTable props={fieldProps}/>
		</DocApiBlock>

		<DocApiBlock title="FieldGroup props">
			<DocApiTable props={groupProps}/>
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic (Vertical)</ProseTitle>
				<ProseText>
					Wrap any control with <DocInlineCode>Field</DocInlineCode> and provide a <DocInlineCode>label</DocInlineCode>.
					Use <DocInlineCode>hint</DocInlineCode> for helper text, <DocInlineCode>error</DocInlineCode> for validation messages,
					<DocInlineCode>required</DocInlineCode> or <DocInlineCode>optional</DocInlineCode> to annotate the label; these do not validate or mark the child control required. The label, hint and error are bound to the first control inside the Field automatically (label as the control's name, hint/error via <DocInlineCode>aria-describedby</DocInlineCode>, error also as <DocInlineCode>aria-invalid</DocInlineCode>); set <DocInlineCode>for</DocInlineCode> only to wire a specific id yourself.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Horizontal layout with FieldGroup</ProseTitle>
				<ProseText>
					Set <DocInlineCode>layout="horizontal"</DocInlineCode> and wrap fields in a <DocInlineCode>FieldGroup</DocInlineCode> to get a
					two-column grid with aligned labels. Use <DocInlineCode>FieldSpan</DocInlineCode> to make any element span both columns.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Snippet overrides</ProseTitle>
				<ProseText>
					Replace <DocInlineCode>label</DocInlineCode>, <DocInlineCode>hint</DocInlineCode>, <DocInlineCode>error</DocInlineCode> with snippets for rich content.
					Use the <DocInlineCode>action</DocInlineCode> snippet for a right-aligned element in the label row.
				</ProseText>
				<DocShowExample component={Example3} code={example3Raw}/>
	</ProseParagraph>
</ProsePage>
