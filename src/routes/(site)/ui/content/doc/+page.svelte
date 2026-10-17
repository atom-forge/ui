<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';

	const apiTableProps: PropDef[] = [
		{ group: 'Props', name: 'props', type: 'PropDef[]', description: 'Array of property definitions to render as rows.' },
		{ group: 'PropDef', name: 'name',        type: 'string', description: 'Property name shown in the Prop column.' },
		{ group: 'PropDef', name: 'type',        type: 'string', description: 'TypeScript type shown in the Type column.' },
		{ group: 'PropDef', name: 'default',     type: 'string', description: 'Default value. Shown as — if omitted.' },
		{ group: 'PropDef', name: 'description', type: 'string', description: 'Prose description. Wrap words in <code>&lt;code&gt;…&lt;/code&gt;</code> for inline code formatting.' },
		{ group: 'PropDef', name: 'group',       type: 'string', description: 'Section label. Rows with the same group are grouped under a shared header row.' },
	];

	const apiBlockProps: PropDef[] = [
		{ group: 'Props', name: 'title',    type: 'string',  description: 'Accordion header label.' },
		{ group: 'Props', name: 'class',    type: 'string',  description: 'Extra CSS classes forwarded to the Accordion wrapper.' },
		{ group: 'Props', name: 'children', type: 'Snippet', description: 'Content rendered inside the accordion, typically a <code>DocApiTable</code>.' },
	];

	const showCodeProps: PropDef[] = [
		{ group: 'Props', name: 'code',     type: 'string | CodeFile[]', description: 'A single code string or an array of <code>CodeFile</code> objects for multi-tab display.' },
		{ group: 'Props', name: 'file',     type: 'string',              description: 'Filename label shown above the code block (single-file mode).' },
		{ group: 'Props', name: 'title',    type: 'string',              description: 'If provided, wraps the block in a collapsible with this label.' },
		{ group: 'Props', name: 'open',     type: 'boolean', default: 'true', description: 'Initial open state when <code>title</code> is set.' },
		{ group: 'Props', name: 'class',    type: 'string',              description: 'Extra CSS classes on the root container.' },
		{ group: 'CodeFile', name: 'name',     type: 'string', description: 'Tab label and filename.' },
		{ group: 'CodeFile', name: 'language', type: 'string', description: 'Optional syntax highlight language key, e.g. <code>typescript</code>, <code>svelte</code>, <code>python</code>.' },
		{ group: 'CodeFile', name: 'code',     type: 'string', description: 'Source code string.' },
	];

	const showExampleProps: PropDef[] = [
		{ group: 'Props', name: 'component', type: 'Component', description: 'Optional Svelte component to render in the preview card. Rendered without props; omit for code-only display.' },
		{ group: 'Props', name: 'code',      type: 'string | CodeFile[]', description: 'Source code shown in the collapsible Show Code section.' },
		{ group: 'Props', name: 'class',     type: 'string',   description: 'Extra CSS classes on the preview card.' },
	];

	const inlineCodeProps: PropDef[] = [
		{ group: 'Props', name: 'class',    type: 'string', description: 'Extra CSS classes forwarded to the <code>&lt;code&gt;</code> element.' },
		{ group: 'Props', name: 'children', type: 'Snippet', description: 'Text content rendered inside the code tag.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Doc Components</ProseTitle>
		<ProseText>
			Low-level building blocks for documentation pages. These are the same components used throughout
			this site to render API tables, code blocks, and interactive examples.
		</ProseText>

		<div class="mt-8 space-y-12">

			<div>
				<ProseTitle level={2}>DocInlineCode</ProseTitle>
				<ProseText>
					Renders a styled inline <DocInlineCode>&lt;code&gt;</DocInlineCode> element.
					Accepts all standard HTML attributes and an optional <DocInlineCode>class</DocInlineCode> override.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={inlineCodeProps} />
				</DocApiBlock>
				<DocShowExample component={Example1} code={example1Raw} />
			</div>

			<div>
				<ProseTitle level={2}>DocApiTable</ProseTitle>
				<ProseText>
					Renders a <DocInlineCode>PropDef[]</DocInlineCode> array as a structured API reference table.
					Rows with the same <DocInlineCode>group</DocInlineCode> value are collected under a shared section header.
					Use <DocInlineCode>&lt;code&gt;…&lt;/code&gt;</DocInlineCode> tags inside <DocInlineCode>description</DocInlineCode>
					to render inline code fragments.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={apiTableProps} />
				</DocApiBlock>
			</div>

			<div>
				<ProseTitle level={2}>DocApiBlock</ProseTitle>
				<ProseText>
					A collapsible accordion wrapper for API tables. Pass the <DocInlineCode>title</DocInlineCode>
					prop as the accordion header and place a <DocInlineCode>DocApiTable</DocInlineCode> as children.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={apiBlockProps} />
				</DocApiBlock>
			</div>

			<div>
				<ProseTitle level={2}>DocShowCode</ProseTitle>
				<ProseText>
					Syntax-highlighted code block with support for single-file and multi-file (tabbed) display.
					Wrap in a collapsible by setting <DocInlineCode>title</DocInlineCode>.
					Languages supported: TypeScript, JavaScript, Svelte, Python, CSS, JSON, SQL, Go, Rust, and more.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={showCodeProps} />
				</DocApiBlock>
				<DocShowExample component={Example2} code={example2Raw} />
			</div>

			<div>
				<ProseTitle level={2}>DocShowExample</ProseTitle>
				<ProseText>
					Component preview card with a collapsible Show Code section.
					Pass a Svelte component via <DocInlineCode>component</DocInlineCode> — it is rendered without
					props so the component must be self-contained. Import the source file with <DocInlineCode>?raw</DocInlineCode>
					and pass it as <DocInlineCode>code</DocInlineCode>.
				</ProseText>
				<DocApiBlock title="API">
					<DocApiTable props={showExampleProps} />
				</DocApiBlock>
			</div>

		</div>
	</ProseParagraph>
</ProsePage>
