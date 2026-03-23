# Migrate ui-pro controls into ui

## Kontextus

Az `@atom-forge/ui-pro` csomag megszűnik. Minden kontrollja bekerül az `@atom-forge/ui`-ba.

A pro projekt forrása: `/Users/elvis/WebstormProjects/atom-forge/ui-pro/src/lib/controls/`

---

## 1. Új függőségek – `package.json`

A pro projektnek vannak olyan `dependencies`, amelyek még nincsenek az ui-ban:

| Csomag | Verzió | Mire kell |
|---|---|---|
| `marked` | `^17.0.4` | ProseMarkdown, BlockViewMarkdown |
| `sheetclip` | `^0.3.0` | TableEditor (clipboard) |
| `svelte-highlight` | `^7.9.0` | DocShowCode, BlockViewCode – jelenleg csak `devDependencies`-ben van, át kell mozgatni `dependencies`-be |

---

## 2. Átmásolandó fájlok

Az alábbi mappákat kell a pro projektből átmásolni az ui `src/lib/controls/` alá (a mappaszerkezet megmarad):

### Editors
```
editors/block-editor/     -> src/lib/controls/editors/block-editor/
editors/diagram-editor/   -> src/lib/controls/editors/diagram-editor/
editors/img-editor/       -> src/lib/controls/editors/img-editor/
editors/markdown-editor/  -> src/lib/controls/editors/markdown-editor/
editors/table-editor/     -> src/lib/controls/editors/table-editor/
```

### Scheduling
```
scheduling/calendar/          -> src/lib/controls/scheduling/calendar/
scheduling/gantt/             -> src/lib/controls/scheduling/gantt/
scheduling/organizer/         -> src/lib/controls/scheduling/organizer/
scheduling/resource-manager/  -> src/lib/controls/scheduling/resource-manager/
```

### Content
```
content-doc/    -> src/lib/controls/content/doc/
content-prose/  -> src/lib/controls/content/prose/
```

> A `content-doc` és `content-prose` mappák `content/doc` és `content/prose` alá kerülnek, hogy egységes legyen a struktúrával. Az `index.ts` fájlokban lévő exportok maradnak változatlanul.

---

## 3. Import-útvonalak javítása

A pro fájlok egy része `@atom-forge/ui`-ból importál, mert az egy peer dependency volt. Az ui-ba kerülve ezeket relatív importra kell cserélni.

Érintett fájlok (16 db):

**editors/**
- `block-editor/BlockEditor.svelte`
- `block-editor/BlockItem.svelte`
- `block-editor/BlockView.svelte`
- `block-editor/blocks/BlockEditDiagram.svelte`
- `block-editor/blocks/BlockEditHeading.svelte`
- `block-editor/blocks/BlockEditYoutube.svelte`
- `diagram-editor/DiagramEditor.svelte`
- `img-editor/ImgEditor.svelte`
- `table-editor/TableEditor.svelte`

**scheduling/**
- `calendar/CalendarGrid.svelte`
- `calendar/DayCell.svelte`
- `calendar/EventBar.svelte`

**content/**
- `content-doc/DocApiBlock.svelte`
- `content-doc/DocShowCode.svelte`
- `content-doc/DocShowExample.svelte`
- `content-prose/ProseLinkCard.svelte`

Minden fájlban:
```ts
// volt:
import { Something } from '@atom-forge/ui';

// lesz:
import { Something } from '../../..'; // relatív út a src/lib/index.ts-hez
// vagy az adott almodul index.ts-éhez
```

---

## 4. `src/lib/index.ts` kiegészítése

Az alábbi export-sorokat kell hozzáadni az ui `index.ts` végéhez:

```ts
// Editors
export * from "./controls/editors/block-editor";
export * from "./controls/editors/diagram-editor";
export * from "./controls/editors/img-editor";
export * from "./controls/editors/markdown-editor";
export * from "./controls/editors/table-editor";

// Scheduling
export * from "./controls/scheduling/calendar";
export * from "./controls/scheduling/gantt";
export * from "./controls/scheduling/organizer";
export * from "./controls/scheduling/resource-manager";

// Content
export * from "./controls/content/doc";
export * from "./controls/content/prose";
```

---

## 5. `content/doc` és `content/prose` – belső index.ts frissítése

A két mappa `index.ts` fájljait frissíteni kell, mert az eredeti elérési útjuk megváltozik:

- `content-doc/index.ts` → `content/doc/index.ts` (az export paths maradnak)
- `content-prose/index.ts` → `content/prose/index.ts` (az export paths maradnak)

---

## 6. Ellenőrzés

```bash
cd ui
npm run check   # svelte-check – típushibák
npm run build   # sikeres build
```

---

## Feladatok összefoglalása

- [x] `marked`, `sheetclip` hozzáadása `dependencies`-hez; `svelte-highlight` átmozgatása `devDependencies`-ből `dependencies`-be
- [x] `editors/` mappa átmásolása
- [x] `scheduling/` mappa átmásolása
- [x] `content-doc/` + `content-prose/` átmásolása `content/doc/` és `content/prose/` alá
- [x] 16 fájlban `@atom-forge/ui` importok cseréje relatív importra
- [x] `src/lib/index.ts` kiegészítése az új exportokkal
- [x] `bun run check` + `bun run package` lefuttatása – 0 hiba, 0 warning
- [x] `@types/turndown` hozzáadása `devDependencies`-be
- [x] Dokumentáció frissítve (getting-started.md – prose + highlight CSS)
- [x] LICENSE fájl létrehozva
