<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from "./examples/Example1.svelte";
	import example1 from "./examples/Example1.svelte?raw";
	import Example2 from "./examples/Example2.svelte";
	import example2 from "./examples/Example2.svelte?raw";
	import Example3 from "./examples/Example3.svelte";
	import example3 from "./examples/Example3.svelte?raw";
	import Example4 from "./examples/Example4.svelte";
	import example4 from "./examples/Example4.svelte?raw";

	const props: PropDef[] = [
		{ group: 'Stepper', name: 'steps', type: 'Step[]', default: '[]', description: 'Ordered list of steps. Each step has an <code>id</code>, a <code>label</code>, and an optional <code>description</code>.' },
		{ group: 'Stepper', name: 'current', type: 'string', description: 'ID of the currently active step. Bindable.' },
		{ group: 'Stepper', name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction of the step list.' },
		{ group: 'Stepper', name: 'readonly', type: 'boolean', default: 'true', description: 'When <code>false</code>, completed steps are clickable and allow navigating back.' },
		{ group: 'Stepper', name: 'compact', type: 'boolean', default: 'false', description: 'Reduces icon and text size. Hides step descriptions.' },
		{ group: 'Stepper', name: 'class', type: 'string', description: 'Additional CSS classes applied to the root element.' },
		{ group: 'Step', name: 'id', type: 'string', description: 'Unique identifier for the step.' },
		{ group: 'Step', name: 'label', type: 'string', description: 'Display name shown below or next to the step icon.' },
		{ group: 'Step', name: 'description', type: 'string', description: 'Optional subtitle. Hidden in compact mode.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Stepper</ProseTitle>
		<ProseText>
			A progress indicator that shows where the user is in a multi-step flow. Each step is either <em>completed</em>, <em>current</em>, or <em>upcoming</em>, derived from the <DocInlineCode>current</DocInlineCode> binding.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Horizontal</ProseTitle>
		<ProseText>The default orientation. Steps are laid out in a row with connector lines between them.</ProseText>
		<DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Vertical</ProseTitle>
		<ProseText>Use <DocInlineCode>orientation="vertical"</DocInlineCode> for sidebar or form-wizard layouts.</ProseText>
		<DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Interactive Navigation</ProseTitle>
		<ProseText>Set <DocInlineCode>readonly={'{false}'}</DocInlineCode> to allow clicking completed steps to go back. Combine with Next/Back buttons to build a full wizard.</ProseText>
		<DocShowExample component={Example3} code={example3} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Compact</ProseTitle>
		<ProseText>The <DocInlineCode>compact</DocInlineCode> prop reduces the icon size and hides descriptions — useful in tight layouts.</ProseText>
		<DocShowExample component={Example4} code={example4} />
	</ProseParagraph>
</ProsePage>
