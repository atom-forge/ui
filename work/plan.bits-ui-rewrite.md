---
status: active
tags: [frontend]
---

# Plan: bits-ui alapú komponens újraírás

Az atom-forge/ui komponenskönyvtár újraírása bits-ui primitívek alapján. A nehéz interakciós problémákat (a11y, keyboard nav, focus management, floating positioning) bits-ui-ra delegáljuk, az API-t configuration-based-en tartjuk. A vizuális stílus shadcn-szerű, a meglévő témarendszer (CSS custom properties + Tailwind) megmarad. Terjesztés: npm package.

**Megvalósítási stratégia:**
- Az új komponensek `src/lib/ui/` mappában jönnek létre — a jelenlegi `src/lib/controls/` érintetlen marad
- bits-ui import convention: `import * as BitsUI from "bits-ui"` — namespace-be zárva, nem interferál a saját komponensekkel
- A `src/lib/ui/` mappán belül ugyanaz a kategória-struktúra mint a `controls/`-ban: `general/`, `forms/`, `layout/`, `overlays/`, stb.
- Dependency: `bits-ui` hozzáadandó a `package.json` dependencies-hez (`bun add bits-ui`)
- Export: `src/lib/ui/index.ts` egy `UI` named object-et exportál; a főindex ezt re-exportálja: `export { UI } from './ui/index.js'`
- Használat: `import { UI } from '@atom-forge/ui'` → `<UI.Button .../>`, `<UI.Checkbox .../>` stb. — párhuzamosan él a jelenlegi flat exportokkal

**Fő architectural döntések:**
- bits-ui adja az interakciós alapot ahol van megfelelő primitív
- atom-forge konfigurációs API-t ad a bits-ui composition API fölé (Svelte 5 snippetek)
- Overlay komponensek (Popup, Modal, Drawer) imperatív/promise-alapú API-t tartanak — bits-ui fölé wrapper
- bits-ui Popover alatt Floating UI van → Popup pozicionálás is erre kerül
- TimePicker: native `<input type="time">` wrapper marad (bits-ui Time Field nem nyújt értéket a jelenlegi egyszerű API-hoz)
- DatePicker: bits-ui Date Picker belső `@internationalized/date` modelljét JS `Date`-re kell bridgelni

---

## BITSUI-01 Key Decisions

- bits-ui-nak nincs Button primitívje — natív `<button>` már akadálymentes, nem szükséges wrapper
- Button implementáció azonos a `controls/general/button/`-rel, csak az elérési út változott
- `src/lib/ui/index.ts` exportálja a `UI` named object-et; `src/lib/index.ts` re-exportálja
- bits-ui@2.18.1 telepítve, készen áll a következő fázisokhoz
- `/ui` dev route létrehozva (`src/routes/ui/+page.svelte`), relative importtal

---

## Fázisok

### BITSUI-01 — Button

Nem igényel bits-ui primitívet. Minden más komponens alapja.

**API (teljes megtartás):**
- Content: `label`, `icon`, `endIcon`, `children` snippet
- Variánsok (boolean flag-ek, az első igaz nyer): `destructive › secondary › ghost › link › muted › accent › primary`
- Style modifier: `outline` (bármely solid varianst bordered+transparent-re vált)
- Méretek: `compact` (h-8), `small` (h-6), `micro` (h-5); default: h-10
- Modifiers: `pill`, `grow`, `borderless`
- State: `disabled`, `loading: boolean | number` (number → progress bar 0–100)
- `onclick`, `class` (twMerge)
- Icon-only (csak `icon`, nincs label/endIcon/children) → automatikusan square

**Animációk:**
- Click pulse: `button-outline-fade-out` ring animáció
- Press/release: `scale-95` mousedown, elastic bounce release
- ButtonBar-ban és disabled-en mindkettő le van tiltva

---

### BITSUI-02 — Checkbox, Radio, Switch

**Checkbox → bits-ui Checkbox**

