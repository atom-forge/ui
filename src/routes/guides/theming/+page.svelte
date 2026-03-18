<script lang="ts">
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import ShowCode from "../../../components/doc/ShowCode.svelte";

	const darkToggleCode = `<script lang="ts">
  import { getThemeManager, Switch } from '@atom-forge/core';
  import { Moon, Sun } from 'lucide-svelte';

  const theme = getThemeManager();
<\/script>

<Switch bind:value={theme.dark} icons={{ on: Moon, off: Sun }}/>`;

	const customThemeCode = `/* app.css */
@import '@atom-forge/core/theme.css';

:root {
  /* Brand accent — replaces the default orange */
  --color-accent:   #6366f1;   /* indigo-500  */
  --color-accent-v: #818cf8;   /* indigo-400  */
  --color-accent-m: #e0e7ff;   /* indigo-100  */
  --color-accent-m-v: #c7d2fe; /* indigo-200  */
  --color-accent-c:   #ffffff;
  --color-accent-c-v: #f5f3ff;

  --color-ring: #6366f1;
}

.dark {
  --color-accent:   #818cf8;   /* lighter in dark mode */
  --color-accent-v: #6366f1;
  --color-accent-m: #1e1b4b;
  --color-accent-m-v: #312e81;
  --color-accent-c:   #1e1b4b;
  --color-accent-c-v: #312e81;

  --color-ring: #818cf8;
}`;

	const primaryCustomCode = `/* Change the primary (default button) color */
:root {
  --color-primary:   #1d4ed8;  /* blue-700 */
  --color-primary-v: #1e40af;  /* blue-800 */
  --color-primary-c: #eff6ff;  /* blue-50  */
  --color-primary-c-v: #ffffff;
}

.dark {
  --color-primary:   #3b82f6;  /* blue-500 */
  --color-primary-v: #60a5fa;  /* blue-400 */
  --color-primary-c: #eff6ff;
  --color-primary-c-v: #ffffff;
}`;

	const surfaceCustomCode = `/* Swap the base palette from stone to slate */
:root {
  --color-base:        var(--color-slate-100);
  --color-canvas:      var(--color-white);
  --color-raised:      var(--color-white);
  --color-control:     var(--color-white);
  --color-control-v:   var(--color-slate-50);
  --color-control-m:   var(--color-slate-100);
  --color-control-m-v: var(--color-slate-200);
  --color-control-c:   var(--color-slate-800);
  --color-control-c-v: var(--color-slate-900);
  --color-base-b        var(--color-slate-200);
  --color-canvas-b: var(--color-slate-200);
  --color-raised-b: var(--color-slate-200);
}

.dark {
  --color-base:        var(--color-slate-950);
  --color-canvas:      var(--color-slate-900);
  /* ... */
}`;

	const themeManagerCode = `<script lang="ts">
  import { getThemeManager } from '@atom-forge/core';

  const theme = getThemeManager();

  // Read state
  console.log(theme.dark);   // boolean
  console.log(theme.isNight); // boolean
  console.log(theme.mode);   // 'night' | 'day'

  // Set state
  theme.dark = true;
<\/script>`;
</script>

<DocTitle>Theming</DocTitle>
<DocText>
	AtomForge's theming system is built on CSS custom properties. Every color in every component resolves from a semantic token — never a hardcoded value.
	This means the entire visual appearance of your app can be changed by overriding a handful of CSS variables.
</DocText>

