# Webes Folyamatszerkesztő (Node/Process Editor) Specifikáció

## 1. Áttekintés
Egy vizuális, böngészőben futó folyamatszerkesztő komponens, amely lehetővé teszi munkafolyamatok, adatcsatornák vagy logikai hálózatok grafikus felépítését. A felhasználók "dobozokat" (node-okat) helyezhetnek el a vásznon, amelyeket vonalakkal (edge) köthetnek össze a bemeneti és kimeneti portokon keresztül.

## 2. Alapvető Funkciók és UI Elemek

### Vászon (Canvas)
*   **Mozgás**: A vásznon a dobozok szabadon elhelyezhetőek és mozgathatóak (nincs rácshoz igazítás / snap-to-grid). Maga a vászon görgethető/húzható (pan).
*   **Nagyítás/Kicsinyítés (Zoom)**: A vászon nagyítható és kicsinyíthető (egérgörgővel vagy pinch-to-zoom gesztussal). Zoom range: pl. 25%–200%, alapértelmezett: 100%.
*   **Optimize Board (Automatikus elrendezés)**: Beépített funkció a dobozok automatikus, átlátható elrendezéséhez (auto-layout), ha a hálózat túl kaotikussá válna.

### Dobozok (Nodes)
*   **Megjelenés**: Minden doboznak van egy megjelenítendő neve (típusa), egy alapszíne, egyedi azonosítója (UUID) a háttérben, valamint egy **sorszáma (serial-number)**. 
    *   *Belső azonosító (UUID)*: Kizárólag a szerkesztő belső működéséhez (DOM összekötések, data json referenciák) szükséges, a felhasználó elől rejtve marad.
    *   *Sorszámozás (Serial-number)*: A sorszám doboztípusonként növekszik (pl. `api_request_1`, `api_request_2`), és mindig egyel nagyobb, mint a rendszerben már létező azonos típusú doboz sorszáma. Ez a felhasználó számára is látható azonosító, ami kritikus a hibakeresésnél (debug), hogy a userek és a rendszergazdák egyértelműen beazonosíthassák, melyik dobozból származik a hiba.
*   **Felhasználói név (Label)**: A dobozoknak van egy felhasználó által szabadon megadható elnevezése (label), ami segít a folyamat értelmezésében.
*   **Dokumentáció (Doc)**: Minden doboz tartalmazhat egy `doc` nevű tulajdonságot, amelyben a felhasználó Markdown formátumban rögzíthet megjegyzéseket, leírásokat vagy specifikációkat az adott csomópont működéséről.
*   **Címkék (Tags/Labels)**: A dobozokhoz tetszőleges számú egyedi címke (szöveges badge) adható, és ezek törölhetők is a felületről.
*   **Gombok és Interakciók**:
    *   **Törlés**: A doboz és a hozzá kapcsolódó összes kötés eltávolítható a vászonról (felületi gombbal vagy billentyűzettel).
    *   **Edit (Szerkesztés) gomb**: A komponens beépítetten nem rendel funkciót ehhez a gombhoz. Rákattintáskor egy külső eseményt (event) küld ki (pl. `onEditClick(nodeId)`), amire a befogadó alkalmazás reagálhat (pl. megnyithat egy oldalsó panelt a részletes szerkesztéshez).
*   **Paraméterek**: A dobozok rendelkezhetnek specifikus paraméterekkel (pl. egy "API hívás" doboznál az URL vagy a metódus). Ezek a paraméterek a szerkesztőből (akár egy felugró vagy oldalsó menüből, amit az Edit gomb nyit) állíthatók, akárcsak a doboz egyedi felirata és dokumentációja.

### Billentyűzet parancsok és UX funkciók
*   **Törlés (Delete/Backspace)**: A kijelölt dobozok vagy kötések azonnali törlése.
*   **Másolás és Beillesztés (Copy/Paste)**: Támogatott a kijelölt dobozok duplikálása (`Ctrl+C` / `Ctrl+V`). Ilyenkor az új doboz megkapja az eredeti paramétereit (és a dokumentációját), de új UUID-t és új, eggyel megnövelt `serial-number`-t kap.
*   **Történetkezelés (Undo/Redo)**: A szerkesztő támogatja a lépések visszavonását és újra-végrehajtását a felületen végzett módosításokra (mozgatás, kötés, törlés, másolás stb.). Ez billentyűkombinációkkal is elérhető (`Ctrl+Z`, `Ctrl+Y` vagy `Ctrl+Shift+Z`).

### Portok és Kötések (Edges)
*   **Bemenetek és Kimenetek**: A dobozok bal oldalán bemenetek (inputs), jobb oldalán kimenetek (outputs) találhatók. Minden port rendelkezik egy egyértelmű **névvel/felirattal (name/label)**, ami megmutatja a felhasználónak az adott csatlakozási pont funkcióját.
*   **Hover interakció**: Ha a felhasználó egy port (bemenet vagy kimenet) fölé viszi az egeret (hover), a szerkesztő vizuálisan kiemeli az összes olyan kötést (vonalat), ami abból a portból indul vagy oda érkezik.