Komponensek: `Checkbox`, `CheckboxView` (render-only), `CheckboxGroupManager` (context provider), `createCheckboxGroupManager()`.

- `Checkbox` props: `value`/`checked` (bindable, mutuálisan kizáró), `onchange`, `label`, `disabled`, `primary`/`accent` (color variant), `compact`/`small`, `group`, `master`
- `CheckboxView` props: `status: 'checked'|'some'|'unchecked'`, `label`, `disabled`, `primary`/`accent`, `compact`/`small`, `onclick`
- `CheckboxGroupManager`: wrapper + `createCheckboxGroupManager()` function — state: Set per group, master indeterminate logika marad
- Méretek: normal (20px), compact (16px), small (14px)
- A11y: bits-ui kezeli (`aria-checked`, `aria-disabled`, keyboard)

**Radio → bits-ui Radio Group**

Komponensek: `RadioGroup`, `RadioButtonView`.

- `RadioGroup` props: `value` (bindable), `size: 'normal'|'compact'|'small'`, `primary`/`accent`, `class`
- `RadioButtonView` props: `value`, `label`, `disabled`, `class`; size context-ből öröklődik
- Color variant (`primary`/`accent`) a GroupManager-en van, minden childra érvényes

**Switch → bits-ui Switch**

- Props: `value`/`checked` (bindable, mutuálisan kizáró), `onchange`, `label: string | { on: string; off: string }` (crossfade on/off label), `icons: { on, off }` (csak normal méretben), `disabled`, `compact`/`small`, `class`
- Méretek: normal (w-11 h-6 / thumb h-5 w-5), compact (w-9 h-5), small (w-7 h-4)
- Icons: csak normal méretben látható

---

### BITSUI-03 — Slider, ProgressBar

**Slider / Range → bits-ui Slider**

Két export: `Slider` (single thumb), `Range` (double thumb).

- `Slider` props: `value: number` (default 50), `min`, `max`, `step`, `disabled`, `drawStops`, `compact`/`small`, `showValue: boolean | (v: number) => string`, `class`
- `Range` props: ugyanaz + `value: [number, number]` (default [25,75]), `distance: { min?, max? }`
- `showValue`: bubble a thumb felett húzás közben; function → custom formázás (pl. `v => v + ' %'`)
- `drawStops`: tick marks minden step-nél

**ProgressBar → bits-ui Progress**

- Props: `value`, `max` (default 100), `compact`/`small`, `class`
- Méretek: normal (h-4), compact (h-2.5), small (h-1.5)
- Accent fill, striped texture, smooth width transition

---

### BITSUI-04 — Avatar, AvatarGroup

**Avatar → bits-ui Avatar**

- Props: `name`, `src`, `color` (override auto-generált szín), `tooltip: boolean` (full name on hover, Tooltip komponensre épül), `compact`/`small`/`micro`, `class`
- Image fallback: `src` → `<img>`, különben initials + determinisztikus szín hash-ből (`name` alapján)
- Méretek: normal (h-10 w-10), compact (h-8 w-8), small (h-6 w-6), micro (h-5 w-5)

**AvatarGroup** — nincs bits-ui primitív, saját implementáció

- Horizontális stack, overlap, overflow indicator

---

### BITSUI-05 — Tooltip

**Tooltip → bits-ui Tooltip**

- Props: `label: string`, `content: Snippet` (precedence over label), `children: Snippet` (trigger elem), `delay: number` (default 1000ms), `immediate` (shorthand delay=0), `inverted`, `fixed`, `class`
- Default: cursor-követő pozíció; `fixed`: trigger elem bounding rect-hez rögzített, nem mozog
- Viewport flip: marad, Floating UI kezeli
- Portal: bits-ui portal → nincs clipping overflow container-ben

---

### BITSUI-06 — Accordion, Tabs

**Accordion → bits-ui Accordion**

Komponensek: `Accordion`, `AccordionItem`, `Collapsible`.

