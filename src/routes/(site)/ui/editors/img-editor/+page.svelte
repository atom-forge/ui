<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
	import Example3 from './examples/Example3.svelte';
	import example3Raw from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props',   name: 'src',          type: 'string',                  description: 'Image URL to load and edit. Remount with a keyed block when switching images to reset the edit chain and annotations.' },
		{ group: 'Props',   name: 'value',         type: 'ImgEditorTypes.ImgEditorData',             description: 'Initial state (edit chain, focal point, safe area). Defaults to empty steps and centered annotations.' },
		{ group: 'Props',   name: 'onchange',      type: '(v: ImgEditorTypes.ImgEditorData) => void',description: 'Called on every committed change — after Apply, Undo, reset, or annotation drag.' },
		{ group: 'Props', name: 'height', type: 'string', default: "'640px'", description: 'CSS height of the editor, including its toolbar and panels.' },
		{ group: 'Features',name: 'orientation',   type: 'boolean',  default: 'true',  description: 'Show the Orientation toolbar button (rotate ±90°, flip H/V).' },
		{ group: 'Features',name: 'leveling',      type: 'boolean',  default: 'true',  description: 'Show the Leveling toolbar button (fine rotation with inscribed crop).' },
		{ group: 'Features',name: 'cropping',      type: 'boolean',  default: 'true',  description: 'Show the Crop toolbar button (freeform and aspect-ratio crop).' },
		{ group: 'Features',name: 'focus',         type: 'boolean',  default: 'true',  description: 'Show the focal point crosshair, safe area overlay, and smart-crop preview.' },
		{ group: 'Types',   name: 'ImgEditorData',   type: '{ src: string; steps: EditStep[]; focalPoint: NormalizedPoint; safeArea: NormalizedRect }', description: 'Full editor state returned by onchange and accepted as value.' },
		{ group: 'Types',   name: 'EditStep',      type: "{ type: 'rotate'; quarters: 1|2|3 } | { type: 'flip'; axis: 'H'|'V' } | { type: 'level'; deg: number } | { type: 'crop'; x: number; y: number; w: number; h: number }", description: 'One committed transform. The steps array can be replayed with <code>imgEditor.applyChainToBitmap</code> in an environment providing browser bitmap and canvas APIs.' },
		{ group: 'Factory', name: 'imgEditor.makeDefaultImgEditorData(src)', type: 'ImgEditorTypes.ImgEditorData', description: 'Returns a blank ImgEditorData: empty steps, focal point at center, safe area at 25%–75%.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>ImgEditor</ProseTitle>
		<ProseText>
			Non-destructive image editor built on an edit-chain architecture. Each Apply appends an
			<DocInlineCode>EditStep</DocInlineCode> (rotate / flip / level / crop) to a chain that can be
			replayed server-side or undone client-side. The default surface shows the focal point
			and safe area used for smart thumbnail generation.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
				<ProseText>
					Pass a <DocInlineCode>src</DocInlineCode> URL. Use the toolbar to switch between
					Orientation, Leveling, and Crop modes — each has an Apply button that commits
					the change to the edit chain. Undo replays the chain from the original.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Feature toggles</ProseTitle>
				<ProseText>
					Disable individual features with boolean props.
					All default to <DocInlineCode>true</DocInlineCode>.
					Feature flags are captured at mount. The example remounts the editor when they change; disabling a feature hides its controls.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Controlled with data state</ProseTitle>
				<ProseText>
					Pass an initial <DocInlineCode>ImgEditorData</DocInlineCode> via <DocInlineCode>value</DocInlineCode>
					and use <DocInlineCode>onchange</DocInlineCode> to capture every update.
					The output contains the full edit chain and normalized focal point / safe area,
					ready to be persisted or replayed.
				</ProseText>
				<DocShowExample component={Example3} code={example3Raw} />
	</ProseParagraph>
</ProsePage>
