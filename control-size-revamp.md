# Control Size Revamp Plan

Ez a dokumentum az AtomForge UI interaktív kontrolljainak (gombok, beviteli mezők, választók) méretezési rendszerét és annak egységesítését részletezi.

## 1. Jelenlegi állapot (Audit)

A legtöbb kontroll három méretet támogat: `normal` (default), `compact`, és `small`. Azonban a megvalósítás minden komponensben egyedi (hardkódolt Tailwind osztályok), és néhol megjelenik egy negyedik, `micro` méret is.

### A. Standard Kontrollok (Magasság-alapú)
Ide tartoznak: `Button`, `Input`, `Select`, `MultiSelect`, `NativeSelect`, `DatePicker`, `TimePicker`, `TagEditor`, `CodeInput`.

| Méret | Tailwind magasság | Font méret | Megjegyzés |
| :--- | :--- | :--- | :--- |
| **Normal** | `h-10` (40px) | `text-sm` | Alapértelmezett |
| **Compact** | `h-8` (32px) | `text-xs` | Sűrűbb felületekhez |
| **Small** | `h-6` (24px) | `text-xs` | Nagyon sűrű / táblázati sorokba |
| **Micro** | `h-5` (20px) | `text-[10px]` | Csak `Button` és `Avatar` esetén |

### B. Bináris Kontrollok (Fix méretarányú)
Ide tartoznak: `Checkbox`, `Radio`, `Switch`. Ezek nem nyúlnak ki, hanem fix befoglaló méretük van.

| Komponens | Normal | Compact | Small |
| :--- | :--- | :--- | :--- |
| **Checkbox** | `w-5 h-5` | `w-4 h-4` | `w-3.5 h-3.5` |
| **Radio** | `w-5 h-5` | `w-4 h-4` | `w-3.5 h-3.5` |
| **Switch (pálya)**| `w-11 h-6` | `w-9 h-5` | `w-7 h-4` |

### C. Sáv-alapú Kontrollok (Vastagság-alapú)
Ide tartoznak: `ProgressBar`, `Slider`, `Range`. Ezeknél a méret a sáv (track) és a csúszka (thumb) vastagságát határozza meg.

| Méret | Sáv vastagság | Csúszka (Slider) | Megjegyzés |
| :--- | :--- | :--- | :--- |
| **Normal** | `h-4` (16px) | `h-5 w-5` | |
| **Compact** | `h-2.5` (10px)| `h-4 w-4` | |
| **Small** | `h-1.5` (6px) | `h-3 w-3` | |

### D. Interaktív Konténerek (Öröklés)
Ide tartoznak: `Accordion` (fejléc), `Tabs` (fül gombok), `Breadcrumb` (elemek). Ezek nem fix magasságúak minden esetben, de a "trigger" felületüknek (amire kattintunk) illeszkednie kell a kontroll magasságokhoz.

| Komponens | Elv |
| :--- | :--- |
| **Accordion** | A fejléc magassága (`padding` vagy `min-h`) megegyezik a kontroll magassággal. |
| **Tabs** | A fül-gombok magassága megegyezik a kontroll magassággal. |
| **Breadcrumb** | A gombok és linkek magassága a `control-sm` vagy `micro` méretet követi. |

## 2. Problémák és Adósságok

1.  **Inkonzisztens propok:** Bár a legtöbb helyen `compact` és `small` a név, a `Button` és `Avatar` használ `micro`-t is, amit más kontrollok nem támogatnak.
2.  **Hardkódolt értékek:** Ha a `normal` méretet 40px-ről 42px-re szeretnénk állítani, több tucat fájlt kell módosítani.
3.  **Belső paddingok:** A kontrollok belső elemei (ikonok, affitok) nem mindig igazodnak precízen a külső mérethez.
4.  **Szöveg-igazítás:** A kisebb méreteknél a `text-xs` és a kontroll magassága közti egyensúly néhol szétcsúszik.

## 3. Javasolt Új Rendszer (Token-alapú)

Bevezetünk egy szemantikus méretezési rendszert a `theme.css`-be, hasonlóan a radius rendszerhez.

### CSS Tokenek (Draft)
```css
@theme {
    /* Magasságok (Standard) */
    --size-control-n:  2.5rem;  /* 40px */
    --size-control-c:  2rem;    /* 32px */
    --size-control-s:  1.5rem;  /* 24px */
    --size-control-m:  1.25rem; /* 20px */

    /* Bináris méretek (Box/Check alap) */
    --size-check-n:    1.25rem; /* 20px */
    --size-check-c:    1rem;    /* 16px */
    --size-check-s:    0.875rem;/* 14px */

    /* Sáv méretek (Track alap) */
    --size-track-n:    1rem;    /* 16px */
    --size-track-c:    0.625rem;/* 10px */
    --size-track-s:    0.375rem;/* 6px */
}
```

## 4. Tervezési Alapelvek

### A. Hierarchikus skálázás
Minden kontrollnak támogatnia kell mindhárom (vagy négy) méretet. Ha egy `Input` `compact`, akkor a mellette lévő `Button`-nak is `compact`-nak kell lennie azonos magassággal.

### B. Konténer-Kontroll Öröklés
Az olyan komponensek, mint az `Accordion` vagy a `Tabs`, belső menedzsereken keresztül adják tovább a méretet a gyerekeiknek (`AccordionItem`, `Tab`), amik ezután a standard kontroll tokeneket használják a saját paddingjuk vagy magasságuk beállítására.

### C. Ikon-kontroll arány
Az ikonok méretének követnie kell a kontroll méretét:
- Normal: 20px ikon (`pxSize: 20`)
- Compact: 16px ikon (`pxSize: 16`)
- Small: 14px ikon (`pxSize: 14`)
- Micro: 12px ikon (`pxSize: 12`)

## 5. Implementációs Terv

### 1. Fázis: Token Setup
- [ ] Tokenek definiálása a `theme.css`-ben.
- [ ] Alapértelmezett font-méretek és paddingok társítása a tokenekhez.

### 2. Fázis: Standard Kontroll Migráció
- [ ] `Button`, `Input`, `Select` stb. átírása a magasság-tokenek használatára.
- [ ] Ikon méretek automatizálása a kontroll mérete alapján.

### 3. Fázis: Bináris Kontroll Migráció
- [ ] `Checkbox`, `Radio`, `Switch` egységesítése az új `check` tokenek mentén.

### 4. Fázis: Sáv-alapú Kontroll Migráció
- [ ] `ProgressBar`, `Slider`, `Range` átírása a track tokenekre.

### 5. Fázis: Micro Standardizálás
- [ ] Eldönteni, hogy minden kontroll kap-e `micro` méretet, vagy kivezetjük a `Button`-ból. (Javaslat: Maradjon meg mindenhol, ahol technikailag lehetséges).
