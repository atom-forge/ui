# Process Editor — Implementation Plan

## Technical decisions

- **Node rendering**: HTML `div`-ek (flexbox portok, drag könnyebb)
- **Edge rendering**: SVG overlay (a HTML canvas fölé pozicionálva, pointer-events csak az éleken)
- **State**: egyetlen `$state` Svelte store (`process-editor.svelte.ts`)
- **Auto-layout**: [Dagre](https://github.com/dagrejs/dagre) könyvtár
- **History**: Command pattern — minden mutáció egy `do/undo` párból áll, stack-be push-olva

---

## M1 — Statikus vászon és node renderelés

**Cél**: Egy `config` + `data` JSON-t beadva a komponensnek, az helyesen rendereli a hálózatot. Még nincs interakció.

- `ProcessEditor.svelte` — wrapper komponens, fogadja a `config` és `data` propokat
- `PECanvas.svelte` — a görgethető/nagyítható vászon (`transform: translate + scale` CSS-sel)
  - Pan: egérgomb nyomva tartva + húzás
  - Zoom: scroll esemény, 25%–200% clamp, zoom a kurzor pozíciójára
- `PENode.svelte` — egy node vizuális megjelenítése
  - Fejléc: típusnév, szín, serial number
  - Label (felhasználói név)
  - Bal oldal: input portok (névvel)
  - Jobb oldal: output portok (névvel)
- `PEPort.svelte` — egy port (pont + label)
- `process-editor.svelte.ts` — reaktív state: nodes, edges, config index
- Típusok: `pe.types.ts`

**Elfogadási kritérium**: A data JSON node-jait és portjait helyesen jeleníti meg; pan és zoom működik.

---

## M2 — Node interakció

**Cél**: A node-ok mozgathatók, kijelölhetők, törölhetők; az Edit gomb eseményt süt ki.

- Drag & drop: `pointerdown/move/up` a node fejlécén; koordinátát a canvas transform-jával korrigálni (zoom-aware)
- Kijelölés: kattintásra `selectedNodeIds: Set<string>` frissül; Shift+klik = multi-select
- Törlés:
  - Node-on lévő X gomb
  - `Delete` / `Backspace` billentyű a kijelölt node-okra + összes kapcsolódó élükre
- Edit gomb → `onEditClick(nodeId, nodeData)` event
- `onNodeChange(nodeId, newData)` — pozícióra debounce (100ms)
- `onNodeDelete(nodeId)` event

**Elfogadási kritérium**: Node húzható, törlhető gombbal és billentyűvel; Edit gomb eseményt dob.

---

## M3 — Edge rajzolás és típusrendszer

**Cél**: Portok összeköthetők egérrel; a szerkesztő érvényesíti a típuskompatibilitást és a limit szabályokat.

- SVG overlay a canvas fölött (teljes méret, `pointer-events: none` alapban)
- `PEEdge.svelte` — step-rounded SVG path (`M x1,y1 C ...` cubic-bezier derékszögű könyökökkel)
- Él húzás (`draft edge`):
  - Output porton `pointerdown` → `draftEdge` state (forrás rögzített, cél az egér pozíciója)
  - Kompatibilis célport fölé érve highlight + snapping
  - `pointerup` célporton → validáció → él létrehozás vagy elvetés
- **Validáció** (él létrehozás előtt):
  1. Forrás output típusai ∩ cél input típusai ≠ ∅
  2. A célbemenet még nem foglalt (max 1 él per input port)
- Port hover → az összes kapcsolódó él kiemelése (`highlightedEdgeIds`)
- Él törlés: élre kattintva kijelölés, Delete billentyű vagy X gomb
- `onEdgeConnect(source, target)` és `onEdgeDelete(edgeId)` eventek

**Elfogadási kritérium**: Kompatibilis portok köthetők; inkompatibilis vagy már foglalt port esetén az él elvetésre kerül; port hoverkor az élek kiemelődnek.

---

## M4 — History (Undo/Redo) és Copy/Paste

**Cél**: Minden szerkesztési művelet visszavonható; node-ok duplikálhatók.

### History

Command pattern: minden mutáció egy `{ do(), undo() }` objektum.

```ts
type Command = { do: () => void; undo: () => void }
let undoStack: Command[] = $state([])
let redoStack: Command[] = $state([])
```

Érintett műveletek: node mozgatás, él létrehozás, él törlés, node törlés, node hozzáadás, copy/paste.

- `Ctrl+Z` → `undoStack.pop().undo()`, push redoStack-re
- `Ctrl+Y` / `Ctrl+Shift+Z` → `redoStack.pop().do()`, push undoStack-re
- Bármely normál akció → redoStack ürítése

### Copy/Paste

- `Ctrl+C` → kijelölt node-ok adatait clipboard-state-be másolja
- `Ctrl+V` → minden másolt node-ra:
  - Új UUID
  - Új serial number (típus szerint max + 1)
  - Pozíció: eredeti + (20px, 20px) offset
  - Paraméterek és doc megőrizve, élek nem másolódnak

**Elfogadási kritérium**: Node mozgatás, él létrehozás/törlés, node törlés/hozzáadás visszavonható és újra végrehajtható; Ctrl+V duplikál új azonosítókkal.

---

## M5 — Speciális node-ok

**Cél**: System Input/Output és Teleport node-ok teljes körű támogatása.

### System Input / System Output

- Beépített, fix típusok — nem a `config.nodeTypes`-ból jönnek
- `PENodeSystemInput.svelte` / `PENodeSystemOutput.svelte` — egyedi vizuális megjelenés (pl. lekerekített, más alak)
- System Input: csak output portok; System Output: csak input portok
- Toolbar-ból helyezhetők le

### Teleport

- `PENodeTeleportIn.svelte` / `PENodeTeleportOut.svelte`
- Teleport In létrehozásakor új `teleportGroupId` (UUID) generálódik
- Teleport Out lehelyezésekor a felhasználó kiválaszt egy létező Teleport In-t → megkapja annak `teleportGroupId`-ját
- Hover highlight: `hoveredTeleportGroupId` state; minden azonos csoportú teleport node kiemelődik
- Az élek a Teleport-on keresztül nem rajzolódnak ki (nincs vizuális él köztük, a `teleportGroupId` köti össze őket logikailag)

**Elfogadási kritérium**: System node-ok lehelyezhetők, portjaik köthetők; Teleport párok hover-re kiemelődnek; `data` JSON-ban `teleportGroupId` helyesen mentődik.

---

## M6 — Toolbar és Auto-layout

**Cél**: Node-ok a toolbar-ból húzhatók a vászonra; az Optimize Board automatikusan rendezi el a hálózatot.

### Toolbar

- `PEToolbar.svelte` — bal oldali panel
- Szekciók: config-ból jövő node típusok + speciális node-ok (System In/Out, Teleport In/Out)
- Drag-and-drop toolbar-ról a vászonra: `dragstart` → `drop` esemény a canvas-on, pozíció kiszámítása a canvas transform alapján
- Alternatíva (kattintás): a node a canvas közepére kerül

### Auto-layout

- Dagre könyvtár: irányított gráf, TB (top-to-bottom) vagy LR (left-to-right) irány
- A `nodes` pozícióit Dagre kimenete alapján frissíti
- Animált átmenet (CSS transition a node-okon, ~300ms)
- `onOptimizeBoard()` event az akció után

**Elfogadási kritérium**: Minden node típus toolbar-ból leejthető; Optimize Board gomb kattintásra átrendezi a node-okat.

---

## M7 — Node részletek: Tags és Doc

**Cél**: Tags kezelése közvetlenül a node-on; Doc mező a külső szerkesztőnek átadva.

- Tags megjelenítése a node alján badge-ként
- Tag hozzáadása: kis `+` gomb → inline input → Enter confirm
- Tag törlése: badge-en X gomb
- `doc` mező nem jelenik meg inline a node-on — az `onEditClick` eventtel a szülő alkalmazás felelős a szerkesztő felület megnyitásáért
- `onChange(fullDataJson)` event: minden mutáció után sül ki (debounce 200ms); hasznos auto-save-hez

**Elfogadási kritérium**: Tag-ek hozzáadhatók és törölhetők a node-on; `onChange` minden módosításkor frissül.

---

## Fájlstruktúra (tervezett)

```
src/lib/pro/process-editor/
  ProcessEditor.svelte          # Fő komponens (config + data prop, eventek)
  PECanvas.svelte               # Pan/zoom vászon
  PEToolbar.svelte              # Node paletta
  PENode.svelte                 # Normál node
  PENodeSystemInput.svelte      # System Input node
  PENodeSystemOutput.svelte     # System Output node
  PENodeTeleportIn.svelte       # Teleport In node
  PENodeTeleportOut.svelte      # Teleport Out node
  PEPort.svelte                 # Port (input vagy output)
  PEEdge.svelte                 # Él (SVG path)
  PEEdgeDraft.svelte            # Húzás közbeni ideiglenes él
  process-editor.svelte.ts      # Reaktív state + mutációk
  pe-history.ts                 # Undo/Redo command stack
  pe-layout.ts                  # Dagre auto-layout wrapper
  pe-utils.ts                   # UUID, serial number, típusvalidáció
  pe.types.ts                   # TypeScript típusok
  index.ts                      # Public export
```

---

---

## Tech Notes — Külső könyvtárak

### Legfontosabb döntés: Svelte Flow mint alap

**`@xyflow/svelte`** (MIT, Svelte 5 / runes natív, 1.0 stable)

A folyamatszerkesztő legbonyolultabb részeit — viewport transform, pan/zoom, node drag, SVG edge routing, hit testing — a Svelte Flow már kész, production-ready minőségben megoldja. Nulláról megépíteni ezeket hónapokat venne igénybe; Svelte Flow-val az M1–M3 mérföldkövek töredék idő alatt teljesíthetők.

**Mit ad készen:**
- Pan + zoom (25%–∞, egérgörgő + pinch), viewport transform
- Node drag & drop
- Multi-select (Shift+kattintás, lasso)
- Delete billentyű (kijelölt node/él törlés)
- `smoothstep` edge típus — pontosan a spec szerinti rounded orthogonal stílus, `getSmoothStepPath()` segédfüggvénnyel
- `isValidConnection` callback — ide kerül a string-alapú típusvalidáció és az 1 él/input limit ellenőrzése
- Custom node komponensek (`nodeTypes` prop): a mi `PENode.svelte`, `PENodeTeleportIn.svelte` stb. simán beilleszthetők
- Custom handle (port) komponensek

**Ami nincs benne (nekünk kell):**
- Undo/Redo — saját Command stack (M4)
- Teleport logika (M5)
- Auto-layout integráció (M6)
- `onChange` debounce, serial number kezelés, tag UI

**Telepítés:**
```
bun add @xyflow/svelte
```

**Referencia:** [svelteflow.dev](https://svelteflow.dev) · [npmjs.com/@xyflow/svelte](https://www.npmjs.com/package/@xyflow/svelte) · [Dagre példa Svelte Flow-val](https://svelteflow.dev/examples/layout/dagre)

---

### Auto-layout: Dagre vs ELK

#### `@dagrejs/dagre` — ajánlott az első verzióhoz

- Hierarchikus, irányított gráf layout (LR / TB irány)
- Egyszerű API: node méreteket megadsz, koordinátákat kapsz vissza
- Svelte Flow oldalán van kész példa az integrációra
- Aktívan karbantartott fork (az eredeti `dagre` package elavult)
- **Nem ismeri a portokat** — az éleket node szinten kezeli, nem port szinten; a vizuális pozícionálás Svelte Flow oldalán megoldott

```
bun add @dagrejs/dagre
bun add -d @dagrejs/graphlib
```

**Referencia:** [github.com/dagrejs/dagre](https://github.com/dagrejs/dagre)

#### `elkjs` — upgrade path, ha Dagre nem elég

- Eclipse Layout Kernel JavaScript portja, sokkal fejlettebb algoritmusok (layered, force, orth)
- **Natívan ismeri a portokat** — az él routing figyelembe veszi, hogy melyik portból/portba megy, ami pontosabb elrendezést ad a mi spec-ünknél
- Hátrány: ~3 MB compiled JS (WebWorker-ben érdemes futtatni), bonyolultabb API
- Aktívan fejlesztett (2026-ban is rendszeres release-ek)

```
bun add elkjs
```

**Döntés:** Kezdjük Dagre-val (gyorsabb integráció), és ha a layout minősége nem kielégítő komplex gráfnál, váltsunk ELK-re.

**Referencia:** [github.com/kieler/elkjs](https://github.com/kieler/elkjs)

---

### SVG edge rounding (ha egyedi élt implementálunk)

Ha valamiért nem a Svelte Flow beépített `smoothstep` típusát használjuk (pl. egyedi routing logika), a lekerekítéshez:

- **`svg-round-corners`** — kis, dependency-free lib; `roundCorners(pathString, radius)` API; M, L, H, V, Z parancsok közötti sarkokat kerekíti le
- Alternatíva: manuális quadratic bezier sarokközelítés (egyszerű, lib nélkül)

```
bun add svg-round-corners
```

**Referencia:** [npmjs.com/package/svg-round-corners](https://www.npmjs.com/package/svg-round-corners)

---

### Összefoglaló — package lista

| Package | Miért | Mikor |
|---|---|---|
| `@xyflow/svelte` | Teljes canvas alap (pan/zoom/drag/edges) | M1-től |
| `@dagrejs/dagre` | Auto-layout | M6 |
| `elkjs` | Jobb auto-layout (port-aware) | M6 upgrade path |
| `svg-round-corners` | Egyedi SVG él rounding | Csak ha nem elég a Svelte Flow beépített smoothstep |

---

## Függőségi sorrend

```
M1 (vászon + renderelés)
  └─ M2 (node interakció)
       ├─ M3 (edge rajzolás)
       │    └─ M4 (history + copy/paste)
       │         └─ M5 (speciális node-ok)
       └─ M6 (toolbar + auto-layout)    ← M3 előtt is indítható
M7 (tags + doc)                         ← párhuzamosan bármikor
```
