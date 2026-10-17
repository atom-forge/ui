<script lang="ts">
	import { DocShowCode } from '@atom-forge/ui';

	const singleFile = `import type { CalendarTypes } from '@atom-forge/ui';

type MyEvent = CalendarTypes.CalendarEvent & { notes: string };`;

	const multiFile = [
		{
			name: 'component.svelte',
			language: 'svelte',
			code: `<script lang="ts">
  import { Calendar } from '@atom-forge/ui';
  import type { CalendarTypes } from '@atom-forge/ui';

  let events = $state<CalendarTypes.CalendarEvent[]>([]);

  function onEventMove(id: string, startDate: string, endDate: string) {
    events = events.map(event => event.id === id ? { ...event, startDate, endDate } : event);
  }
<\/script>
<Calendar {events} {onEventMove} onEventResize={onEventMove} />`,
		},
		{
			name: 'types.ts',
			language: 'typescript',
			code: `import type { CalendarTypes } from '@atom-forge/ui';

export type MyEvent = CalendarTypes.CalendarEvent & { notes: string };`,
		},
	];
</script>

<div class="space-y-4">
	<DocShowCode code={singleFile} file="example.ts" />
	<DocShowCode code={multiFile} title="Multi-file example" />
</div>
