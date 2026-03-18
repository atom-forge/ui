<script lang="ts">
	import { Kbd } from '$lib';
</script>

<div class="flex flex-col gap-6">
	<div>
		<p class="text-xs text-muted-contrast mb-3">Single keys</p>
		<div class="flex flex-wrap gap-2 items-center">
			<Kbd keys="Enter"/>
			<Kbd keys="Escape"/>
			<Kbd keys="Tab"/>
			<Kbd keys="Space"/>
			<Kbd keys="⌘"/>
			<Kbd keys="⌥"/>
			<Kbd keys="⇧"/>
			<Kbd keys="⌫"/>
		</div>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">Key combinations</p>
		<div class="flex flex-wrap gap-4 items-center">
			<Kbd keys={['⌘', 'K']}/>
			<Kbd keys={['⌘', 'S']}/>
			<Kbd keys={['⌘', 'Z']}/>
			<Kbd keys={['⌘', '⇧', 'Z']}/>
			<Kbd keys={['Ctrl', 'Alt', 'Del']}/>
			<Kbd keys={['⌘', '⌥', 'Esc']}/>
		</div>
	</div>
	<div>
		<p class="text-xs text-muted-contrast mb-3">In context</p>
		<div class="flex flex-col gap-2 text-sm text-canvas-contrast">
			<div class="flex items-center justify-between max-w-64 p-2 rounded bg-secondary">
				<span>Save</span>
				<Kbd keys={['⌘', 'S']}/>
			</div>
			<div class="flex items-center justify-between max-w-64 p-2 rounded bg-secondary">
				<span>Open search</span>
				<Kbd keys={['⌘', 'K']}/>
			</div>
			<div class="flex items-center justify-between max-w-64 p-2 rounded bg-secondary">
				<span>Undo</span>
				<Kbd keys={['⌘', 'Z']}/>
			</div>
		</div>
	</div>
</div>
