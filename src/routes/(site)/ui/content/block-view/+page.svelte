<script lang="ts">
	import { DocApiBlock, DocApiTable, DocShowExample, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';
	import Example from './examples/Example.svelte';
	import code from './examples/Example.svelte?raw';

	const props: PropDef[] = [
		{ name: 'blocks', type: 'Block[]', description: 'Required block array. Empty arrays show Nothing to preview yet.' },
		{ name: 'previewComponents', type: 'Record<string, Component<any>>', description: 'Required renderer map. Each renderer receives data, not an editor id. Start with the exported defaultPreviewComponents and extend for custom types. Unknown types show a fallback message.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Block View</ProseTitle>
		<ProseText>Render a block document without editor controls. BlockView wraps the content in a scrollable card; defaultPreviewComponents provides renderers for the built-in block types. Only render trusted content: Markdown, diagram SVG, and code preview renderers are not a sanitization boundary.</ProseText>
		<DocApiBlock title="API"><DocApiTable {props} /></DocApiBlock>
	</ProseParagraph>
	<ProseParagraph><DocShowExample component={Example} {code} /></ProseParagraph>
</ProsePage>
