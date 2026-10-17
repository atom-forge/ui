<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props',   name: 'value',     type: 'DiagramEditorTypes.DiagramData',              default: "diagramEditor.makeDefaultDiagramData()", description: 'Externally synchronized diagram state. Although declared bindable, saves emit through <code>onchange</code> rather than assigning <code>value</code>. <code>xml</code> is the editable draw.io source; <code>svg</code> is the preview.' },
		{ group: 'Props',   name: 'onchange',  type: '(v: DiagramEditorTypes.DiagramData) => void',                description: 'Called after a save in the editor, with the updated <code>xml</code> and <code>svg</code>.' },
		{ group: 'Props',   name: 'class',     type: 'string',                                                    description: 'Extra CSS classes forwarded to the root container.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Diagram Editor</ProseTitle>
		<ProseText>
			An embeddable <a href="https://www.drawio.com" target="_blank" rel="noopener" class="text-accent underline">draw.io</a> diagram editor.
			Opens in a full-screen overlay, persists both the editable XML source and a rendered SVG preview.
			The diagram can be re-opened and edited at any time — the previous state is restored automatically.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
				<ProseText>
					Click <DocInlineCode>Create diagram</DocInlineCode> to open the editor.
					After saving, the SVG preview is shown inline. Hover the preview and click <DocInlineCode>Edit</DocInlineCode> to re-open and continue editing.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Controlled with onchange</ProseTitle>
				<ProseText>
					Use <DocInlineCode>onchange</DocInlineCode> to react to saves. Both <DocInlineCode>xml</DocInlineCode> and <DocInlineCode>svg</DocInlineCode>
					are available in the callback — persist whichever you need to your backend.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Data model</ProseTitle>
				<ProseText>
					<DocInlineCode>DiagramEditorTypes.DiagramData</DocInlineCode> includes
					<DocInlineCode>xml</DocInlineCode> — the draw.io graph XML, which is the source of truth for re-editing —
					and <DocInlineCode>svg</DocInlineCode> — the exported SVG string used for the inline preview.
					Persist both together with the required <DocInlineCode>scheme</DocInlineCode> (<code>light</code> or <code>dark</code>). Optional <DocInlineCode>caption</DocInlineCode> and <DocInlineCode>description</DocInlineCode> hold metadata. If only <DocInlineCode>svg</DocInlineCode> is stored, the diagram cannot be edited again.
				</ProseText>
	</ProseParagraph>
</ProsePage>
