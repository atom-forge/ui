<script lang="ts">
    import { ChartBase, Button, CHART_PALETTE, getChartTheme, seriesColor } from '@atom-forge/ui';
    import { onMount } from 'svelte';
    import type { ComponentProps } from 'svelte';

    let chart = $state<ComponentProps<typeof ChartBase>['chart']>();
    let theme = $state({ grid: '', text: '' });
    onMount(() => { theme = getChartTheme(); });
    const config = $derived<ComponentProps<typeof ChartBase>['config']>({
        type: 'bar',
        data: {
            labels: ['Design', 'Build', 'Review'],
            datasets: [{ label: 'Hours', data: [8, 13, 5], backgroundColor: seriesColor(0) }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: theme.text } } },
            scales: { y: { beginAtZero: true, grid: { color: theme.grid } } },
        },
    });
</script>

<div class="space-y-3">
    <div class="h-64"><ChartBase {config} bind:chart /></div>
    <Button compact label="Download PNG" onclick={() => {
        // The ChartBase declaration shadows the Chart.js instance type.
        if (!chart || !('toBase64Image' in chart) || typeof chart.toBase64Image !== 'function') return;
        const link = document.createElement('a');
        link.href = chart.toBase64Image();
        link.download = 'hours.png';
        link.click();
    }} />
    <p class="text-sm text-muted-contrast">The public palette contains {CHART_PALETTE.length} colors.</p>
</div>
