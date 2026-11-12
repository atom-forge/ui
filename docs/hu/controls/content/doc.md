# Doc komponensek

Megjelenítő vezérlők API-referenciákhoz, kiemelt forráskódhoz és élő példákhoz. Ezek publikus exportok, nem automatikus dokumentációgenerátor.

## Importálás

```ts
import { DocApiBlock, DocApiTable, DocInlineCode, DocShowCode, DocShowExample,
  type PropDef, type CodeFile } from '@atom-forge/ui';
```

## Mikor használd

Komponens-referenciaoldalak építéséhez, kifejezetten megadott prop-metaadatokkal és forráspéldákkal.

## Alternatívák

Szöveges tartalomhoz a [Prose](./prose.md)-t, stílus nélküli referenciához sima szemantikus HTML-t használj.

## Beállítás

Alkalmazd a könyvtár CSS-beállítását az [Első lépések](../../guides/getting-started.md) szerint. Importálj egy `svelte-highlight` témát az alkalmazás belépési pontján, például `import 'svelte-highlight/styles/github-dark.css'`. A kiemelő nem adja automatikusan a téma CSS-ét. Doc-specifikus context providerre nincs szükség.

## Minimális példa

```sveltehtml
<script lang="ts">
  import { DocApiBlock, DocApiTable, DocInlineCode, DocShowCode,
    DocShowExample, type PropDef, type CodeFile } from '@atom-forge/ui';
  const props: PropDef[] = [
    { name: 'label', type: 'string', description: 'Visible text.', default: "''" }
  ];
  const files: CodeFile[] = [
    { name: 'example.ts', language: 'typescript', code: "const label = 'Save';" }
  ];
</script>

<p>Set <DocInlineCode>label</DocInlineCode> to the visible text.</p>
<DocApiBlock title="Props"><DocApiTable {props}/></DocApiBlock>
<DocShowCode code={files} title="Source"/>
<DocShowExample code="const label = 'Save';"/>
```

A példa szándékosan hagyja el a `component`-et. Élő demóhoz adj át egy importált, önálló Svelte komponenst: `component={Demo}`. A `DocShowExample` propok nélkül példányosítja; a szükséges értékeket magában a demókomponensben állítsd be.

## Működés

- A `DocApiTable` szakaszokra bontja az egymást követő bejegyzéseket, amikor a `group` megváltozik. A `name` nélküli bejegyzések sor létrehozása nélkül is nyithatnak új szakaszt.
- A leírások felismerik a szó szerinti `<code>...</code>` szakaszokat; ez nem általános HTML-renderelő.
- A `DocShowCode` több fájlnál füleket és összecsukható forráspanelt használ.
- A `DocShowExample` egy opcionális élő komponenst egy forráskódos accordionnal kombinál.

## API

| Export | Propok |
|---|---|
| `DocApiBlock` | Kötelező: `title: string`, `children: Snippet`; opcionális: `class: string`. |
| `DocApiTable` | Kötelező: `props: PropDef[]`. |
| `DocInlineCode` | Kötelező: `children: Snippet`; opcionális: `class`; a további propokat továbbadja az elemének. |
| `DocShowCode` | Kötelező: `code: string \| CodeFile[]`; opcionális: `file: string`, `title: string`, `open: boolean = true`, `class: string`. |
| `DocShowExample` | Kötelező: `code: string \| CodeFile[]`; opcionális: `component: Component`, `class: string`. |

A `PropDef` opcionális string mezői: `name`, `type`, `description`, `default` és `group`. A `CodeFile` alakja `{ name: string; language?: string; code: string }`.

A támogatott nyelvkulcsok: `typescript`, `javascript`, `python`, `css`, `xml`, `bash`, `shell`, `json`, `sql`, `rust`, `go`, `java`, `kotlin`, `swift`, `cpp`, `markdown`, `yaml`, `php`, `dockerfile`, `plaintext` és `svelte`. Ha nincs megadva nyelv, TypeScript lesz; ismeretlen kulcsnál plaintext. A `svelte` kulcs jelenleg a TypeScript nyelvtant használja.

## Korlátok

A metaadatokat kézzel kell megírni, és ezek a vezérlők nem vetik össze őket a komponens propjaival. A string `code` inputnak nincs nyelv propja; nyelv választásához `CodeFile[]`-t használj. Az élő demók nem kapnak props objektumot. Ne keverd össze a `CodeFile`-t (`name`, `code`) a block editor `BlockCodeFile` típusával (`filename`, `source`).

Forrás: `src/lib/controls/content/doc/index.ts` és az öt exportált `.svelte` fájl.
