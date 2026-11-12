# Tabs

Fülnavigáció két vizuális változattal (`line` és `button`). Kombinálható komponensekből áll: `Tabs`, `TabList`, `Tab`, `TabPanels` és `TabPanel`.

## Importálás

```ts
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@atom-forge/ui';
```

---

## Komponensek

| Komponens | Leírás |
|-----------|-------------|
| `Tabs` | Context provider. Nyilvántartja az aktív fület. |
| `TabList` | A fülgombok sorát jeleníti meg. A stílusa a `variant`-tól függ. |
| `Tab` | Egy fülgomb. |
| `TabPanels` | A panelterület wrappere. |
| `TabPanel` | Egy fül tartalompanelje. Csak akkor renderelődik, ha a füle aktív. |

---

## Tabs propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `initialTabId` | `string` | — | A mountoláskor aktív fül azonosítója. |
| `variant` | `'line' \| 'button'` | `'line'` | Vizuális stílus. `line` = aláhúzás jelzi az aktív fület; `button` = pill fülek másodlagos háttéren. |
| `onTabChange` | `(id: string) => void` | — | Minden alkalommal hívódik, amikor az aktív fül megváltozik. |
| `children` | `Snippet` | — | `TabList` + `TabPanels` szerkezet. |

---

## Tab propok

| Prop | Típus | Leírás |
|------|------|-------------|
| `id` | `string` | Egyeznie kell a hozzá tartozó `TabPanel` id-jával. |
| `children` | `Snippet` | A fül címkéjének tartalma. |

---

## TabPanel propok

| Prop | Típus | Leírás |
|------|------|-------------|
| `id` | `string` | Egyeznie kell a hozzá tartozó `Tab` id-jával. |
| `children` | `Snippet` | A panel tartalma; csak akkor renderelődik, ha ez a fül aktív. |

---

## Használat

```sveltehtml
<Tabs initialTabId="overview">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="details">Details</Tab>
    <Tab id="history">History</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="overview">
      <p>Overview content</p>
    </TabPanel>
    <TabPanel id="details">
      <p>Details content</p>
    </TabPanel>
    <TabPanel id="history">
      <p>History content</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Button változat

```sveltehtml
<Tabs initialTabId="a" variant="button">
  <TabList>
    <Tab id="a">Alpha</Tab>
    <Tab id="b">Beta</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="a">Alpha panel</TabPanel>
    <TabPanel id="b">Beta panel</TabPanel>
  </TabPanels>
</Tabs>
```

### Kontrollált (külső callback fülváltáskor)

```sveltehtml
<Tabs initialTabId="a" onTabChange={(id) => console.log('Active:', id)}>
  ...
</Tabs>
```

## Mikor használd

Ugyanazon a nézeten belül több egyenrangú tartalompanel közül egy kiválasztására.

## Alternatívák

Egymástól függetlenül lenyitható szakaszokhoz az [Accordion](accordion.md), lépésenkénti előrehaladáshoz a [Stepper](stepper.md), route-navigációhoz linkek valók.

## Beállítás és korlátok

A Tab, a TabList, a TabPanel és a TabPanels a Tabs leszármazottja kell legyen, mert az adja a contextet; Root nem kell. Az initialTabId kötelező, és csak egyszer olvassa be, ahogy a variantot is. Nincs binding az aktív azonosítóra: az `onTabChange` a kiválasztási hívásokat jelzi, és a már aktív fülre kattintáskor is lefuthat. Az initialTabId későbbi módosítása nem választ ki másik fület. Az inaktív panelek unmountolódnak, ezért a megőrzendő állapotot vidd a panelek fölé. A TabPanels opcionális `smooth` propja animálja a mért magasságot, és fülváltáskor visszaállítja a görgetést; a `scrollClass` ennek a scroll wrappernek a stílusa. A Tabs nem valósítja meg a tablist/tab/tabpanel ARIA-szerepeket, a roving focust és a nyílbillentyűs navigációt.
