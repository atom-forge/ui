<script lang="ts">
	import type {ClassProp} from "$lib";
	import {untrack} from "svelte";
	import {twMerge} from "tailwind-merge";

	let {
		gemSpeed = 0.5,
		lightStartAngleDeg: _lightStartAngleDeg = 0,
		lightSpeed = 2.0,
		baseHue = 270,
		size = 300,
		class: classes = ''
	}: & ClassProp
		& {
		gemSpeed?: number
		lightStartAngleDeg?: number
		lightSpeed?: number
		baseHue?: number
		size?: number
	} = $props();

	let time = $state(0);
	const lightStartAngleDeg = untrack(() => _lightStartAngleDeg);

	// Kezdőértékek
	let gemRotation = $state(0);
	let currentLightAngle = $state((lightStartAngleDeg * Math.PI) / 180);

	// Animációs hurok
	$effect(() => {
		let frame: number;
		let lastTime = performance.now();

		const loop = () => {
			const now = performance.now();
			const delta = (now - lastTime) / 1000; // másodpercben
			lastTime = now;

			// Állapot frissítése az eltelt idő alapján (simább mozgás)
			gemRotation += delta * gemSpeed;
			currentLightAngle += delta * lightSpeed;

			frame = requestAnimationFrame(loop);
		};

		frame = requestAnimationFrame(loop);

		return () => cancelAnimationFrame(frame);
	});

	const numSegments = 6;
	const segmentIndices = Array.from({length: numSegments}, (_, i) => i);

	// HELPEREK (nem reaktívak önmagukban)
	function calculatePoints(index: number, rotation: number) {
		const angleStep = (Math.PI * 2) / numSegments;
		const currentAngle = index * angleStep + rotation;
		const nextAngle = (index + 1) * angleStep + rotation;
		const r = 45; // Relatív méret (0-100 koordináta-rendszerben)

		const x1 = 50 + r * Math.cos(currentAngle);
		const y1 = 50 + r * Math.sin(currentAngle);
		const x2 = 50 + r * Math.cos(nextAngle);
		const y2 = 50 + r * Math.sin(nextAngle);

		return `50,50 ${x1},${y1} ${x2},${y2}`;
	}

	function calculateColor(index: number, gRot: number, lRot: number, hue: number) {
		const angleStep = (Math.PI * 2) / numSegments;
		const faceAngle = index * angleStep + angleStep / 2 + gRot;
		const incidence = Math.cos(faceAngle - lRot);

		const lightness = 40 + incidence * 25;
		const alpha = 0.8 + incidence * 0.2;

		return `hsla(${hue}, 70%, ${lightness}%, ${alpha})`;
	}

	function calculateTopPoints(rotation: number) {
		return segmentIndices.map((i) => {
			const angleStep = (Math.PI * 2) / numSegments;
			const angle = i * angleStep + rotation;
			const x = 50 + 30 * Math.cos(angle);
			const y = 50 + 30 * Math.sin(angle);
			return `${x},${y}`;
		}).join(' ');
	}

	// $derived: Ez garantálja, hogy a HTML frissüljön, amikor a gemRotation változik
	let sidePolygons = $derived(
		segmentIndices.map(i => ({
			points: calculatePoints(i, gemRotation),
			fill: calculateColor(i, gemRotation, currentLightAngle, baseHue)
		}))
	);

	let topPolygonPoints = $derived(calculateTopPoints(gemRotation));
</script>

<div class={twMerge("inline-block", classes)} style="will-change: transform; width: {size}px; height: {size}px;">
	<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" style="overflow: visible;">
		<defs>
			<filter id="glow">
				<feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
				<feMerge>
					<feMergeNode in="coloredBlur"/>
					<feMergeNode in="SourceGraphic"/>
				</feMerge>
			</filter>
		</defs>

		<g filter="url(#glow)">
			{#each sidePolygons as poly}
				<polygon points={poly.points} fill={poly.fill} style="transition: fill 0.1s linear;"/>
			{/each}

			<polygon
				points={topPolygonPoints}
				fill="hsla({baseHue}, 70%, 60%, 0.5)"
				style="transition: fill 0.1s linear;"
			/>
		</g>
	</svg>
</div>
