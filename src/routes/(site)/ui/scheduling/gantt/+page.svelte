<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

	import Example1 from './examples/Example1.svelte';
	import example1Raw from './examples/Example1.svelte?raw';
	import Example2 from './examples/Example2.svelte';
	import example2Raw from './examples/Example2.svelte?raw';

	const props: PropDef[] = [
		{ group: 'Props', name: 'tasks',      type: 'GanttTypes.GanttTask[]',              default: '[]',       description: 'Initial task tree, captured at mount. Capture edits with <code>onchange</code>; <code>bind:tasks</code> does not receive internal updates in this release. Each task can have <code>children</code> for grouping and <code>dependencies</code> (array of task ids) for dependency arrows.' },
		{ group: 'Props', name: 'viewOnly',   type: 'boolean',                  default: 'false',    description: 'Disables all editing — drag, resize, add, delete.' },
		{ group: 'Props', name: 'workdays',   type: 'string',                   default: "'12345'",  description: 'String of weekday numbers (1=Mon … 7=Sun) considered working days. Weekend days are shaded.' },
		{ group: 'Props', name: 'extraRest',  type: 'string[]',                 default: '[]',       description: 'Recurring rest dates in <code>MM.DD</code> format (e.g. <code>12.25</code>), as expected by the installed timeline utility. Captured at mount.' },
		{ group: 'Props', name: 'extraWork',  type: 'string[]',                 default: '[]',       description: 'Recurring <code>MM.DD</code> dates that override rest days and are treated as working days. Captured at mount.' },
		{ group: 'Props', name: 'onchange',   type: '(tasks: GanttTypes.GanttTask[]) => void',                  description: 'Called whenever the task tree changes (drag, resize, add, delete).' },
		{ group: 'Props', name: 'class',      type: 'string',                                        description: 'Extra CSS classes on the root element. Set a fixed height (e.g. <code>h-full</code>) so the chart fills its container.' },
	];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Gantt Chart</ProseTitle>
		<ProseText>
			An interactive Gantt chart with a resizable task tree on the left and a scrollable timeline on the right.
			Supports nested tasks, drag-to-move, drag-to-resize, dependency arrows, zoom levels, and undo/redo.
		</ProseText>

		<DocApiBlock title="API">
			<DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Interactive</ProseTitle>
				<ProseText>
					Use <DocInlineCode>onchange</DocInlineCode> to retain the updated task tree in parent state. Drag task bars to move them, drag their edges to resize. Click <DocInlineCode>+</DocInlineCode> on a task to add a child.
					Use the toolbar to zoom, navigate to today, undo/redo, or export/import JSON.
					Dependency arrows are drawn automatically between tasks listed in <DocInlineCode>dependencies</DocInlineCode>.
				</ProseText>
				<DocShowExample component={Example1} code={example1Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>View-only</ProseTitle>
				<ProseText>
					Pass <DocInlineCode>viewOnly</DocInlineCode> to disable all editing interactions. Useful for read-only dashboards or embedded previews.
				</ProseText>
				<DocShowExample component={Example2} code={example2Raw} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Data model</ProseTitle>
				<ProseText>
					<DocInlineCode>GanttTypes.GanttTask</DocInlineCode> fields: <DocInlineCode>id</DocInlineCode>, <DocInlineCode>label</DocInlineCode>,
					<DocInlineCode>startDate</DocInlineCode> / <DocInlineCode>endDate</DocInlineCode> (<code>YYYY-MM-DD</code>),
					optional <DocInlineCode>progress</DocInlineCode> (0–100), <DocInlineCode>color</DocInlineCode> (CSS color string),
					<DocInlineCode>children</DocInlineCode> (nested tasks), and <DocInlineCode>dependencies</DocInlineCode> (array of task ids).
				</ProseText>
	</ProseParagraph>
</ProsePage>
