# Prose components

Composable article typography, Markdown, callouts, quotations, link cards, and YouTube previews.

## Import

```ts
import { ProsePage, ProseParagraph, ProseDivider, ProseBlockQuote,
  ProseCallout, ProseLinkCard, ProseMarkdown, ProseText, ProseTitle,
  ProseYoutubeEmbed } from '@atom-forge/ui';
```

## When to use

Use for read-only articles and structured narrative content.

## Alternatives

Use [Doc](./doc.md) for API/source references, [MarkdownEditor](../editors/markdown-editor.md) for editing Markdown, or [BlockEditor](../editors/block-editor.md) for editable structured documents.

## Setup

Follow [Getting Started](../../guides/getting-started.md) for library CSS. Install `@tailwindcss/typography` and add `@plugin "@tailwindcss/typography";` to your Tailwind CSS entry for prose styling. No Prose-specific provider is needed.

## Minimal example

```sveltehtml
<script lang="ts">
  import { ProsePage, ProseTitle, ProseParagraph, ProseText, ProseDivider,
    ProseBlockQuote, ProseCallout, ProseLinkCard, ProseMarkdown,
    ProseYoutubeEmbed } from '@atom-forge/ui';
</script>

<ProsePage>
  <ProseTitle subtitle="A short introduction">Project notes</ProseTitle>
  <ProseParagraph>Keep this page focused on the reader.</ProseParagraph>
  <ProseText><p>This region accepts composed markup.</p></ProseText>
  <ProseDivider/>
  <ProseBlockQuote quote="Make the important things clear." author="Team"/>
  <ProseCallout variant="tip" title="Tip" content="Use **short** sections."/>
  <ProseMarkdown content="## Next steps\nRead the project reference."/>
  <ProseLinkCard url="https://example.com" title="Reference"/>
  <ProseYoutubeEmbed videoId="aqz-KE-bpKQ" title="Example video"/>
</ProsePage>
```

## Behavior

`ProseMarkdown` renders a supplied `children` snippet in preference to `content`. Otherwise it parses nonempty Markdown with `marked` and inserts the resulting HTML. Callout content also uses Markdown. `ProseLinkCard` opens a new tab with `noopener noreferrer`; metadata is supplied by you, not fetched. `ProseYoutubeEmbed` initially loads a thumbnail and creates an autoplay iframe after activation.

## API

| Export | Props |
|---|---|
| `ProsePage`, `ProseParagraph`, `ProseText` | Required `children: Snippet`; optional `class: string`. `ProseText` also forwards additional attributes. |
| `ProseTitle` | Required `children: Snippet`; optional `subtitle: string`, `level: 1 \| 2 \| 3 = 1`, `class: string`. |
| `ProseDivider` | No declared props. |
| `ProseBlockQuote` | Required `quote: string`; optional `author: string`. |
| `ProseCallout` | Optional `variant: 'note' \| 'warning' \| 'tip' \| 'success' \| 'info' \| 'error' = 'note'`, `icon: string`, `title: string`, `content: string`. |
| `ProseLinkCard` | Required `url: string`; optional `title`, `description`, `favicon` strings. |
| `ProseMarkdown` | Optional `content: string`, `children: Snippet`. |
| `ProseYoutubeEmbed` | Optional `videoId`, `url`, `title` strings. Explicit `videoId` takes precedence. |

Callout icon names: `Info`, `TriangleAlert`, `CircleCheck`, `CircleX`, `CircleAlert`, `Lightbulb`, `Zap`, `Star`, `BookOpen`, `MessageCircle`, `Shield`, `Flag`, `Bell`, `Heart`, `Eye`, `Lock`, `Flame`, `Rocket`, `Pin`, `Megaphone`, `Bookmark`. Unknown names fall back to `Info`.

## Limitations

Markdown HTML is **not sanitized**. Only render trusted content or apply an application-level sanitization policy before this surface; no sanitizer prop exists. Validate link URLs yourself. YouTube thumbnails contact `img.youtube.com`; playback contacts `www.youtube.com`, so consider CSP, network access, and user privacy. URL extraction supports `v` query parameters and `youtu.be` paths, not every YouTube URL format. `ProseMarkdownContent` is internal and is not a root export.

Source: `src/lib/controls/content/prose/index.ts` and exported component files.
