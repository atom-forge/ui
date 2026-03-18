<script lang="ts">
	import "svelte-highlight/styles/tokyo-night-dark.css";
	import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
	import DocText from "../../../components/doc/DocText.svelte";
	import DocTitle from "../../../components/doc/DocTitle.svelte";
	import InlineCode from "../../../components/doc/InlineCode.svelte";
	import ShowCode from "../../../components/doc/ShowCode.svelte";

	const installCode = `npm install @atom-forge/core lucide-svelte tailwind-merge
npm install -D tailwindcss @tailwindcss/vite`;

	const viteConfigCode = `import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()]
});`;

	const appCssCode = `/* src/app.css */
/* Adjust the relative paths to match the location of your CSS file */
@import 'tailwindcss';
@import '../../../node_modules/@atom-forge/core/dist/theme.css';
@source '../../../node_modules/@atom-forge/core/dist';
@source '../../../src';`;

	const layoutWithCssCode = `<script lang="ts">
  import '../app.css';
  import { Root } from '@atom-forge/core';

  let { children } = $props();
<\/script>

<Root dark>
  {@render children()}
</Root>`;

	const importCode = `import { Button, Input, Card } from '@atom-forge/core';`;

	const firstComponentCode = `<script lang="ts">
  import { Button } from '@atom-forge/core';
  import { Plus } from 'lucide-svelte';
<\/script>

<Button label="Add item" icon={Plus}/>
<Button label="Delete" destructive/>
<Button label="Cancel" ghost/>`;

	const darkModeCode = `<script lang="ts">
  import { getThemeManager, Switch } from '@atom-forge/core';
  import { Moon, Sun } from 'lucide-svelte';

  const theme = getThemeManager();
<\/script>

<Switch bind:value={theme.dark} icons={{ on: Moon, off: Sun }}/>`;

	const darkInitCode = `<!-- src/app.html -->
<head>
  <!-- Add this BEFORE %sveltekit.head% -->
  <script>
    (function() {
      try {
        var saved = localStorage.getItem('dark');
        if (saved !== null) {
          if (JSON.parse(saved)) document.documentElement.classList.add('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  <\/script>
  %sveltekit.head%
</head>`;

	const toastCode = `<script lang="ts">
  import { getToastManager, Button } from '@atom-forge/core';

  const toast = getToastManager();
<\/script>

<Button label="Save" onclick={() => toast.show('Saved!', { type: 'success' })}/>`;

	const modalCode = `<script lang="ts">
  import { getModalManager, Button } from '@atom-forge/core';
  import ConfirmDialog from './ConfirmDialog.svelte';

  const modal = getModalManager();

  async function deleteItem() {
    const confirmed = await modal.open(ConfirmDialog, { message: 'Delete this?' });
    if (confirmed) await doDelete();
  }
<\/script>

<Button label="Delete" destructive onclick={deleteItem}/>`;
</script>

<DocTitle>Getting Started</DocTitle>
<DocText>
	AtomForge is a Svelte 5 component library built with Tailwind CSS 4. It provides a set of composable, themeable UI components — from basic inputs and buttons to overlays, charts, and data tables.
</DocText>

