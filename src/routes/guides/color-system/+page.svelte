<script lang="ts">
	import Card from "../../../lib/gems/card/Card.svelte";
	import Button from "../../../lib/gems/button/Button.svelte";
	import DocSubtitle from "../../../bricks/DocSubtitle.svelte";
	import DocText from "../../../bricks/DocText.svelte";
	import DocTitle from "../../../bricks/DocTitle.svelte";
	import InlineCode from "../../../bricks/InlineCode.svelte";
	import Example1 from './examples/Example1.svelte';
	import Example2 from './examples/Example2.svelte';
	import Example3 from './examples/Example3.svelte';

	const surfaceTokens = [
		{ name: 'bg',      utils: 'bg-canvas',      contrast: 'text-canvas-contrast',      desc: 'Body background. The deepest layer of the application shell.' },
		{ name: 'surface', utils: 'bg-surface', contrast: 'text-surface-contrast', desc: 'Component surface. Used for cards, panels, modals, and drawers.' },
		{ name: 'muted',   utils: 'bg-muted',   contrast: 'text-muted-contrast',   desc: 'Subtle background. Ideal for disabled states or secondary content areas.' },
		{ name: 'input',   utils: 'bg-control',   contrast: 'text-canvas-contrast',      desc: 'Form input background. Typically darker than surface in dark mode.' },
	];

	const actionTokens = [
		{ name: 'primary',   utils: 'bg-primary',   contrast: 'text-primary-contrast',   desc: 'High-emphasis action. "Inverted" by default (dark in light mode, light in dark mode).' },
		{ name: 'accent',    utils: 'bg-accent',    contrast: 'text-accent-contrast',    desc: 'Brand color. Used for primary CTAs, active indicators, and focus states.' },
		{ name: 'secondary', utils: 'bg-secondary', contrast: 'text-secondary-contrast', desc: 'Low-emphasis action. Used for ghost buttons and subtle interactive zones.' },
		{ name: 'error',     utils: 'bg-error',     contrast: 'text-error-contrast',     desc: 'Destructive action. Used for delete buttons and critical error states.' },
	];
</script>

<DocTitle>Color System</DocTitle>

<DocText>
	Atom Forge uses a <strong>Semantic Pairing</strong> system designed for perfect consistency across light and dark modes. 
	Instead of managing dozens of color variations manually, the system relies on functional tokens that always travel in pairs: a background and its guaranteed contrast color.
</DocText>

