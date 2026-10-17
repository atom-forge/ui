<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';
		import Example3 from './examples/Example3.svelte';
		import example3Raw from './examples/Example3.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props', name: 'resources',   type: 'ResourceManagerTypes.RMResource[]',                  default: '[]',    description: 'List of resources (people). Each has an <code>id</code>, <code>name</code>, optional <code>role</code> and <code>avatar</code> URL.' },
		{ group: 'Props', name: 'projects',    type: 'ResourceManagerTypes.RMProject[]',                   default: '[]',    description: 'List of projects. Each has an <code>id</code>, <code>name</code>, and optional <code>color</code>.' },
		{ group: 'Props', name: 'allocations', type: 'ResourceManagerTypes.RMAllocation[]',                default: '[]',    description: 'Initial allocations — each links a resource to a project over a date range. Not bindable; capture edits with <code>onchange</code>. External allocation replacements are not synchronized after mount.' },
		{ group: 'Props', name: 'viewOnly',    type: 'boolean',                       default: 'false', description: 'Disables drag-to-create, drag-to-move, and drag-to-resize.' },
		{ group: 'Props', name: 'workdays',    type: 'string',                        default: "'12345'", description: 'Working weekdays (1=Mon … 7=Sun). Non-working days are shaded.' },
		{ group: 'Props', name: 'extraRest',   type: 'string[]',                      default: '[]',    description: 'Recurring rest dates (<code>MM.DD</code>, e.g. <code>12.25</code>) such as public holidays. Captured at mount.' },
		{ group: 'Props', name: 'extraWork',   type: 'string[]',                      default: '[]',    description: 'Recurring <code>MM.DD</code> dates that override rest days and are treated as working days. Captured at mount.' },
		{ group: 'Props', name: 'rangeStart',  type: 'string',                                          description: 'Timeline start date (<code>YYYY-MM-DD</code>). Defaults to 7 days before today.' },
		{ group: 'Props', name: 'rangeEnd',    type: 'string',                                          description: 'Timeline end date (<code>YYYY-MM-DD</code>). Defaults to 30 days after start.' },
		{ group: 'Props', name: 'onchange',    type: '(allocations: ResourceManagerTypes.RMAllocation[]) => void',           description: 'Called whenever allocations change.' },
		{ group: 'Props', name: 'class',       type: 'string',                                          description: 'Extra CSS classes on the root element. Set a fixed height so the timeline fills its container.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Resource Manager</ProseTitle>
		<ProseText>
			A timeline-based resource allocation view. Resources are listed on the left; allocations are shown as colored bars on a scrollable timeline.
			Drag to create new allocations, drag bars to move or resize them. Switch active project from the toolbar to assign new allocations to it.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Interactive</ProseTitle>
				<ProseText>
					Select a project in the toolbar, then drag on an empty row to create an allocation.
					Drag an existing bar to move it, drag its edges to resize. Use zoom and navigation controls to adjust the visible range.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>View-only</ProseTitle>
				<ProseText>
					Pass <DocInlineCode>viewOnly</DocInlineCode> to render a read-only timeline — no allocation editing; zoom and timeline navigation remain available.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Resource allocation grid</ProseTitle>
		<ProseText>
			For a fixed day-by-resource grid, compose the exported Organizer with ResourceManagerTypes.RMAllocation data.
			There is no separate ResourceManagerGrid export in 0.0.34. Each allocation maps to x = start-day offset,
			y = resource index, w = inclusive day count, and h = 1. The function binding converts drag and resize updates
			back to resource IDs and date ranges. Axis marks expose index and subdivision metadata for headers and cells.
		</ProseText>
		<DocShowExample component={Example3} code={example3Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Data model</ProseTitle>
				<ProseText>
					<DocInlineCode>ResourceManagerTypes.RMAllocation</DocInlineCode> links a <DocInlineCode>resourceId</DocInlineCode> to a <DocInlineCode>projectId</DocInlineCode>
					over a <DocInlineCode>startDate</DocInlineCode> / <DocInlineCode>endDate</DocInlineCode> range (<code>YYYY-MM-DD</code>).
					Multiple allocations on the same resource are automatically stacked into lanes when they overlap.
				</ProseText>
	</ProseParagraph>
</ProsePage>