### Speciális Dobozok: Teleport, Input és Output

> Ezek a dobozok **beépített, fix típusok** — nem a `config` JSON-ból jönnek, hanem a szerkesztő mindig ismeri őket. A felhasználó az eszköztárból helyezheti el őket a vásznon.

*   **Hálózati Input és Output elemek (Keretrendszer határfelületek)**:
    *   *System Input* (`type: "system_input"`): Csak kimenete van. Azt az adatot reprezentálja, amit a befogadó keretrendszer ad át a hálózatnak indításkor.
    *   *System Output* (`type: "system_output"`): Csak bemenete van. Ide érkezik a végleges, kiszámított adat, amit a hálózat visszaad a keretrendszernek (mint egy függvény `return` értéke).
*   **Teleport elemek**: Olyan speciális dobozok, amelyek a bonyolult, egymástól távol lévő node-ok összekötését könnyítik meg (hosszú, átláthatatlan vonalak húzása nélkül).
    *   *Működés*: Egy bemeneti (Teleport In, `type: "teleport_in"`) ponthoz több kimeneti (Teleport Out, `type: "teleport_out"`) pont is rendelhető (1-N kapcsolat). A "Teleport In" doboznak csak bemenete van, a "Teleport Out" dobozoknak csak kimenete. A csoporthoz tartozást a `teleportGroupId` mező jelöli a `data` JSON-ban (ld. 3.2. fejezet).
    *   *Vizuális visszajelzés*: Ha a felhasználó az egérrel egy teleport doboz fölé áll (hover), a szerkesztő vizuálisan kiemeli annak minden összerendelt elemét (pl. az "In" fölött állva az összes hozzá tartozó "Out"-ot, egy "Out" fölött állva pedig a hozzá tartozó "In"-t), egyértelműsítve a hálózatot.

### Kötési szabályok és Típusrendszer
*   **String-alapú Típusillesztés (Port Kompatibilitás)**:
    *   A szerkesztő motorja *nem ismeri fel a programozási típusokat* (nem tudja mi az a `number`, `string` vagy `object`). A "típusosság" kizárólag a portokhoz rendelt szöveges azonosítók (stringek) egyezésén alapul. 
    *   Például egy doboz kimenete lehet `Out:Krumpli`, amit csak egy olyan bemenetre lehet rákötni, ami elfogadja az `In:Krumpli` azonosítót.
    *   A portok típus-definíciója továbbra is a `config` json-ből jön. Ezáltal a szerkesztő teljesen **keretrendszer- és nyelvfüggetlen** marad; azt a logikát kényszeríti ki, amit kívülről konfigurálnak neki.
    *   *Több típus elfogadása*: Egy bemenet továbbra is elfogadhat többféle azonosítót is (pl. a bemenet kompatibilis a `Krumpli` és a `Répa` stringgel is).
    *   **Vezérlési Esemény (Trigger)**: A rendszerben létezhet egy (vagy több) speciális string azonosító (pl. `"trigger"`), amit a hálózatot befogadó logika arra használ, hogy a végrehajtás sorrendjét (Control Flow) jelezze adat átadása nélkül. A szerkesztő szempontjából ez is csak egy string egyezés.
*   **Kötések (Edges) kinézete**: A vonalak derékszögben törnek, de a sarkoknál ívesen fordulnak be (rounded orthogonal / step-rounded stílus).

## 3. Adatstruktúrák (JSON Design)

A szerkesztő működését két fő JSON objektum határozza meg: a `config` (mely meghatározza a rendelkezésre álló elemeket) és a `data` (mely az aktuális szerkesztett folyamatot írja le).

### 3.1. Konfiguráció (`config` JSON)
Ez írja le, hogy milyen típusú dobozokat lehet letenni, mik a portjaik, és milyen string-alapú típusokat várnak/adnak. A "típusok" itt már csak szimpla stringek, amiknek pontosan egyezniük kell az összekötéshez. Nincs globális típusregiszter, a dobozok határozzák meg maguknak a kulcsszavakat.