<div class="space-y-10 mt-8">

	<div>
		<DocSubtitle>Dark / light mode</DocSubtitle>
		<DocText>
			The
			<InlineCode>Root</InlineCode>
			wrapper manages dark mode automatically.
			It applies the
			<InlineCode>dark</InlineCode>
			class to
			<InlineCode>document.documentElement</InlineCode>
			,
			persists the preference to
			<InlineCode>localStorage</InlineCode>
			, and falls back to
			<InlineCode>prefers-color-scheme</InlineCode>
			on the first visit.
		</DocText>
		<DocText>
			Toggle it anywhere in your app via
			<InlineCode>getThemeManager()</InlineCode>
			:
		</DocText>
		<ShowCode code={darkToggleCode} class="my-4"/>
		<DocText>
			<InlineCode>theme.dark</InlineCode>
			is a reactive
			<InlineCode>$state</InlineCode>
			value — binding it to a Switch is all you need.
		</DocText>
	</div>

	<div>
		<DocSubtitle>ThemeManager API</DocSubtitle>
		<ShowCode code={themeManagerCode} class="my-4"/>
		<div class="mt-4 grid grid-cols-1 gap-1.5 text-sm">
			{#each [
				{name: 'dark', type: 'boolean', rw: 'read/write', desc: 'Current dark mode state. Setting it updates the class and persists to localStorage.'},
				{name: 'isNight', type: 'boolean', rw: 'read', desc: 'true when dark mode is active.'},
				{name: 'isDay', type: 'boolean', rw: 'read', desc: 'true when light mode is active.'},
				{name: 'mode', type: "'night' | 'day'", rw: 'read', desc: 'Current mode as a string.'},
			] as row}
				<div class="flex items-baseline gap-3 px-3 py-2 rounded-md bg-surface border-frame">
					<InlineCode>{row.name}</InlineCode>
					<span class="text-xs text-accent font-mono">{row.type}</span>
					<span class="text-xs text-muted-contrast ml-auto">{row.rw}</span>
					<span class="text-muted-contrast">{row.desc}</span>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<DocSubtitle>Customising the accent color</DocSubtitle>
		<DocText>
			The default accent is orange. To use your own brand color, override the
			<InlineCode>--color-accent-*</InlineCode>
			variables in your global CSS — both for light mode (
			<InlineCode>:root</InlineCode>
			) and dark mode (
			<InlineCode>.dark</InlineCode>
			).
		</DocText>
		<ShowCode code={customThemeCode} file="app.css" class="my-4"/>
		<DocText>
			You must provide all six suffixes:
			<InlineCode>accent</InlineCode>
			,
			<InlineCode>accent-v</InlineCode>
			,
			<InlineCode>accent-m</InlineCode>
			,
			<InlineCode>accent-m-v</InlineCode>
			,
			<InlineCode>accent-c</InlineCode>
			,
			<InlineCode>accent-c-v</InlineCode>
			.
			The
			<InlineCode>-c</InlineCode>
			variants are contrast text colors — make sure they are readable on top of the background.
		</DocText>
	</div>

	<div>
		<DocSubtitle>Customising the primary color</DocSubtitle>
		<DocText>
			<InlineCode>primary</InlineCode>
			is the default button and high-emphasis foreground color. By default it's a dark neutral (near-black in light mode, near-white in dark mode).
			Override it to make the default button match your brand:
		</DocText>
		<ShowCode code={primaryCustomCode} file="app.css" class="my-4"/>
	</div>

	<div>
		<DocSubtitle>Swapping the base palette</DocSubtitle>
		<DocText>
			Surface and border tokens (
			<InlineCode>base</InlineCode>
			,
			<InlineCode>canvas</InlineCode>
			,
			<InlineCode>raised</InlineCode>
			,
			<InlineCode>control</InlineCode>
			,
			<InlineCode>border</InlineCode>
			) default to the <strong>stone</strong> gray family.
			To switch to another gray (slate, zinc, neutral…), reassign those variables using Tailwind's built-in color variables:
		</DocText>
		<ShowCode code={surfaceCustomCode} file="app.css" class="my-4"/>
		<DocText>
			All Tailwind palette colors are available as
			<InlineCode>var(--color-slate-500)</InlineCode>
			,
			<InlineCode>var(--color-zinc-700)</InlineCode>
			, etc.
		</DocText>
	</div>

	<div>
		<DocSubtitle>Token structure at a glance</DocSubtitle>
		<DocText>
			Every semantic family follows the same six-variable pattern. The full set is defined in
			<InlineCode>theme.css</InlineCode>
			and resolves automatically in both modes.
			See the <a href="/guides/color-system" class="text-accent underline underline-offset-4">Color System</a> guide for the complete token reference and visual examples.
		</DocText>
		<div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm font-mono">
			{#each ['--color-accent', '--color-accent-v', '--color-accent-m', '--color-accent-m-v', '--color-accent-c', '--color-accent-c-v'] as v}
				<div class="px-3 py-2 rounded-md bg-surface border-frame text-canvas-contrast">{v}</div>
			{/each}
		</div>
		<p class="text-sm text-muted-contrast mt-3">Replace
			<InlineCode>accent</InlineCode>
			with any family:
			<InlineCode>primary</InlineCode>
			,
			<InlineCode>secondary</InlineCode>
			,
			<InlineCode>muted</InlineCode>
			,
			<InlineCode>destructive</InlineCode>
			.
		</p>
	</div>

</div>