- `Accordion` props: `multiple`, `compact`/`small`, `borderless`, `joined`
- `AccordionItem` props: `title`, `icon`, `id` (random default), `class`
- `Collapsible` (standalone, nincs szülő Accordion): `title`, `icon`, `open` (bindable), `compact`/`small`, `borderless`
- Visual: separated (default) vs joined (dividers); borderless mode
- Méretek: normal (p-4), compact (p-2 text-sm), small (p-1 px-2 text-xs)

**Tabs → bits-ui Tabs**

Komponensek: `Tabs`, `TabList`, `Tab`, `TabPanels`, `TabPanel`.

- `Tabs` props: `initialTabId`, `variant: 'line'|'button'`, `onTabChange: (id) => void`, `children`
- `Tab` props: `id`, `children`
- `TabPanel` props: `id`, `children` — csak az aktív tab rendereli
- Variánsok: `line` (underline indicator), `button` (pill tabs secondary bg-en)

---

### BITSUI-07 — Popup

**Popup → bits-ui Popover + Floating UI**

Az imperatív/promise API teljes megtartása. bits-ui Popover/Floating UI veszi át a pozicionálást a saját frame-by-frame kalkuláció helyett.

**Exports:** `PopupContainer`, `createPopupManager()`, `getPopupManager()`, `PopupManager`

**PopupManager API:**
- `open.snippet(snippet, params, args, ref?)` → `Promise<any>`
- `open.component(component, params, args, ref?)` → `Promise<any>`
- `close()`, `resolve(value?)`, `closeRoot()`, `resolveRoot(value?)`

**Pozicionálási args** (`open.snippet` / `open.component` 3. paramétere):

| Property | Type | Leírás |
|---|---|---|
| `anchor` | `Element \| MouseEvent` | Elem-relatív pozíció |
| `pos` | `{ clientX, clientY }` | Cursor pozíció |
| `align` | `'auto'\|'left'\|'right'\|'both'\|'side'` | Horizontális igazítás |
| `offset` | `number` (default 4) | Pixel gap |
| `ref` | `any` | Dedup key — azonos ref esetén nem nyit újra |

Alignment mapping Floating UI-ba: `both` → `size` middleware (match anchor width); `side` → `placement: 'right-start'`; `auto` → flip based on viewport half.

**Nested popup hierarchy:** `PopupContainer`-en belüli `PopupContainer` saját child `PopupManager`-t hoz létre. Click propagation stop megmarad.

---

### BITSUI-08 — Select, MultiSelect

**Select → bits-ui Select / Combobox**

- Props: `value: string|number` (bindable), `options: SelectOptionsSource`, `placeholder`, `disabled`, `searchable`, `clearable`, `compact`/`small`, `class`
- Snippets: `trigger(opt: SelectOption)`, `option(opt, isHighlighted: boolean)`
- `SelectOptionsSource`: `SelectOption[]` | `{ search: (q) => Promise<SelectOption[]>, get: (values) => Promise<SelectOption[]> }`
- Async source: search-on-query + initial value resolution (get) — saját logika bits-ui fölé

**MultiSelect → bits-ui Listbox / Combobox**

- Props: `value: (string|number)[]` (bindable), `options: SelectOptionsSource`, `placeholder`, `disabled`, `searchable`, `clearable`, `sortable`, `max`, `compact`/`small`, `class`
- Snippets: `chip(opt, remove: () => void)`, `option(opt, isHighlighted: boolean)`
- `sortable`: drag-and-drop chip reorder (pragmatic-drag-and-drop marad)
- `max`: ennél több elem nem választható, a többiek greyed out
- Async source: ugyanaz mint Select-nél

---

### BITSUI-09 — ContextMenu

**ContextMenu → bits-ui Context Menu**

Deklaratív config API, PopupManager-en keresztül nyitható.

