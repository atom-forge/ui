<script lang="ts">
	import ShowExample from "../../../components/doc/ShowExample.svelte";
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import ApiBlock from "../../../components/doc/ApiBlock.svelte";
	import ApiTable from "../../../components/doc/ApiTable.svelte";
	import type { PropDef } from "../../../components/doc/ApiTable.svelte";

	import Example1 from "./examples/Example1.svelte";
	import example1Raw from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2Raw from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3Raw from "./examples/Example3.svelte?raw";
	import Example4 from "./examples/Example4.svelte";
	import example4Raw from "./examples/Example4.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Icon', name: 'icon', type: 'IconDefinition', description: 'The icon — either a component directly (e.g. <code>IconUser</code>) or a <code>defineIcon()</code> instance.' },
		{ group: 'Icon', name: 'size', type: 'number | string', description: 'Abstract size unit (× 4 px). Mutually exclusive with <code>pxSize</code>. Defaults to 20 px when neither is set.' },
		{ group: 'Icon', name: 'pxSize', type: 'number | string', description: 'Pixel size. Mutually exclusive with <code>size</code>.' },
		{ group: 'Icon', name: 'stroke', type: 'number | string', description: 'Stroke weight (1–12). Only applies when passing a component directly — ignored when using <code>defineIcon()</code>.' },
		{ group: 'Icon', name: 'class', type: 'string', description: 'Extra CSS classes, merged with any classes attached via <code>.class()</code> on the definition.' },

		{ group: 'defineIcon(icon, stroke)', name: 'icon', type: 'IconDefinition', description: 'The icon component from Lucide OR an existing IconDefinition to wrap.' },
		{ group: 'defineIcon(icon, stroke)', name: 'stroke', type: '1–12', default: '4', description: 'Initial stroke weight (maps to SVG <code>stroke-width</code>).' },
		{ group: 'defineIcon(icon, stroke)', name: '.class(cls)', type: 'IconDefiner', description: 'Chainable method to attach CSS classes to the definition. Definition classes override conflicting classes set at the usage site.' },
		{ group: 'defineIcon(icon, stroke)', name: '.setStroke(val)', type: 'IconDefiner', description: 'Chainable method to update the stroke weight after initialization.' },
	];
</script>

<DocTitle>Icon</DocTitle>
<DocText>
	Renders icons from <a href="https://lucide.dev/" target="_blank" class="text-accent hover:underline">Lucide Icons</a>.
	The system separates icon <em>definition</em> (stroke, classes) from <em>usage</em> (size, extra classes).
</DocText>

<ApiBlock title="API">
	<ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
	<div>
		<DocSubtitle>Basic Usage</DocSubtitle>
		<DocText>Pass an icon component from Lucide directly to the <InlineCode>icon</InlineCode> prop.</DocText>
		<ShowExample component={Example1} code={example1Raw}/>
	</div>

	<div>
		<DocSubtitle>Stroke Width</DocSubtitle>
		<DocText>
			Use <InlineCode>defineIcon(icon, stroke)</InlineCode> or <InlineCode>.setStroke()</InlineCode> to set stroke in the definition.
			You can also wrap an existing definition to override its stroke or classes.
		</DocText>
		<ShowExample component={Example2} code={example2Raw}/>
	</div>

	<div>
		<DocSubtitle>Styling with Classes</DocSubtitle>
		<DocText>
			Chain <InlineCode>.class()</InlineCode> on a definition to attach styles. Definition classes override conflicting classes set at the usage site.
		</DocText>
		<ShowExample component={Example3} code={example3Raw}/>
	</div>

	<div>
		<DocSubtitle>Size</DocSubtitle>
		<DocText>
			Use <InlineCode>size</InlineCode> for abstract units (× 4 px) or <InlineCode>pxSize</InlineCode> for exact pixels. Size can only be set at the usage site, not inside <InlineCode>defineIcon()</InlineCode>.
		</DocText>
		<ShowExample component={Example4} code={example4Raw}/>
	</div>
</div>