<div class="space-y-16 mt-12">
	<!-- Philosophy -->
	<section>
		<DocSubtitle>The Contrast Model</DocSubtitle>
		<DocText>
			Every functional color in Atom Forge has a corresponding <InlineCode>-contrast</InlineCode> token. 
			This ensures that text and icons are always legible, regardless of the active theme or the specific background color used.
		</DocText>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
			<Card class="p-6 border-accent/20 bg-accent/5">
				<h4 class="font-bold text-accent mb-2">Automatic Adaptability</h4>
				<p class="text-sm leading-relaxed">
					When you switch to Dark Mode, the tokens don't just change shades—they can flip their entire meaning. 
					For example, <InlineCode>primary</InlineCode> is nearly black in light mode but becomes nearly white in dark mode.
				</p>
			</Card>
			<Card class="p-6">
				<h4 class="font-bold text-canvas-contrast mb-2">Zero Hardcoding</h4>
				<p class="text-sm leading-relaxed text-muted-contrast">
					Never use numbered Tailwind scales like <InlineCode>stone-500</InlineCode> or hex codes in your components. 
					By sticking to semantic tokens, your UI will perfectly support custom themes and branding.
				</p>
			</Card>
		</div>
	</section>

	<!-- Surface Layers -->
	<section>
		<DocSubtitle>Surface Hierarchy</DocSubtitle>
		<DocText>
			Surfaces define the physical structure of your app. They create depth and help users distinguish between layout containers and interactive content.
		</DocText>
		
		<div class="overflow-x-auto mt-6">
			<table class="w-full text-sm text-left border-collapse">
				<thead>
					<tr class="border-b border-frame text-muted-contrast uppercase text-[10px] tracking-wider">
						<th class="py-3 px-4 font-semibold">Token</th>
						<th class="py-3 px-4 font-semibold">Utility Pair</th>
						<th class="py-3 px-4 font-semibold">Application</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border">
					{#each surfaceTokens as token}
						<tr class="hover:bg-secondary/30 transition-colors">
							<td class="py-4 px-4 font-mono font-bold text-accent">{token.name}</td>
							<td class="py-4 px-4">
								<div class="flex flex-col gap-1">
									<code class="text-[11px] bg-secondary px-1.5 py-0.5 rounded border border-frame w-fit">{token.utils}</code>
									<code class="text-[11px] bg-secondary px-1.5 py-0.5 rounded border border-frame w-fit">{token.contrast}</code>
								</div>
							</td>
							<td class="py-4 px-4 text-muted-contrast">{token.desc}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		
		<div class="mt-8">
			<Example1 />
		</div>
	</section>

	<!-- Action Palettes -->
	<section>
		<DocSubtitle>Action & Interaction</DocSubtitle>
		<DocText>
			Action tokens are functional. They communicate intent, hierarchy, and state.
		</DocText>
		
		<div class="overflow-x-auto mt-6">
			<table class="w-full text-sm text-left border-collapse">
				<thead>
					<tr class="border-b border-frame text-muted-contrast uppercase text-[10px] tracking-wider">
						<th class="py-3 px-4 font-semibold">Family</th>
						<th class="py-3 px-4 font-semibold">Usage</th>
						<th class="py-3 px-4 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border">
					{#each actionTokens as token}
						<tr class="hover:bg-secondary/30 transition-colors">
							<td class="py-4 px-4 font-mono font-bold text-accent">{token.name}</td>
							<td class="py-4 px-4">
								<div class="flex items-center gap-2">
									<div class="w-12 h-6 rounded {token.utils} border border-frame/10"></div>
									<code class="text-[11px] text-muted-contrast">{token.utils}</code>
								</div>
							</td>
							<td class="py-4 px-4 text-muted-contrast">{token.desc}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="mt-8">
			<Example2 />
		</div>
	</section>

	<!-- Interaction States -->
	<section>
		<DocSubtitle>Dynamic States</DocSubtitle>
		<DocText>
			Atom Forge moves away from static "hover" variables. Instead, it uses Tailwind 4's dynamic modifiers to derive interaction states from the base token.
		</DocText>
		
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
			<div class="p-4 rounded-lg border border-frame bg-surface">
				<p class="text-[10px] font-bold uppercase tracking-widest text-muted-contrast mb-3">Hover (Light)</p>
				<div class="px-3 py-2 rounded bg-accent text-accent-contrast hover:brightness-90 transition-all cursor-pointer text-xs text-center font-medium">
					hover:brightness-90
				</div>
			</div>
			<div class="p-4 rounded-lg border border-frame bg-surface">
				<p class="text-[10px] font-bold uppercase tracking-widest text-muted-contrast mb-3">Hover (Dark)</p>
				<div class="px-3 py-2 rounded bg-accent text-accent-contrast dark:hover:brightness-110 transition-all cursor-pointer text-xs text-center font-medium">
					hover:brightness-110
				</div>
			</div>
			<div class="p-4 rounded-lg border border-frame bg-surface">
				<p class="text-[10px] font-bold uppercase tracking-widest text-muted-contrast mb-3">Ghost Hover</p>
				<div class="px-3 py-2 rounded bg-transparent text-canvas-contrast hover:bg-secondary transition-all cursor-pointer text-xs text-center font-medium">
					hover:bg-secondary
				</div>
			</div>
		</div>

		<div class="mt-8">
			<Example3 />
		</div>
	</section>

	<!-- Technical Reference -->
	<section>
		<DocSubtitle>Technical Reference</DocSubtitle>
		<DocText>
			Borders and focus rings are globally standardized to ensure components feel like they belong to the same family.
		</DocText>
		
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
			<div class="flex items-center justify-between p-4 rounded-lg border border-frame bg-surface">
				<div>
					<p class="font-mono text-sm text-accent">border-frame</p>
					<p class="text-xs text-muted-contrast">Standard 1px border for all components.</p>
				</div>
				<div class="w-8 h-8 rounded border border-frame bg-canvas"></div>
			</div>
			<div class="flex items-center justify-between p-4 rounded-lg border border-frame bg-surface">
				<div>
					<p class="font-mono text-sm text-accent">ring-accent</p>
					<p class="text-xs text-muted-contrast">Standard 2px focus ring for accessibility.</p>
				</div>
				<div class="w-8 h-8 rounded bg-canvas ring-2 ring-accent"></div>
			</div>
		</div>
	</section>
</div>
