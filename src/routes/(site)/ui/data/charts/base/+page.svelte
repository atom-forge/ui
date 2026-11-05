<script lang="ts">
    import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProsePage, ProseParagraph, ProseTitle, ProseText, type PropDef } from '@atom-forge/ui';
    import Example1 from './examples/Example1.svelte';
    import example1 from './examples/Example1.svelte?raw';

    const props: PropDef[] = [
        { group: 'ChartBase', name: 'config', type: 'ChartConfiguration', description: 'Required Chart.js configuration. Reactive changes replace instance data/options and call update(). Changing the chart type requires remounting the component.' },
        { group: 'ChartBase', name: 'chart', type: 'Chart | undefined', description: 'Bindable instance. Undefined before mount and after cleanup; the component destroys its instance on unmount.' },
        { group: 'ChartBase', name: 'class', type: 'string', description: 'Classes merged onto the canvas.' },
        { group: 'Helpers', name: 'CHART_PALETTE', type: 'string[]', description: 'Eight default hex colors. Do not mutate this shared array.' },
        { group: 'Helpers', name: 'seriesColor(index, override?)', type: 'string', description: 'Returns override when provided, otherwise cycles through CHART_PALETTE. Use a non-negative series index.' },
        { group: 'Helpers', name: 'getChartTheme()', type: '{ grid: string; text: string }', description: 'Reads --color-border and --color-muted-contrast from document.documentElement. Returns empty strings during SSR. This is a snapshot, not a reactive theme subscription.' },
    ];
</script>

<ProsePage>
    <ProseParagraph>
        <ProseTitle>Chart Base &amp; Helpers</ProseTitle>
        <ProseText>
            <DocInlineCode>ChartBase</DocInlineCode> is the public low-level Chart.js canvas control.
            Use the specialized chart controls for automatic theme observation, or supply a complete
            configuration here. This example reads the theme on mount and exports the bound chart as PNG.
            It does not automatically re-read colors when the theme changes. The emitted ChartBase declaration shadows the Chart.js instance type with the Svelte component type; the example guards the runtime instance method instead of hiding this behind an any cast.
        </ProseText>
        <ProseText>
            The specialized wrappers append alpha hex suffixes to their series colors: use six-digit
            hex colors for overrides, rather than CSS variables or rgb() strings. ChartBase accepts
            Chart.js color values directly. Set maintainAspectRatio: false when filling a fixed-height container.
        </ProseText>
        <ProseText>Import dataset types with type-only imports: LineDataset, BarDataset, ScatterDataset, BubbleDataset, RadarDataset, ScatterPoint and BubblePoint are exported by the public declarations, not as runtime values. You can also infer wrapper props with Svelte’s ComponentProps. ChartOptions and ChartConfiguration come from chart.js, not @atom-forge/ui. Wrapper options merge plugins shallowly and x/y/r scale definitions one level deep; supplying legend or ticks replaces that nested default object.</ProseText>
                <DocApiBlock title="API"><DocApiTable {props} /></DocApiBlock>
    </ProseParagraph>
    <ProseParagraph>
        <ProseTitle level={3}>Custom configuration and instance access</ProseTitle>
        <DocShowExample component={Example1} code={example1} />
    </ProseParagraph>
</ProsePage>
