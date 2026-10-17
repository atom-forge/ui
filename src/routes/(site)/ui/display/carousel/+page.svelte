<script lang="ts">
	import { DocApiBlock, DocApiTable, DocInlineCode, DocShowExample, ProseDivider, ProsePage, ProseParagraph, ProseText, ProseTitle, type PropDef } from '@atom-forge/ui';

    import Example1 from "./examples/Example1.svelte";
    import example1 from "./examples/Example1.svelte?raw";
    import Example2 from "./examples/Example2.svelte";
    import example2 from "./examples/Example2.svelte?raw";
    import Example3 from "./examples/Example3.svelte";
    import example3 from "./examples/Example3.svelte?raw";
    import Example4 from './examples/Example4.svelte';
    import example4 from './examples/Example4.svelte?raw';

    const props: PropDef[] = [
        { group: 'Carousel', name: 'items', type: 'T[]', description: 'Required array of slide data. Each item is passed to the <code>children</code> snippet.' },
        { group: 'Carousel', name: 'currentIndex', type: 'number', default: '0', description: 'Index of the active slide. Use <code>bind:currentIndex</code> to sync with external state or <code>CarouselIndicator</code>.' },
        { group: 'Carousel', name: 'showArrows', type: 'boolean', default: 'true', description: 'Show built-in previous / next arrow buttons.' },
        { group: 'Carousel', name: 'loop', type: 'boolean', default: 'false', description: 'Wrap around from the last slide to the first (and vice versa).' },
        { group: 'Carousel', name: 'showcase', type: 'number | [number, number]', description: 'Automatic advance delay in seconds. A tuple chooses a random delay in that range. Always wraps at the end independently of loop; undefined disables it.' },
                { group: 'Carousel', name: 'children', type: 'Snippet<[{ item: T; index: number }]>', description: '(Required) Snippet used to render each slide. Receives the item and its index.' },
        { group: 'Carousel', name: 'class', type: 'string', description: 'Extra Tailwind classes on the root element.' },
        { group: 'Carousel — exported', name: 'next()', type: 'function', description: 'Advance to the next slide. Respects <code>loop</code>.' },
        { group: 'Carousel — exported', name: 'prev()', type: 'function', description: 'Go to the previous slide. Respects <code>loop</code>.' },
        { group: 'Carousel — exported', name: 'goTo(index)', type: 'function', description: 'Jump to a specific slide index.' },
        { group: 'CarouselIndicator', name: 'total', type: 'number', default: '0', description: 'Number of dots to render — should match the length of the carousel\'s <code>items</code>.' },
        { group: 'CarouselIndicator', name: 'currentIndex', type: 'number', default: '0', description: 'Active dot index. Use <code>bind:currentIndex</code> to keep it in sync with the carousel.' },
        { group: 'CarouselIndicator', name: 'class', type: 'string', description: 'Extra Tailwind classes on the indicator container.' },
    ];
</script>

<ProsePage>
	<ProseParagraph>
		<ProseTitle>Carousel</ProseTitle>
		<ProseText>
		    A horizontally scrollable slide container with scroll-snap, optional arrow navigation,
		    and a companion <DocInlineCode>CarouselIndicator</DocInlineCode> for dot-based navigation.
		    Both components sync through a shared <DocInlineCode>bind:currentIndex</DocInlineCode>.
		</ProseText>

		<DocApiBlock title="API">
		    <DocApiTable {props} />
		</DocApiBlock>
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>Basic</ProseTitle>
		        <ProseText>
		            Provide an <DocInlineCode>items</DocInlineCode> array and a <DocInlineCode>children</DocInlineCode>
		            snippet. Built-in arrow buttons handle navigation; scroll-snap keeps slides
		            perfectly aligned.
		        </ProseText>
		        <DocShowExample component={Example1} code={example1} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>With Indicator</ProseTitle>
		        <ProseText>
		            Share <DocInlineCode>bind:currentIndex</DocInlineCode> between <DocInlineCode>Carousel</DocInlineCode>
		            and <DocInlineCode>CarouselIndicator</DocInlineCode>. Clicking a dot scrolls the carousel;
		            scrolling or swiping updates the active dot.
		        </ProseText>
		        <DocShowExample component={Example2} code={example2} />
	</ProseParagraph>

	<ProseDivider />

	<ProseParagraph>
		<ProseTitle level={3}>External Controls</ProseTitle>
		        <ProseText>
		            Use <DocInlineCode>bind:this</DocInlineCode> to get a reference to the carousel instance and
		            call <DocInlineCode>prev()</DocInlineCode>, <DocInlineCode>next()</DocInlineCode>, or
		            <DocInlineCode>goTo(index)</DocInlineCode> from anywhere. Combine with <DocInlineCode>loop</DocInlineCode>
		            for an infinite experience.
		        </ProseText>
		        <DocShowExample component={Example3} code={example3} />
	</ProseParagraph>
	<ProseDivider/>
	<ProseParagraph>
		<ProseTitle level={3}>Automatic showcase</ProseTitle>
		<ProseText>Set showcase to a positive delay in seconds, or a min/max tuple for randomized timing. Automatic advance wraps even without loop. The example starts paused and provides an explicit toggle; the component does not automatically pause on hover or focus.</ProseText>
		<DocShowExample component={Example4} code={example4}/>
	</ProseParagraph>
</ProsePage>
