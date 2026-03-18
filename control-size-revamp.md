# Control Size Revamp Plan

Ez a dokumentum az AtomForge UI interaktív kontrolljainak méretezési rendszerét, annak auditját és a Scoped CSS Variable alapú technikai megvalósítását részletezi.

## 1. Jelenlegi állapot (Audit)

### A. Standard Kontrollok (Magasság-alapú)
`Button`, `Input`, `Select`, `MultiSelect`, `NativeSelect`, `DatePicker`, `TimePicker`, `TagEditor`, `CodeInput`.
*   **Normal:** `h-10` (40px) | `text-sm`
*   **Compact:** `h-8` (32px) | `text-xs`
*   **Small:** `h-6` (24px) | `text-xs`
*   **Micro:** `h-5` (20px) | `text-[10px]`

### B. Bináris Kontrollok (Fix méretarányú)
`Checkbox`, `Radio`, `Switch`.
*   **Normal:** `20px` alapú
*   **Compact:** `16px` alapú
*   **Small:** `14px` alapú

### C. Sáv-alapú Kontrollok (Vastagság-alapú)
`ProgressBar`, `Slider`, `Range`.
*   **Normal:** `h-4` (16px) pálya | `h-5` csúszka
*   **Compact:** `h-2.5` (10px) pálya | `h-4` csúszka
*   **Small:** `h-1.5` (6px) pálya | `h-3` csúszka

### D. Interaktív Konténerek (Öröklés)
`Accordion` (fejléc), `Tabs` (fül gombok), `Breadcrumb` (elemek).
*   **Elv:** A kattintható felület magasságának és belső arányainak illeszkednie kell a standard kontrollokhoz.

### E. Információs Elemek (Skálázás)
Ide tartoznak: `Avatar`, `Chip`, `Badge`, `Kbd`, `Spinner`. Ezeknek vizuálisan illeszkedniük kell a környezetük sűrűségéhez.

| Komponens | Elv |
| :--- | :--- |
| **Avatar** | A magassága és a betűmérete pontosan követi a standard kontrollokat (`h-10`, `h-8`, stb.). |
| **Chip / Tag** | A padding és a font méret a kontroll sémát követi. |
| **Kbd** | A belső padding és font méret igazodik a szövegkörnyezet sűrűségéhez. |
| **Spinner** | A mérete mindig az aktuális ikon-méret tokent (`--control-icon-size`) használja. |

### F. Adatsűrűség (Layout Density)
Ide tartoznak: `Table`, `Tree`, `Toast`, `Skeleton`. Itt a méret nem egy gomb magasságát, hanem a sorok sűrűségét és a belső margókat jelenti.

| Komponens | Elv |
| :--- | :--- |
| **Table** | A cellák paddingja változik (`p-4` -> `p-2` -> `p-1`). |
| **Tree** | Az elemek közötti távolság és az ikonok mérete a kontroll sémát követi. |
| **Toast** | A belső padding és az ikon mérete igazodik a globális sűrűséghez. |
| **Skeleton** | A magasságának (pl. sorok esetén) pontosan meg kell egyeznie a kontroll magasságokkal. |

---

## 2. Új Rendszer: Scoped CSS Variables

Ahelyett, hogy minden komponensben JS logikával válogatnánk, egy **központi változórendszert** használunk. A komponensek szemantikus utility-ket használnak (pl. `h-control-h`), amiknek az értékét egy környezeti osztály (pl. `size-compact`) írja felül.

### A. CSS Tokenek (theme.css)
A Tailwind v4 `@theme` blokkjában definiáljuk a szemantikus utility-ket:

```css
@theme {
    /* Standard magasságok, paddingok, gapek */
    --spacing-control-h:    var(--control-height);
    --spacing-control-icon: var(--control-icon-size);
    --spacing-control-gap:  var(--control-gap);
    --font-size-control:    var(--control-font-size);

    /* Bináris méretek (Checkbox/Radio) */
    --spacing-check-size:   var(--check-size);

    /* Sáv méretek (Track/Slider) */
    --spacing-track-h:      var(--track-height);
    --spacing-thumb-size:   var(--thumb-size);
}
```

### B. Érték-térkép (@layer theme)
A `:root` tartalmazza a default értékeket, a módosító osztályok pedig a felülírásokat:

```css
@layer theme {
    :root {
        --control-height: 2.5rem; --control-icon-size: 1.25rem; --control-font-size: 0.875rem; --control-gap: 0.5rem;
        --check-size: 1.25rem;
        --track-height: 1rem; --thumb-size: 1.25rem;
    }
    .size-compact {
        --control-height: 2rem; --control-icon-size: 1rem; --control-font-size: 0.75rem; --control-gap: 0.375rem;
        --check-size: 1rem;
        --track-height: 0.625rem; --thumb-size: 1rem;
    }
    .size-small {
        --control-height: 1.5rem; --control-icon-size: 0.875rem; --control-font-size: 0.75rem; --control-gap: 0.25rem;
        --check-size: 0.875rem;
        --track-height: 0.375rem; --thumb-size: 0.75rem;
    }
    .size-micro {
        --control-height: 1.25rem; --control-icon-size: 0.75rem; --control-font-size: 0.625rem; --control-gap: 0.125rem;
        --check-size: 0.75rem;
        --track-height: 0.25rem; --thumb-size: 0.625rem;
    }
}
```

---

## 3. Tervezési Alapelvek

### A. Hierarchikus skálázás
Ha egy szülőre (pl. `Accordion` vagy `ButtonBar`) rátesszük a `size-compact` osztályt, az összes gyereke automatikusan örökli az új méreteket.

### B. Ikon-kontroll arány
Az ikonok (`size-control-icon`) mérete garantáltan együtt mozog a kontroll magasságával és a szövegmérettel.

### C. JS Mentesség
A komponensnek nem kell tudnia a pontos pixel-értékekről, csak azt kell eldöntenie a propok alapján, hogy melyik módosító osztályt (`size-small`, stb.) alkalmazza magára vagy a környezetére.

---

## 4. Implementációs Terv

### 1. Fázis: Theme Setup
- [ ] Tokenek és felülíró osztályok definiálása a `theme.css`-ben.

### 2. Fázis: Ikon és Spinner Refactor
- [ ] Az `Icon.svelte` és `Spinner.svelte` felkészítése a dinamikus méretezésre.

### 3. Fázis: Standard Kontroll Migráció
- [ ] `Button`, `Input`, `Select` stb. átállítása a szemantikus osztályokra.

### 4. Fázis: Bináris, Sáv és Információs Migráció
- [ ] `Checkbox`, `Radio`, `Avatar`, `Chip` stb. egységesítése.

### 5. Fázis: Layout Density (Table, Tree)
- [ ] A táblázatok és listák sűrűség-szabályozásának bevezetése.
