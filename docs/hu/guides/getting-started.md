# Első lépések

A UI egy Tailwind CSS 4-re épülő Svelte 5 komponenskönyvtár. Komponálható, témázható UI-komponenseket ad, az alapvető inputoktól és gomboktól az overlay-eken és diagramokon át az adattáblákig.

Ez az oldal az angol nyelvű [`../../en/guides/getting-started.md`](../../en/guides/getting-started.md) magyar fordítása; eltérés esetén az angol változat a mérvadó.

Kódoló AI-ágensek: feladatalapú olvasási sorrendért kezdjétek az [AI Consumer Entry Point](../../../README-AI.md) oldallal. Ha nem a könyvtárat konfigurálod, hanem komponenst választasz, használd a [képességtérképet](./component-overview.md#választás-feladat-szerint).

---

## Követelmények

- Svelte 5
- SvelteKit
- Tailwind CSS 4

A Svelte és a SvelteKit deklarált peer dependency. A Tailwind CSS 4 a felhasználó alkalmazás stílusbeállításának része. A könyvtár a `lucide-svelte`-et és a `tailwind-merge`-et dependencyként deklarálja; ha az alkalmazásod bármelyiket közvetlenül importálja, vedd fel az alkalmazás saját függőségei közé is.

### Opcionális: prose komponensek (`content/prose`)

A `ProseMarkdown`, `ProsePage`, `ProseCallout` és a kapcsolódó komponensek Tailwind typography osztályokat renderelnek. Használatukhoz telepítsd a `@tailwindcss/typography` csomagot, és add hozzá a CSS-edhez:

```bash
npm install @tailwindcss/typography
```

```css
/* src/app.css */
@plugin "@tailwindcss/typography";
```

A plugin nélkül a prose komponensek tipográfiai stílus nélkül jelennek meg.

### Opcionális: kódkiemelés (`DocShowCode`)

A `DocShowCode` a `svelte-highlight`-ot használja szintaxiskiemelésre. A könyvtár a kiemelő logikát tartalmazza, a téma CSS-ét viszont **nem** — témát neked kell importálnod. Ha a `svelte-highlight`-ot közvetlenül importálod, vedd fel az alkalmazás függőségei közé:

```ts
// e.g. in your layout or app entry
import 'svelte-highlight/styles/github-dark.css';
```

Az elérhető témák listája a [`svelte-highlight` dokumentációjában](https://github.com/metonym/svelte-highlight#styles) található.

---

## Telepítés

```bash
npm install @atom-forge/ui
```

---

## CSS beállítása

Először építsd be a Tailwind CSS 4-et az alkalmazásod buildjébe (például telepítsd a `tailwindcss` és a `@tailwindcss/vite` csomagot, és regisztráld a Tailwind plugint a `vite.config.ts`-ben a SvelteKit plugin mellett). Az `@atom-forge/ui` telepítése önmagában nem dolgozza fel a Tailwind direktívákat.

Ezután add hozzá ezeket a sorokat az alkalmazásod CSS belépési pontjához (`src/app.css`):

```css
@import "tailwindcss";

/* 1. Import semantic tokens and base styles */
@import "../node_modules/@atom-forge/ui/dist/core/theme.css";

/* 2. Tell Tailwind to scan the library for utility classes */
@source "../node_modules/@atom-forge/ui/dist";

/* 3. Ensure your own project files are scanned */
@source ".";
```

A `node_modules`-ra mutató `@source` direktíva kötelező, mert a Tailwind CSS 4 alapértelmezésben nem vizsgálja a `node_modules`-t. Nélküle az **atom-forge** komponensekben használt utility osztályok nem kerülnek be a bundle-be.

Az `@atom-forge/ui/dist/core/theme.css` definiálja a szemantikus színtokeneket, a felületi rétegeket és azokat az utility osztályokat, amelyekre minden komponens épít.

---

## Layout beállítása

Importáld a CSS-t, és csomagold a gyökér layoutot `<Root>`-ba. Ez az egyetlen komponens:

- regisztrálja az összes overlay managert (Modal, Toast, Drawer, Popup);
- biztosítja a téma állapotát, és a változásokat `localStorage`-ba menti; a kezdeti preferencia felismeréséhez az alábbi, alkalmazásszintű script kell;
- rendereli a portal célpontokat és az overlay containereket.

```sveltehtml
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { Root } from '@atom-forge/ui';
  let { children } = $props();
</script>

<Root>
  {@render children()}
</Root>
```

### A Root propjai

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `children` | `Snippet` | — | A téma- és overlay-providerek alatt renderelt tartalom. |
| `manageBodyStyle` | `boolean` | `true` | A canvas háttér- és szövegszínét alkalmazza a `document.body`-ra. |

A Rootnak nincs `dark` vagy `light` propja. Mountoláskor a téma állapotát a `<html>` elem `dark` osztályából inicializálja, nem közvetlenül a mentett preferenciákból vagy a `prefers-color-scheme`-ből. Telepítsd az alábbi [előtöltő scriptet](#villanás-elkerülése-betöltéskor), hogy ezek a preferenciák még a Root mountolása előtt érvényesüljenek; enélkül egy kezdetben osztály nélküli dokumentum világos témával indul.

---

## Komponensek importálása

Minden komponens a csomag gyökeréből exportálódik:

```ts
import { Button, Input, Card, Select, Switch } from '@atom-forge/ui';
```

### Alternatíva: a UI névtér

A lapos `UI` objektum ugyanazokat a publikus komponenseket és UI manager függvényeket adja egyetlen importtal. A meglévő implementációkra hivatkozik; a nevesített exportok továbbra is elérhetők, és keverhetők a névtér használatával.

```sveltehtml
<script lang="ts">
  import { UI } from '@atom-forge/ui';
  let enabled = $state(false);
</script>

<UI.Root>
  <UI.Button label="Save"/>
  <UI.Checkbox label="Enabled" bind:value={enabled}/>
</UI.Root>
```

A contexthez kötött API-k is elérhetők, köztük a `UI.getThemeManager()`, `UI.getModalManager()`, `UI.getDrawerManager()`, `UI.getPopupManager()`, `UI.getToastManager()`, `UI.getCheckboxGroupManager()` és `UI.getBlockAPI()`. A meglévő manager-létrehozó és context-beállító függvények is benne vannak.

A managereket a megfelelő provideren (`Root` vagy `CheckboxGroupManager`) **belül** lévő komponens inicializálásakor kérd le, majd eseménykezelőkből hívd őket. A névtér nem hoz létre globális manager-példányokat, és nem változtat a context-követelményeken.

```sveltehtml
<!-- A child component rendered inside UI.Root -->
<script lang="ts">
  import { UI } from '@atom-forge/ui';

  const toast = UI.getToastManager();
</script>

<UI.Button label="Notify" onclick={() => toast.show('File saved!', { type: 'success' })}/>
```

Dialógusokhoz inicializáláskor kérd le a `const modal = UI.getModalManager()` managert, majd eseménykezelőből hívd a meglévő `await modal.open(DialogComponent, props)` API-t. A drawer és popup managerek ugyanígy működnek, mint a nevesített exportként elérhető megfelelőik.

A típusok, az általános segédfüggvények (például a `debounce`) és az utility névterek továbbra is külön nevesített exportok. Nincs `UI.Modal` komponens: a meglévő modal API a `UI.ModalContainer`-ből és a modal manager függvényeiből áll.

A névtér tulajdonságai TypeScriptben readonly-k, és megőrzik az eredeti komponens- és függvénytípusokat. Mivel az objektum a teljes komponensgyűjteményre hivatkozik, a névtér használatakor több kód maradhat a bundle-ben, mint közvetlen nevesített importokkal. Ha fontos a bundle méretének minimalizálása, a nevesített importokat válaszd; azonos tree-shaking nem garantált.

---

## Az első komponensed

```sveltehtml
<script lang="ts">
  import { Button } from '@atom-forge/ui';
  import { Plus, Trash } from 'lucide-svelte';
</script>

<Button label="Add item" icon={Plus}/>
<Button label="Delete" destructive/>
<Button label="Cancel" ghost/>
<Button icon={Trash} destructive compact/>
```

---

## Sötét mód

A `getThemeManager()` bárhol elérhető a `<Root>` fán belül. Közvetlenül a `theme.dark`-ot bindold:

```sveltehtml
<script lang="ts">
  import { getThemeManager, Switch } from '@atom-forge/ui';
  import { Moon, Sun } from 'lucide-svelte';

  const theme = getThemeManager();
</script>

<Switch bind:value={theme.dark} icons={{ on: Moon, off: Sun }}/>
```

### Villanás elkerülése betöltéskor

További lépések nélkül a sötét módot használók egy pillanatra fehér oldalt látnak, mielőtt a mentett preferencia érvényesül — ez a klasszikus FOUC. Ennek elkerüléséhez tegyél egy kis blokkoló scriptet az `app.html`-be a `%sveltekit.head%` **elé**. Ez szinkron módon kiolvassa a `localStorage`-t, és az első kirajzolás előtt hozzáadja a `dark` osztályt a `<html>`-hez:

```html
<!-- src/app.html -->
<head>
  <!-- Add this BEFORE %sveltekit.head% -->
  <script>
    (function() {
      try {
        var saved = localStorage.getItem('dark');
        if (saved !== null) {
          if (JSON.parse(saved)) document.documentElement.classList.add('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  </script>
  %sveltekit.head%
</head>
```

A script szándékosan blokkolja a renderelést (nincs `async`/`defer`), így mindig lefut, mielőtt bármilyen tartalom megjelenne. A `try/catch` azokat a környezeteket kezeli, ahol a `localStorage` nem érhető el (például szigorú beállítású privát böngészés).

---

## Overlay managerek

A Root négy imperatív managert ad az overlay UI-hoz. A Modal és a Drawer megnyitó API-jai eredmény-promise-t adnak vissza; a Popup megnyitó API-jai szintén promise-t adnak, a cseréhez és a függőben lévő megnyitásokhoz kapcsolódó korlátokat a [Popup](../controls/overlays/popup.md#beállítás-és-korlátok) oldal írja le. A Toast `show()` metódusa azonosítót ad vissza. Minden context gettert egy leszármazott komponens inicializálásakor kérj le, a managereket pedig eseménykezelőkben használd.

### Toast

```ts
const toast = getToastManager();
toast.show('File saved!', { type: 'success' });
toast.show('Upload failed.', { type: 'error', duration: 0 });
```

### Modal

```ts
const modal = getModalManager();
const result = await modal.open(ConfirmDialog, { message: 'Delete this?' });
```

### Drawer

```ts
const drawer = getDrawerManager();
const result = await drawer.open(SettingsPanel, {}, { position: 'right', size: 'normal' });
```

### Popup

```ts
const popup = getPopupManager();
const result = await popup.open.component(ContextMenu, { config: [...] }, { anchor: event });
```

Egyikhez sem kell kézzel containert elhelyezni a `<Root>` alatt. A Root nem végez alkalmazásszintű validációt, és nem biztosít teljes overlay-akadálymentességet; lásd: [Overlay-ek](./overlays.md#az-alkalmazás-feladatai).

---

## Következő lépések

- [Színrendszer](./color-system.md) — szemantikus színtokenek, sötét/világos téma
- [Button](../controls/general/button.md) — a leggyakrabban használt komponens teljes prop-referenciája
- [Modal](../controls/overlays/modal.md) — az aszinkron modal minta részletesen
- [Table](../controls/data/table.md) — generikus, típusos adattábla
- [Űrlapok](./forms.md) — címkézett inputok és helyi validáció
- [Overlay-ek](./overlays.md) — kiválasztás és context-biztos kompozíció
- [Adatmegjelenítés](./data-display.md) — szűrés, lapozás és üres állapotok
- [Rendezhető listák](./sortable-lists.md) — átrendezés és listák közötti áthelyezés

---

## Közösség

Iratkozz fel a **[Substackünkre](https://atomforge.substack.com)**, hogy értesülj a legújabb kiadásokról, komponensfrissítésekről és architekturális beszélgetésekről.
