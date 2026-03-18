<script lang="ts">
	import DocTitle from "../../components/doc/DocTitle.svelte";
	import DocSubtitle from "../../components/doc/DocSubtitle.svelte";
	import DocText from "../../components/doc/DocText.svelte";
	import InlineCode from "../../components/doc/InlineCode.svelte";
	import ShowCode from "../../components/doc/ShowCode.svelte";
	import {Check, X, Heart} from "lucide-svelte";

	const npmrcCode = `# .npmrc
@atom-forge:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE`;

	const installCode = `npm install @atom-forge/ui-pro`;
</script>

{#snippet afui()}<strong>AtomForge<span class="text-accent">UI</span></strong>{/snippet}

<DocTitle>Licensing</DocTitle>
<DocText>
	{@render afui()} uses a <strong>Patron License</strong> — free for personal, hobby, and non-profit use;
	a commercial license is required for for-profit projects. It is honor-based: no technical enforcement,
	just a fair ask. Pro patrons will also get access to the <strong>AtomForge<span class="text-accent">UI</span> Pro</strong> package:
	a set of advanced components, coming soon.
</DocText>

<div class="mt-10 space-y-10">

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<!-- Free -->
		<div class="rounded-xl border border-frame bg-surface p-6 flex flex-col gap-4">
			<div>
				<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast mb-1">Free</p>
				<p class="text-2xl font-bold text-canvas-contrast">$0</p>
				<p class="text-sm text-muted-contrast mt-1">Forever, no strings attached</p>
			</div>
			<ul class="flex flex-col gap-2 text-sm text-canvas-contrast">
				{#each [
					'Personal & hobby projects',
					'Open source projects',
					'Non-profit organizations',
					'Learning & evaluation',
					'Client work for non-profits',
				] as item}
					<li class="flex items-center gap-2">
						<Check size={15} class="text-green-500 shrink-0"/>
						{item}
					</li>
				{/each}
			</ul>
			<a
				href="https://github.com/sponsors/atom-forge"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-auto inline-flex items-center justify-center gap-2 rounded-md border border-frame text-muted-contrast text-sm font-medium px-4 py-2 hover:border-accent hover:text-accent transition-colors"
			>
				<Heart size={15} class="text-red-500"/>
				Support the Project
			</a>
		</div>

		<!-- Commercial -->
		<div class="rounded-xl border border-accent bg-surface p-6 flex flex-col gap-4">
			<div>
				<p class="text-xs font-semibold uppercase tracking-widest text-accent mb-1">Commercial</p>
				<p class="text-2xl font-bold text-canvas-contrast">Patron</p>
				<p class="text-sm text-muted-contrast mt-1">For any for-profit project — honor-based</p>
			</div>
			<ul class="flex flex-col gap-2 text-sm text-canvas-contrast">
				{#each [
					'For-profit products & SaaS',
					'Client work for commercial clients',
					'Internal tools at for-profit companies',
					'Any project generating revenue',
				] as item}
					<li class="flex items-center gap-2">
						<Check size={15} class="text-accent shrink-0"/>
						{item}
					</li>
				{/each}
			</ul>
			<div class="mt-auto flex flex-col gap-2">
				<a
					href="https://github.com/sponsors/atom-forge"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 rounded-md border border-frame text-muted-contrast text-sm font-medium px-4 py-2 hover:border-accent hover:text-accent transition-colors"
				>
					<Heart size={15} class="text-red-500"/>
					Support on GitHub
				</a>
			</div>
		</div>

		<!-- Pro — Coming Soon -->
		<div class="rounded-xl border-2 border-frame bg-surface p-6 flex flex-col gap-4 relative overflow-hidden opacity-70">
			<div class="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest bg-muted-c/20 text-muted-contrast rounded-full px-2 py-0.5">Coming Soon</div>
			<div>
				<p class="text-xs font-semibold uppercase tracking-widest text-muted-contrast mb-1">Pro Patron</p>
				<p class="text-2xl font-bold text-canvas-contrast">Patron <span class="text-muted-contrast">Pro</span></p>
				<p class="text-sm text-muted-contrast mt-1">Commercial license + exclusive pro components</p>
			</div>
			<ul class="flex flex-col gap-2 text-sm text-muted-contrast">
				{#each [
					'Everything in Commercial',
					'Access to @atom-forge/ui-pro package',
					'Advanced data grid component',
					'Rich text editor',
					'Complex scheduler / calendar',
					'Early access to new components',
				] as item}
					<li class="flex items-center gap-2">
						<Check size={15} class="shrink-0"/>
						{item}
					</li>
				{/each}
			</ul>
			<div class="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-muted-c/10 text-muted-contrast text-sm font-medium px-4 py-2 cursor-not-allowed select-none">
				<Heart size={15} class="text-red-500"/>
				Coming Soon
			</div>
		</div>
	</div>

	<div>
		<DocSubtitle>How it works</DocSubtitle>
		<DocText>
			The commercial license is <strong>honor-based</strong> — there is no technical enforcement,
			no license key, and nothing to configure. If your project makes money using {@render afui()},
			please support the development via GitHub Sponsors.
		</DocText>
		<DocText>
			The commercial license covers all projects you are actively working on during your support period.
			It is <strong>perpetual for projects started while supporting</strong> — you can ship and
			maintain a project even after you stop, as long as it was started while you were an active supporter.
		</DocText>
	</div>

	<div>
		<DocSubtitle>
			<span>AtomForge<span class="text-accent">UI</span> Pro</span>
			<span class="ml-2 text-xs font-normal text-muted-contrast">(coming soon)</span>
		</DocSubtitle>
		<DocText>
			Pro patrons will get access to <InlineCode>@atom-forge/ui-pro</InlineCode> — a private npm
			package containing advanced, production-ready components. Unlike the commercial license,
			this is <strong>technically enforced</strong> via a private npm registry token provisioned
			by your GitHub subscription. The token is long-lived and tied to an active subscription — set it once
			in your <InlineCode>.npmrc</InlineCode> and never touch it again:
		</DocText>
		<ShowCode code={npmrcCode} file=".npmrc" class="my-4"/>
		<ShowCode code={installCode} class="my-4"/>
		<DocText>
			If your subscription lapses, GitHub automatically invalidates the token.
			Projects already in production are unaffected as long as the version is locked in
			<InlineCode>package.json</InlineCode>.
		</DocText>
	</div>

	<div>
		<DocSubtitle>What counts as commercial use?</DocSubtitle>
		<DocText>
			A project is considered commercial if it is used in any for-profit context — directly or
			indirectly. This includes:
		</DocText>
		<ul class="mt-3 flex flex-col gap-2 text-sm text-canvas-contrast">
			{#each [
				'A SaaS product or web app that charges users',
				'A client project where you are paid for the work',
				'An internal tool used at a for-profit company',
				'A free product that is part of a commercial offering',
			] as item}
				<li class="flex items-start gap-2">
					<X size={15} class="text-destructive shrink-0 mt-0.5"/>
					{item}
				</li>
			{/each}
		</ul>
		<p class="mt-4 text-sm text-muted-contrast">
			When in doubt — if your project makes money, please support the project.
			It directly funds continued development of {@render afui()}.
		</p>
	</div>

	<div>
		<DocSubtitle>Full license text</DocSubtitle>
		<div class="rounded-lg border border-frame bg-surface p-5 text-xs text-muted-contrast font-mono leading-relaxed whitespace-pre-wrap">
{`AtomForge — Patron License
Copyright (c) 2024-present Elvis Szabo

Permission is hereby granted, free of charge, to any individual or
non-commercial organization obtaining a copy of this software (the "Software"),
to use, copy, modify, and distribute the Software for non-commercial purposes,
subject to the following conditions:

NON-COMMERCIAL USE
The above rights are granted at no charge for:
  - Personal and hobby projects
  - Open source projects
  - Non-profit organizations

COMMERCIAL USE
Any use of the Software in a for-profit context requires a paid commercial
license. A commercial license is granted to any individual who actively
supports the project via GitHub Sponsors (https://github.com/sponsors/atom-forge).
The license is perpetual for projects initiated during the active support
period. Stopping support does not revoke the license for projects already
in production at the time.

ATOMFORGEUI PRO
The @atom-forge/ui-pro package is restricted to active Pro subscribers.
Access is enforced via a private npm registry token automatically
provisioned by your GitHub subscription upon subscribing. The token remains valid only
during an active subscription and is invalidated upon cancellation.

DISCLAIMER
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY ARISING FROM THE USE OF THE SOFTWARE.`}
		</div>
	</div>

</div>