```json
{
  "nodeTypes": [
    {
      "type": "api_request",
      "name": "API Kérés",
      "color": "#4287f5",
      "inputs": [
        { "id": "trigger_in", "label": "Indítás", "types": ["trigger"] },
        { "id": "url", "label": "Cím (URL)", "types": ["sys_string"] },
        { "id": "config", "label": "Komplex Konfiguráció", "types": ["CustomUserRecord", "Krumpli"] }
      ],
      "requiredInputs": [
        ["trigger_in", "url"],
        ["trigger_in", "config"]
      ],
      "outputs": [
        { "id": "response", "label": "Válasz", "types": ["CustomUserRecord"] },
        { "id": "error", "label": "Hiba", "types": ["sys_string"] }
      ],
      "parameters": [
        { "id": "method", "label": "HTTP Metódus", "type": "select", "options": ["GET", "POST", "PUT", "DELETE"], "default": "GET" },
        { "id": "timeout", "label": "Timeout (ms)", "type": "number", "default": 5000 }
      ]
    },
    {
      "type": "data_filter",
      "name": "Adatszűrő",
      "color": "#8b5cf6",
      "inputs": [
        { "id": "data_in", "label": "Bemenő Adat", "types": ["CustomUserRecord", "Krumpli"] }
      ],
      "outputs": [
        { "id": "data_out", "label": "Szűrt Adat", "types": ["CustomUserRecord"] }
      ],
      "parameters": [
        { "id": "filterLogic", "label": "Szűrési feltétel", "type": "string", "default": "" }
      ]
    }
  ]
}
```

**`requiredInputs` szemantikája**: Tömb tömbje. Egy belső tömb = egy érvényes bemeneti kombináció (AND logika). A csoportok között OR logika érvényes — elég, ha az egyik csoport összes portja be van kötve. Például:
```json
{
  "requiredInputs": [
    ["trigger_in", "url"],
    ["trigger_in", "config"]
  ]
}
```
Ez azt jelenti: `(trigger_in ÉS url)` VAGY `(trigger_in ÉS config)` elegendő a futtatáshoz.

### 3.2. Folyamat Adatai (`data` JSON)
Ez a JSON menti el a felhasználó által felépített hálózatot (a mentett állapotot).

```json
{
  "nodes": [
    {
      "id": "node_uuid_1",
      "type": "api_request",
      "serialNumber": "api_request_1",
      "position": { "x": 150, "y": 200 },
      "label": "Felhasználó adatok lekérése",
      "doc": "Ez a doboz felel az alap **felhasználói profil** lekéréséért a backendről. Használjuk a profil oldal megjelenítése előtt.",
      "tags": ["backend", "auth-service"],
      "parameters": {
        "method": "POST",
        "timeout": 3000
      }
    },
    {
      "id": "node_uuid_2",
      "type": "data_filter",
      "serialNumber": "data_filter_1",
      "position": { "x": 550, "y": 200 },
      "label": "Aktív userek szűrése",
      "doc": "",
      "tags": [],
      "parameters": {
        "filterLogic": "user.isActive === true"
      }
    },
    {
      "id": "node_uuid_3",
      "type": "teleport_in",
      "serialNumber": "teleport_in_1",
      "teleportGroupId": "teleport_group_uuid_1",
      "position": { "x": 300, "y": 400 },
      "label": "Eredmény teleport",
      "doc": "",
      "tags": [],
      "parameters": {}
    },
    {
      "id": "node_uuid_4",
      "type": "teleport_out",
      "serialNumber": "teleport_out_1",
      "teleportGroupId": "teleport_group_uuid_1",
      "position": { "x": 800, "y": 100 },
      "label": "",
      "doc": "",
      "tags": [],
      "parameters": {}
    }
  ],
  "edges": [
    {
      "id": "edge_uuid_1",
      "sourceNode": "node_uuid_1",
      "sourcePort": "response",
      "targetNode": "node_uuid_2",
      "targetPort": "data_in"
    }
  ]
}
```

## 4. API és Események (Events)

A komponens használata során külső keretrendszer felé (pl. Svelte/React) az alábbi főbb eseményeket (Event-eket) kell publikálni:

*   **`onEditClick(nodeId, nodeData)`**: Amikor a felhasználó a dobozon lévő Edit gombra kattint. Ezt elkapva a szülő komponens megnyithat egy szerkesztő felületet, ahol beállíthatók a node-specifikus paraméterek és címkék.
*   **`onNodeChange(nodeId, newData)`**: Ha a doboz helyzete, neve, vagy a paraméterei megváltoznak. Pozícióváltozásnál (drag) a szerkesztő debounce-olja az eseményt (pl. 100ms), hogy ne árasszon el felesleges update-ekkel.
*   **`onNodeDelete(nodeId)`**: Amikor a dobozt törlik.
*   **`onEdgeConnect(source, target)`**: Amikor két portot sikeresen összekötöttek (a komponensnek ellenőriznie kell a típusegyezést és a bemenetek limitjét (1), mielőtt ezt az eseményt elsütné).
*   **`onEdgeDelete(edgeId)`**: Amikor egy kapcsolatot törölnek.
*   **`onOptimizeBoard()`**: Ha a felhasználó rákattint az automatikus elrendezés (Optimize board) gombra.
*   **`onChange(fullDataJson)`**: Egy általános esemény, ami minden módosításkor frissíti az egész hálózat aktuális állapotát (hasznos automatikus mentéshez).