<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1Raw from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2Raw from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3Raw from "./examples/Example3.svelte?raw";
	import Example4 from "./examples/Example4.svelte";
	import example4Raw from "./examples/Example4.svelte?raw";
		import Example5 from './examples/Example5.svelte';
		import example5Raw from './examples/Example5.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Icon', name: 'icon', type: 'IconDefinition', description: 'The icon — either a component directly (e.g. <code>IconUser</code>) or a <code>defineIcon()</code> instance.' },
		{ group: 'Icon', name: 'size', type: 'number | `${number}`', description: 'Abstract size unit (× 4 px). Mutually exclusive with <code>pxSize</code>. Defaults to 20 px when neither is set.' },
		{ group: 'Icon', name: 'pxSize', type: 'number | `${number}`', description: 'Pixel size. Mutually exclusive with <code>size</code>.' },
		{ group: 'Icon', name: 'stroke', type: 'number | `${number}`', description: 'Numeric stroke scale, default 4. SVG width is 0.5 + (stroke - 1) × 0.25; 1 maps to 0.5px and 7 to 2px. No enforced 1–7 or 1–12 range. Ignored when using defineIcon, which supplies its own stroke.' },
		{ group: 'Icon', name: 'class', type: 'string', description: 'Extra CSS classes, merged with any classes attached via <code>.class()</code> on the definition.' },

		{ group: 'defineIcon(icon, stroke)', name: 'icon', type: 'IconDefinition', description: 'The icon component from Lucide OR an existing IconDefinition to wrap.' },
		{ group: 'defineIcon(icon, stroke)', name: 'stroke', type: 'number', default: '4', description: 'Initial stroke scale. Uses the same SVG width formula as Icon; not an enum or a clamped range.' },
		{ group: 'defineIcon(icon, stroke)', name: '.class(cls)', type: 'IconDefiner', description: 'Chainable method to attach CSS classes to the definition. Definition classes override conflicting classes set at the usage site.' },
		{ group: 'svgIcon(source)', name: 'source', type: 'string | URL', description: 'An SVG markup string creates InlineSvgIcon; a URL object creates SvgIcon rendered as an image. Both support .class(); only the inline form supports .color(cssColor).' },
				{ group: 'defineIcon(icon, stroke)', name: '.setStroke(val)', type: 'IconDefiner', description: 'Chainable method to update the stroke weight after initialization.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Icon</ProseTitle>
		<ProseText>
			Renders icon components and SVG definitions, including icons from <a href="https://lucide.dev/" target="_blank" class="text-accent hover:underline">Lucide Icons</a>.
			The system separates icon <em>definition</em> (stroke, classes) from <em>usage</em> (size, extra classes).
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic Usage</ProseTitle>
				<ProseText>Pass an icon component from Lucide directly to the <DocInlineCode>icon</DocInlineCode> prop.</ProseText>
				<DocShowExample component={Example1} code={example1Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Stroke Width</ProseTitle>
				<ProseText>
					Use <DocInlineCode>defineIcon(icon, stroke)</DocInlineCode> or <DocInlineCode>.setStroke()</DocInlineCode> to set stroke in the definition.
					You can also wrap an existing definition to override its stroke or classes.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Styling with Classes</ProseTitle>
				<ProseText>
					Chain <DocInlineCode>.class()</DocInlineCode> on a definition to attach styles. Definition classes override conflicting classes set at the usage site.
				</ProseText>
				<DocShowExample component={Example3} code={example3Raw}/>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Size</ProseTitle>
				<ProseText>
					Use <DocInlineCode>size</DocInlineCode> for abstract units (× 4 px) or <DocInlineCode>pxSize</DocInlineCode> for exact pixels. Size can only be set at the usage site, not inside <DocInlineCode>defineIcon()</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example4} code={example4Raw}/>
	</ProseParagraph>
	<ProseDivider />
	<ProseParagraph>
		<ProseTitle level={3}>Inline SVG and URL icons</ProseTitle>
		<ProseText>Use <DocInlineCode>svgIcon(svgMarkup)</DocInlineCode> for trusted inline SVG, or <DocInlineCode>svgIcon(new URL('https://example.com/icon.svg'))</DocInlineCode> for an image-backed icon. Strings are SVG markup, not URL strings. Inline markup is inserted as HTML without sanitization: never pass untrusted uploads or user input. Use currentColor in the SVG to inherit .class() or .color() styling.</ProseText>
		<DocShowExample component={Example5} code={example5Raw}/>
	</ProseParagraph>
</ProsePage>
