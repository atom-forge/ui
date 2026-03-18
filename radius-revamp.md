# Border Radius Revamp Plan

Ez a dokumentum részletezi az AtomForge UI border-radius rendszerének egységesítését és szemantikai alapokra helyezését.

## 1. Jelenlegi állapot (Audit)

A komponensek jelenleg vegyesen használják a Tailwind alapértelmezett `rounded-*` osztályait. Ez nehézkessé teszi a globális stílusmódosítást (pl. ha egy lekerekítettebb vagy élesebb designt szeretnénk).

| Tailwind osztály | Méret | Jellemző komponensek                                                        |
|:-----------------|:------|:----------------------------------------------------------------------------|
| `rounded-sm`     | 2px   | `ColorPicker` swatch, `MeterGroupLegend`                                    |
| `rounded`        | 4px   | `Checkbox`, `Pagination` gombok, `Kbd`, `Chip` belső tagek                  |
| `rounded-md`     | 6px   | `Button`, `Input`, `NativeSelect`, `DatePicker`, `Tooltip`, `Tab`           |
| `rounded-lg`     | 8px   | `Card`, `Table`, `Accordion`, `Toast`, `Select`, `MultiSelect`, `TagEditor` |
| `rounded-full`   | pill  | `Avatar`, `Badge`, `Switch`, `ProgressBar`, `Slider`, `Zen` title           |

## 2. Új Szemantikus Rendszer

A cél, hogy a színekhez hasonlóan (`surface`, `control`, `canvas`) a lekerekítések is funkció alapú elnevezést kapjanak.

| Változó               | Érték          | Cél / Felhasználás                                                  |
|:----------------------|:---------------|:--------------------------------------------------------------------|
| `--radius-surface`    | 0.5rem (8px)   | **Konténerek:** Kártyák, táblázatok, modális ablakok, toastok.      |
| `--radius-control`    | 0.375rem (6px) | **Interaktív elemek:** Standard gombok, beviteli mezők, dropdownok. |
| `--radius-control-sm` | 0.25rem (4px)  | **Apró interakciók:** Checkbox, kisméretű gombok, chipek, tagek.    |
| `--radius-fine`       | 0.125rem (2px) | **Részletek:** Színminták, belső fókuszgyűrűk, apró dekorációk.     |
| `--radius-full`       | 9999px         | **Pill forma:** Avatárok, badge-ek, kapcsolók, dekorációk.          |


## 3. Tervezési alapelvek

### A. Vizuális Hierarchia

A konténerek (`surface`) sugara mindig nagyobb vagy egyenlő legyen, mint a bennük lévő elemeké (`control`). Ez biztosítja, hogy a belső elemek "szépen üljenek" a kereten belül.

### B. Konzisztencia

Minden beviteli mezőnek (legyen az `Input`, `Select` vagy `DatePicker`) azonos `control` sugarat kell kapnia, függetlenül attól, hogy jelenleg `md` vagy `lg` van rajtuk.

### C. Globális rugalmasság

A `theme.css`-ben definiált változók módosításával a teljes alkalmazás karaktere megváltoztatható:

* **Modern/Soft:** Növelt sugárértékek.
* **Professional/Sharp:** Csökkentett sugárértékek (akár 0px).

## 4. Migrációs táblázat (Példa)

| Komponens     | Jelenlegi    | Új szemantikus osztály                                            |
|:--------------|:-------------|:------------------------------------------------------------------|
| `Card`        | `rounded-lg` | `rounded-[var(--radius-surface)]`                                 |
| `Button`      | `rounded-md` | `rounded-[var(--radius-control)]`                                 |
| `Input`       | `rounded-md` | `rounded-[var(--radius-control)]`                                 |
| `Select`      | `rounded-lg` | `rounded-[var(--radius-control)]` (Csökkentés a konzisztenciáért) |
| `Checkbox`    | `rounded`    | `rounded-[var(--radius-control-sm)]`                              |
| `ColorPicker` | `rounded-md` | `rounded-[var(--radius-control)]`                                 |