<div class="space-y-10 mt-8">

	<div>
		<DocSubtitle>Installation</DocSubtitle>
		<DocText>Install the package and its peer dependencies:</DocText>
		<ShowCode code={installCode} class="my-4"/>
		<DocText>
			<InlineCode>lucide-svelte</InlineCode> provides the icon components used throughout the library.
			<InlineCode>tailwind-merge</InlineCode> is used internally for class composition.
			<InlineCode>tailwindcss</InlineCode> and <InlineCode>@tailwindcss/vite</InlineCode> are required
			to process the theme stylesheet.
		</DocText>
	</div>

	<div>
		<DocSubtitle>Vite configuration</DocSubtitle>
		<DocText>
			Add the Tailwind CSS 4 Vite plugin to your <InlineCode>vite.config.ts</InlineCode>.
			This enables CSS processing for both your own styles and AtomForge's theme.
		</DocText>
		<ShowCode code={viteConfigCode} file="vite.config.ts" class="my-4"/>
	</div>

	<div>
		<DocSubtitle>Theme CSS</DocSubtitle>
		<DocText>
			AtomForge ships its own theme stylesheet — <InlineCode>@atom-forge/core/theme.css</InlineCode> —
			which defines the semantic color tokens, surface layers, and utility classes that all components depend on.
			Add these three lines to your app's CSS entry point:
		</DocText>
		<ShowCode code={appCssCode} file="src/app.css" class="my-4"/>
		<DocText>
			The <InlineCode>@source</InlineCode> directive is required because Tailwind CSS 4 does not scan
			<InlineCode>node_modules</InlineCode> by default. Without it, the utility classes used inside
			AtomForge's components won't be included in the generated CSS and components will appear unstyled.
			The second <InlineCode>@source</InlineCode> line ensures your own <InlineCode>src/</InlineCode> folder
			is also scanned. The relative paths above assume your CSS file is at <InlineCode>src/app.css</InlineCode> —
			adjust them accordingly if your CSS file lives elsewhere.
		</DocText>
	</div>

	<div>
		<DocSubtitle>Layout setup</DocSubtitle>
		<DocText>
			Import your CSS and wrap the root layout with <InlineCode>Root</InlineCode>.
			This registers all overlay managers (Modal, Toast, Drawer, Popup) and sets up dark mode persistence.
			Without this wrapper, overlay components will not work.
		</DocText>
		<ShowCode code={layoutWithCssCode} file="src/routes/+layout.svelte" class="my-4"/>
		<DocText>
			The <InlineCode>dark</InlineCode> and <InlineCode>light</InlineCode> props control the initial color scheme
			when no user preference has been saved yet. Use <InlineCode>dark</InlineCode> to default to dark mode,
			or <InlineCode>light</InlineCode> to default to light mode regardless of the system preference.
			Without either prop, <InlineCode>prefers-color-scheme</InlineCode> is used as the initial value.
			The choice is then persisted in <InlineCode>localStorage</InlineCode> automatically.
		</DocText>
	</div>

	<div>
		<DocSubtitle>Importing components</DocSubtitle>
		<DocText>All components are exported from the root package. Import exactly what you need:</DocText>
		<ShowCode code={importCode} class="my-4"/>
	</div>

	<div>
		<DocSubtitle>Your first component</DocSubtitle>
		<DocText>
			<InlineCode>Button</InlineCode> is a good starting point. It supports 7 variants, 3 sizes, icons, loading states, and more.
			Pass any <InlineCode>lucide-svelte</InlineCode> icon component directly — no wrapper needed.
		</DocText>
		<ShowCode code={firstComponentCode} class="my-4"/>
	</div>

	<div>
		<DocSubtitle>Dark mode</DocSubtitle>
		<DocText>
			Use <InlineCode>getThemeManager()</InlineCode> anywhere inside the <InlineCode>Root</InlineCode> tree to toggle dark mode.
			Bind <InlineCode>theme.dark</InlineCode> to a <InlineCode>Switch</InlineCode> for a one-line toggle:
		</DocText>
		<ShowCode code={darkModeCode} class="my-4"/>
		<DocText>
			To prevent a flash of the wrong color scheme on page load, add a small blocking script to
			<InlineCode>app.html</InlineCode> before <InlineCode>%sveltekit.head%</InlineCode>.
			It reads the saved preference from <InlineCode>localStorage</InlineCode> and applies the
			<InlineCode>dark</InlineCode> class to <InlineCode>&lt;html&gt;</InlineCode> before the first paint —
			eliminating the white flash in dark mode.
		</DocText>
		<ShowCode code={darkInitCode} file="src/app.html" class="my-4"/>
	</div>

	<div>
		<DocSubtitle>Toasts</DocSubtitle>
		<DocText>
			Toasts are triggered imperatively via <InlineCode>getToastManager()</InlineCode>.
			No component placement required — the container is rendered by <InlineCode>Root</InlineCode>.
		</DocText>
		<ShowCode code={toastCode} class="my-4"/>
	</div>

	<div>
		<DocSubtitle>Modals</DocSubtitle>
		<DocText>
			Modals work the same way — open any Svelte component as a modal. <InlineCode>modal.open()</InlineCode> returns a
			<InlineCode>Promise</InlineCode> that resolves when <InlineCode>modal.close(result)</InlineCode> is called inside
			the modal component. This makes async confirmation flows straightforward.
		</DocText>
		<ShowCode code={modalCode} class="my-4"/>
		<DocText>
			The same pattern applies to <InlineCode>getDrawerManager()</InlineCode> and <InlineCode>getPopupManager()</InlineCode>.
			All managers are provided automatically by <InlineCode>Root</InlineCode>.
		</DocText>
	</div>

</div>
