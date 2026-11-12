# Színrendszer

Az Atom Forge **szemantikus párosításra** (Semantic Pairing) épülő rendszert használ, amely világos és sötét módban is tökéletesen egységes megjelenést ad. Ahelyett, hogy több tucat színváltozatot kézzel kezelnél, a rendszer funkcionális tokenekre épít, amelyek mindig párban járnak: egy háttérszín és a hozzá garantáltan kontrasztos szín.

---

## Alapelv: a kontrasztmodell

Az Atom Forge minden funkcionális színéhez tartozik egy `-contrast` token. Így a szöveg és az ikonok mindig olvashatók, függetlenül az aktív témától vagy az adott háttérszíntől.

- **Automatikus alkalmazkodás**: sötét módra váltáskor a tokenek nem csak árnyalatot váltanak, hanem a jelentésük is megfordul. A `primary` például világos módban sötét, sötét módban viszont világos.
- **Nincs beégetett szín**: a komponenseidben soha ne használj számozott Tailwind skálákat, például `stone-500`-at, vagy hex kódokat. Ha a szemantikus tokeneknél maradsz, a UI tökéletesen támogatja az egyedi témákat és arculatokat.

---

## Felületi hierarchia

A felületek adják az alkalmazás fizikai szerkezetét. Mélységet teremtenek, és segítenek a felhasználónak megkülönböztetni az elrendezési containereket az interaktív tartalomtól.

| Token       | Utility pár                            | Leírás                                                                   |
|:------------|:---------------------------------------|:-------------------------------------------------------------------------|
| **bg**      | `bg-canvas` / `text-canvas-contrast`   | A body háttere. Az alkalmazás keretének legmélyebb rétege.               |
| **surface** | `bg-surface` / `text-surface-contrast` | Komponensfelület. Kártyákhoz, panelekhez, modalokhoz és drawerekhez.     |
| **muted**   | `bg-muted` / `text-muted-contrast`     | Visszafogott háttér. Letiltott állapotokhoz vagy másodlagos tartalmi területekhez ideális. |
| **input**   | `bg-control` / `text-canvas-contrast`  | Űrlapinputok háttere. Sötét módban általában sötétebb a surface-nél.     |

### Elrendezési példa

```sveltehtml
<div class="bg-canvas min-h-screen">
  <aside class="bg-surface border-r border-frame">
    <!-- Sidebar content -->
  </aside>
  <main class="p-6">
    <Card class="p-4">
      <h2 class="text-surface-contrast">Card Title</h2>
    </Card>
  </main>
</div>
```

---

## Akciópaletták

Az akciótokenek funkcionálisak: szándékot, hierarchiát és állapotot közvetítenek.

| Család        | Háttér         | Kontraszt                 | Leírás                                               |
|:--------------|:---------------|:--------------------------|:-----------------------------------------------------|
| **primary**   | `bg-primary`   | `text-primary-contrast`   | Kiemelt művelet. Alapértelmezésben „invertált”.      |
| **accent**    | `bg-accent`    | `text-accent-contrast`    | Márkaszín. Elsődleges CTA-k és aktív állapotok.      |
| **secondary** | `bg-secondary` | `text-secondary-contrast` | Kevésbé hangsúlyos művelet. Ghost gombok és visszafogott zónák. |
| **error**     | `bg-error`     | `text-error-contrast`     | Destruktív művelet. Törlés gombok és hibaállapotok.  |

---

## Dinamikus állapotok (hover és active)

Az Atom Forge a Tailwind 4 dinamikus módosítóival vezeti le az interakciós állapotokat az alaptokenből, külön állapotváltozók helyett.

- **Hover világos módban**: használd a `hover:brightness-95` vagy `hover:brightness-90` osztályt.
- **Hover sötét módban**: használd a `dark:hover:brightness-110` vagy `dark:hover:brightness-105` osztályt.
- **Ghost hover**: átlátszóból `hover:bg-secondary`-be vált.

```sveltehtml
<!-- A semantic primary button -->
<button class="bg-primary text-primary-contrast hover:brightness-90 transition-all">
  Click Me
</button>

<!-- A ghost button -->
<button class="bg-transparent text-canvas-contrast hover:bg-secondary transition-colors">
  Cancel
</button>
```

---

## Technikai referencia

| Utility        | Leírás                                                                  |
|:---------------|:------------------------------------------------------------------------|
| `border-frame` | Szabványos 1px-es szegély, minden komponensben ezt használjuk.          |
| `ring-accent`  | Szabványos fókuszgyűrű-szín az akadálymentességhez.                     |
| `use-canvas`   | Rövidítés, amely az alapréteg háttér- és kontrasztszínét egyszerre alkalmazza. |
| `use-surface`  | Rövidítés kártyákhoz és kiemelt panelekhez.                             |
