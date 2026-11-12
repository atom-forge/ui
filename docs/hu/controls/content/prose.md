# Prose komponensek

Komponálható cikktipográfia, Markdown, callout-ok, idézetek, linkkártyák és YouTube-előnézetek.

## Importálás

```ts
import { ProsePage, ProseParagraph, ProseDivider, ProseBlockQuote,
  ProseCallout, ProseLinkCard, ProseMarkdown, ProseText, ProseTitle,
  ProseYoutubeEmbed } from '@atom-forge/ui';
```

## Mikor használd

Csak olvasható cikkekhez és strukturált szöveges tartalomhoz.

## Alternatívák

API-/forráskód-referenciákhoz a [Doc](./doc.md)-ot használd. Markdown vagy strukturált dokumentumok szerkesztéséhez a [Brickee](https://github.com/atom-forge/brickee)-t.

## Beállítás

A könyvtár CSS-éhez kövesd az [Első lépések](../../guides/getting-started.md) leírását. A prose stílusokhoz telepítsd a `@tailwindcss/typography` csomagot, és add hozzá a `@plugin "@tailwindcss/typography";` sort a Tailwind CSS belépési pontodhoz. Prose-specifikus providerre nincs szükség.

## Minimális példa

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

## Működés

A `ProseMarkdown` a megadott `children` snippetet előnyben részesíti a `content`-tel szemben. Egyébként a nem üres Markdownt a `marked`-del dolgozza fel, és beszúrja az eredményül kapott HTML-t. A callout tartalma szintén Markdown. A `ProseLinkCard` új fülön nyílik meg `noopener noreferrer` beállítással; a metaadatokat te adod meg, nem töltődnek le. A `ProseYoutubeEmbed` először csak egy bélyegképet tölt be, és aktiválás után hoz létre automatikusan induló iframe-et.

## API

| Export | Propok |
|---|---|
| `ProsePage`, `ProseParagraph`, `ProseText` | Kötelező: `children: Snippet`; opcionális: `class: string`. A `ProseText` a további attribútumokat is továbbadja. |
| `ProseTitle` | Kötelező: `children: Snippet`; opcionális: `subtitle: string`, `level: 1 \| 2 \| 3 = 1`, `class: string`. |
| `ProseDivider` | Nincs deklarált propja. |
| `ProseBlockQuote` | Kötelező: `quote: string`; opcionális: `author: string`. |
| `ProseCallout` | Opcionális: `variant: 'note' \| 'warning' \| 'tip' \| 'success' \| 'info' \| 'error' = 'note'`, `icon: string`, `title: string`, `content: string`. |
| `ProseLinkCard` | Kötelező: `url: string`; opcionális `title`, `description`, `favicon` stringek. |
| `ProseMarkdown` | Opcionális: `content: string`, `children: Snippet`. |
| `ProseYoutubeEmbed` | Opcionális `videoId`, `url`, `title` stringek. A kifejezetten megadott `videoId` elsőbbséget élvez. |

Callout ikonnevek: `Info`, `TriangleAlert`, `CircleCheck`, `CircleX`, `CircleAlert`, `Lightbulb`, `Zap`, `Star`, `BookOpen`, `MessageCircle`, `Shield`, `Flag`, `Bell`, `Heart`, `Eye`, `Lock`, `Flame`, `Rocket`, `Pin`, `Megaphone`, `Bookmark`. Ismeretlen név esetén `Info` lesz.

## Korlátok

A Markdownból készült HTML **nincs szanitizálva**. Csak megbízható tartalmat renderelj, vagy alkalmazz alkalmazásszintű szanitizálási szabályt, mielőtt ide kerül; szanitizáló prop nincs. A link URL-eket magad validáld. A YouTube-bélyegképek az `img.youtube.com`-ot, a lejátszás a `www.youtube.com`-ot éri el, ezért gondolj a CSP-re, a hálózati hozzáférésre és a felhasználók adatvédelmére. Az URL-kinyerés a `v` query paramétert és a `youtu.be` útvonalakat támogatja, nem minden YouTube URL-formátumot. A `ProseMarkdownContent` belső komponens, nem gyökérszintű export.

Forrás: `src/lib/controls/content/prose/index.ts` és az exportált komponensfájlok.
