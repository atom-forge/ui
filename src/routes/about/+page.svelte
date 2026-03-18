<script lang="ts">
	import {Button, Card, Chip} from '$lib';
	import {
		Github,
		Linkedin,
		Code,
		ExternalLink,
		Heart,
		Palette,
		GraduationCap,
	} from 'lucide-svelte';
	import avatar from '../../assets/avatar.jpg';

	const skills = [
		'PHP', 'TypeScript', 'Svelte', 'JavaScript', 'HTML/CSS',
		'UX Design', 'UI Design', 'Frontend Architecture', 'Backend Systems',
		'Framework Design', 'Tailwind CSS', 'REST APIs',
	];

	const timeline = [
		{year: '1999', label: 'Started web development', detail: 'PHP was the cool kid on the block. Built everything from scratch — backends, frontends, even the design.'},
		{year: '2010', label: 'Started teaching at University of Pécs', detail: 'Joined the Faculty of Engineering and Information Technology. Teaching UX/UI Design, Programming, and Web Programming.'},
		{year: '2015', label: 'Built a reactive framework from scratch', detail: 'Before reactivity was mainstream, I built my own — because the right tool simply didn\'t exist yet. One of several frameworks I\'ve written in PHP and TypeScript over the years.'},
		{year: '2019', label: 'Discovered Svelte', detail: 'Found the framework that finally matched how I think about UI. The philosophy, the simplicity, the compiler approach — it all clicked immediately.'},
		{year: '2025', label: 'Started building AtomForge UI', detail: 'Loved the shadcn aesthetic, hated the install model and the API. Built something better — a proper npm package with a fluent, composable API at its core.'},
	];
</script>