- Props: `config: ContextMenuItemConfig[]`
- Item típusok:
  - `{ separator: true }` — elválasztó
  - `{ label, icon?, warning?, disabled?, onclick: (e, manager) => void }` — akció
  - `{ label, icon?, warning?, disabled?, submenu: ContextMenuItemConfig[] }` — almenü (side align)
  - `{ label, icon?, warning?, disabled?, resolveWith: any }` — popup promise resolve
- `chevron` auto-megjelenik submenünél, force-olható
- bits-ui kezeli: keyboard nav, Escape, nested menu

---

### BITSUI-10 — Modal

**Modal → bits-ui Dialog**

Imperatív/promise API teljes megtartása. bits-ui Dialog adja: focus trap, Escape to close, portal, a11y.

**Export:** `getModalManager()`

**ModalManager API:**
- `modal.open(component, props?)` → `Promise<any>`
- `modal.openSnippet(snippet, props?)` → `Promise<any>`
- `modal.close(result?)` — legfelső modal bezárása, promise resolve
- `modal.resolve(result?)` — alias for close

**Stacking:** minden `open()` call új layert ad. `close()` mindig a legfelsőt zárja. Multi-step flow-khoz használható.

**Setup:** `<AtomForge>` automatikusan biztosítja, manuális setup nem kell.

---

### BITSUI-11 — Drawer

**Drawer → bits-ui Dialog (custom positioning + animáció)**

Imperatív/promise API teljes megtartása.

**Export:** `getDrawerManager()`

**DrawerManager API:**
- `drawer.open(component, props?, options?)` → `Promise<T>`
- `drawer.close(result?)`

**DrawerOptions:**

| Option | Type | Default | Leírás |
|---|---|---|---|
| `position` | `'left'\|'right'` | `'right'` | Melyik szélről csúszik be |
| `size` | `'sm'\|'md'\|'lg'\|'full'` | `'md'` | Panel szélesség |
| `closable` | `boolean` | `true` | Backdrop click zárja |

Méretek: sm=w-96 (384px), md=w-128 (512px), lg=w-192 (768px), full=w-full.

bits-ui Dialog adja: focus trap, Escape, portal, a11y. Slide-in/out animáció és oldalsó pozicionálás saját implementáció.

---

### BITSUI-12 — DatePicker, TimePicker, CodeInput

**DatePicker → bits-ui Date Picker**

- Props: `value: Date|null` (bindable), `format: (d: Date) => string`, `placeholder`, `disabled`, `clearable`, `min: Date`, `max: Date`, `weekStart: 0|1`, `disabledDates: Date[]`, `disabledDays: number[]`, `compact`/`small`, `class`
- bits-ui Date Picker belső `@internationalized/date` CalendarDate modelljét JS `Date`-re bridgeljük a prop rétegen
- Trigger stílusa: konzisztens Select-tel és Input-tal

**TimePicker — native wrapper (marad)**

bits-ui Time Field nem nyújt értéket a jelenlegi egyszerű native-wrapper API-hoz.

- Props: `value: string|null` (bindable, `"HH:MM"` vagy `"HH:MM:SS"`), `seconds`, `placeholder`, `disabled`, `clearable`, `round: false|0|5|10|15|20|30|number[]`, `compact`/`small`, `class`
- `round`: nearest interval snapping; `number[]` → snap to list
- Hidden `<input type="time">` + `showPicker()` pattern marad
- Szerkeszthető text field + clock icon trigger

**CodeInput → bits-ui PIN Input**

- Props: `value: string` (bindable, csak editable rész), `layout: number|number[]`, `separator: string` (default '-'), `prefix: string`, `characterSet: 'any'|'numeric'|'alpha'|'alphanumeric'|(char) => boolean`, `placeholder`, `uppercase`, `disabled`, `compact`/`small`, `onComplete: (value) => void`
- `layout` number array → csoportok separatorral elválasztva
- `prefix`: read-only előtag, `value` nem tartalmazza, paste automatikusan stripeli
- `onComplete`: minden box kitöltésekor tüzel (paste-en is)