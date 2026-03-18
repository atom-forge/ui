<script lang="ts">
    import ShowExample from "../../../components/doc/ShowExample.svelte";
    import "svelte-highlight/styles/tokyo-night-dark.css";
    import InlineCode from "../../../components/doc/InlineCode.svelte";
    import DocTitle from "../../../components/doc/DocTitle.svelte";
    import DocSubtitle from "../../../components/doc/DocSubtitle.svelte";
    import DocText from "../../../components/doc/DocText.svelte";
    import ApiBlock from "../../../components/doc/ApiBlock.svelte";
    import ApiTable from "../../../components/doc/ApiTable.svelte";
    import type { PropDef } from "../../../components/doc/ApiTable.svelte";

    import Example1 from "./examples/Example1.svelte";
    import example1 from "./examples/Example1.svelte?raw";
    import Example2 from "./examples/Example2.svelte";
    import example2 from "./examples/Example2.svelte?raw";
    import Example3 from "./examples/Example3.svelte";
    import example3 from "./examples/Example3.svelte?raw";

    const props: PropDef[] = [
        { group: 'Carousel', name: 'items', type: 'T[]', default: '[]', description: 'Array of slide data. Each item is passed to the <code>children</code> snippet.' },
        { group: 'Carousel', name: 'currentIndex', type: 'number', default: '0', description: 'Index of the active slide. Use <code>bind:currentIndex</code> to sync with external state or <code>CarouselIndicator</code>.' },
        { group: 'Carousel', name: 'showArrows', type: 'boolean', default: 'true', description: 'Show built-in previous / next arrow buttons.' },
        { group: 'Carousel', name: 'loop', type: 'boolean', default: 'false', description: 'Wrap around from the last slide to the first (and vice versa).' },
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

<DocTitle>Carousel</DocTitle>
<DocText>
    A horizontally scrollable slide container with scroll-snap, optional arrow navigation,
    and a companion <InlineCode>CarouselIndicator</InlineCode> for dot-based navigation.
    Both components sync through a shared <InlineCode>bind:currentIndex</InlineCode>.
</DocText>

<ApiBlock title="API">
    <ApiTable {props} />
</ApiBlock>

<div class="space-y-8 mt-8">
    <div>
        <DocSubtitle>Basic</DocSubtitle>
        <DocText>
            Provide an <InlineCode>items</InlineCode> array and a <InlineCode>children</InlineCode>
            snippet. Built-in arrow buttons handle navigation; scroll-snap keeps slides
            perfectly aligned.
        </DocText>
        <ShowExample component={Example1} code={example1} />
    </div>

    <div>
        <DocSubtitle>With Indicator</DocSubtitle>
        <DocText>
            Share <InlineCode>bind:currentIndex</InlineCode> between <InlineCode>Carousel</InlineCode>
            and <InlineCode>CarouselIndicator</InlineCode>. Clicking a dot scrolls the carousel;
            scrolling or swiping updates the active dot.
        </DocText>
        <ShowExample component={Example2} code={example2} />
    </div>

    <div>
        <DocSubtitle>External Controls</DocSubtitle>
        <DocText>
            Use <InlineCode>bind:this</InlineCode> to get a reference to the carousel instance and
            call <InlineCode>prev()</InlineCode>, <InlineCode>next()</InlineCode>, or
            <InlineCode>goTo(index)</InlineCode> from anywhere. Combine with <InlineCode>loop</InlineCode>
            for an infinite experience.
        </DocText>
        <ShowExample component={Example3} code={example3} />
    </div>
</div>