<div class="max-w-3xl mx-auto space-y-12 py-8">

	<!-- Hero -->
	<div class="flex flex-col sm:flex-row items-center sm:items-start gap-8">
		<img
			src={avatar}
			alt="Gergely Laborci"
			class="w-32 h-32 rounded-2xl object-cover shadow-lg shrink-0 ring-2 ring-accent/30"
		/>
		<div class="flex flex-col gap-3 text-center sm:text-left">
			<div>
				<h1 class="text-3xl font-bold text-canvas-contrast tracking-tight">Gergely Laborci</h1>
				<p class="text-muted-contrast text-sm mt-1">Pécs, Hungary · Web Developer since 1999 · Teaching since 2010</p>
			</div>
			<p class="text-canvas-contrast leading-relaxed">
				Full-stack developer, UX/UI practitioner, framework builder, and university lecturer.
				I've been shaping the web since PHP ruled the world — and I still love every layer of it:
				backend, frontend, design, and everything in between.
			</p>
			<div class="flex gap-2 justify-center sm:justify-start flex-wrap">
				<a href="https://github.com/atom-forge" target="_blank" rel="noopener noreferrer">
					<Button icon={Github} label="GitHub" ghost compact/>
				</a>
				<a href="https://www.linkedin.com/in/laborci/" target="_blank" rel="noopener noreferrer">
					<Button icon={Linkedin} label="LinkedIn" ghost compact/>
				</a>
			</div>
		</div>
	</div>

	<!-- About -->
	<Card class="p-7 flex flex-col gap-4">
		<div class="flex items-center gap-2 text-accent mb-1">
			<Code size={18}/>
			<h2 class="font-semibold text-canvas-contrast">About me</h2>
		</div>
		<p class="text-sm text-canvas-contrast leading-relaxed">
			I've been building for the web since 1999 — back when PHP was the obvious choice and frameworks
			didn't really exist yet. Over the decades I've written backends, designed interfaces, crafted
			UX flows, and built multiple frameworks in both PHP and TypeScript — mostly because the right
			tool simply didn't exist at the time. In 2015 I built my own reactive framework, years before
			reactivity became a mainstream idea.
		</p>
		<p class="text-sm text-canvas-contrast leading-relaxed">
			In 2019 I discovered Svelte — and it was an immediate match. The philosophy, the compiler
			approach, the simplicity of the API:
			<span class="text-accent font-medium">it finally matched how I think about UI</span>.
			Svelte 5 with its runes model only made that conviction stronger.
		</p>
		<p class="text-sm text-canvas-contrast leading-relaxed">
			Since 2010 I've been teaching at the
			<span class="font-medium text-canvas-contrast">University of Pécs, Faculty of Engineering and Information Technology</span>
			— running courses in UX/UI Design, Programming, and Web Programming — while building
			<strong>AtomForge<span class="text-accent">UI</span></strong> since 2025.
		</p>
	</Card>

	<!-- Why AtomForge -->
	<Card class="p-7 flex flex-col gap-4">
		<div class="flex items-center gap-2 text-accent mb-1">
			<Palette size={18}/>
			<h2 class="font-semibold text-canvas-contrast">Why AtomForge<span class="text-accent">UI</span>?</h2>
		</div>
		<p class="text-sm text-canvas-contrast leading-relaxed">
			shadcn/ui has a genuinely beautiful aesthetic — and that part I deeply respect.
			What I wanted to do differently is the model: copying components into your project,
			managing them file by file, and an API that doesn't always feel consistent.
			I believe a library should be a proper dependency.
		</p>
		<p class="text-sm text-canvas-contrast leading-relaxed">
			So I built one. <strong>AtomForge<span class="text-accent">UI</span></strong> follows a different philosophy —
			install it once, import what you need, and get a consistent, ergonomic
			<span class="text-accent font-medium">fluent API</span> throughout.
			No copy-pasting, no version drift, no surprises.
		</p>
		<div class="flex flex-wrap gap-2 pt-1">
			<Chip color="blue">Svelte 5</Chip>
			<Chip>Tailwind CSS 4</Chip>
			<Chip>Fluent API</Chip>
			<Chip>Proper npm package</Chip>
			<Chip>TypeScript-first</Chip>
		</div>
	</Card>

	<!-- Timeline -->
	<div class="flex flex-col gap-3">
		<div class="flex items-center gap-2 text-accent mb-1">
			<Code size={18}/>
			<h2 class="font-semibold text-canvas-contrast">Journey</h2>
		</div>
		<div class="flex flex-col gap-0">
			{#each timeline as item, i}
				<div class="flex gap-4">
					<!-- Line + dot -->
					<div class="flex flex-col items-center">
						<div class="w-2.5 h-2.5 rounded-full bg-accent mt-1 shrink-0 ring-2 ring-accent/20"></div>
						{#if i < timeline.length - 1}
							<div class="w-px flex-1 bg-frame my-1"></div>
						{/if}
					</div>
					<!-- Content -->
					<div class="pb-6 flex flex-col gap-0.5">
						<div class="flex items-center gap-2">
							<span class="text-xs font-bold text-accent font-mono">{item.year}</span>
						</div>
						<p class="text-sm font-semibold text-canvas-contrast">{item.label}</p>
						<p class="text-sm text-muted-contrast leading-relaxed">{item.detail}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Skills -->
	<div class="flex flex-col gap-3">
		<div class="flex items-center gap-2 text-accent mb-1">
			<Code size={18}/>
			<h2 class="font-semibold text-canvas-contrast">Skills & Technologies</h2>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each skills as skill}
				<Chip>{skill}</Chip>
			{/each}
		</div>
	</div>

	<!-- Teaching -->
	<Card class="p-7 flex flex-col gap-4">
		<div class="flex items-center gap-2 text-accent mb-1">
			<GraduationCap size={18}/>
			<h2 class="font-semibold text-canvas-contrast">Teaching</h2>
		</div>
		<div class="flex flex-col sm:flex-row items-start gap-4">
			<div class="flex-1 flex flex-col gap-2">
				<p class="text-sm font-medium text-canvas-contrast">University of Pécs</p>
				<p class="text-xs text-muted-contrast">Faculty of Engineering and Information Technology</p>
				<div class="flex flex-col gap-1.5 mt-1">
					{#each ['UX/UI Design', 'Programming', 'Web Programming'] as course}
						<div class="flex items-center gap-2 text-sm text-canvas-contrast">
							<div class="w-1 h-1 rounded-full bg-accent shrink-0"></div>
							{course}
						</div>
					{/each}
				</div>
			</div>
			<a href="https://mik.pte.hu" target="_blank" rel="noopener noreferrer"
				class="flex items-center gap-1.5 text-xs text-muted-contrast hover:text-accent transition-colors shrink-0">
				mik.pte.hu <ExternalLink size={12}/>
			</a>
		</div>
	</Card>

	<!-- Support -->
	<div class="rounded-xl border border-accent/20 bg-accent/5 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
		<Heart size={28} class="text-accent shrink-0"/>
		<div class="flex-1">
			<p class="font-semibold text-canvas-contrast">Like what you see?</p>
			<p class="text-sm text-muted-contrast mt-0.5">
				<strong>AtomForge<span class="text-accent">UI</span></strong> is free for personal and open-source projects.
				If you use it commercially, please consider supporting the project.
			</p>
		</div>
		<div class="flex gap-2 shrink-0">
			<a href="https://patreon.com/atomforge" target="_blank" rel="noopener noreferrer">
				<Button label="Patreon" icon={Heart} accent compact/>
			</a>
			<a href="https://github.com/sponsors/atom-forge" target="_blank" rel="noopener noreferrer">
				<Button label="GitHub" icon={Github} ghost compact/>
			</a>
		</div>
	</div>

</div>
