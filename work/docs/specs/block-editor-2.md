# Specifikáció: Blokkalapú Markdown Editor (Live Preview)

Ez a dokumentum egy modern, Svelte 5 alapú, blokk-orientált Markdown editor funkcionális követelményeit rögzíti. A cél egy olyan hibrid megoldás, amely megőrzi a Markdown egyszerűségét, de a Notionhöz hasonló vizuális tisztaságot és blokkkezelést nyújt.

ahol meg kell valósítani: "src/dev/block-editor-2"

## 1. Vizuális Megjelenítés (Focus-to-Reveal)

A szerkesztő alapállapota a "Live Preview". Ez azt jelenti, hogy a Markdown jelölők (szintaxis) rejtve maradnak, hacsak az adott blokk nem aktív.

* **Inaktív állapot (Unfocused):** A blokk a formázott eredményt mutatja, de a jelölő karakterek (`**`, `_`, `~`, `#`) nem látszanak.
* **Monospace font:** A betűtípus minden blokkban rögzített szélességű (monospace) marad a technikai jelleg és a pozicionálás stabilitása érdekében.
* **Egységes font-size:** A betűméret minden blokktípusnál (a címsoroknál is) szigorúan megegyezik a törzsszöveg méretével.
* **Aktív állapot (Focused):** Amikor a kurzor belép egy szöveges blokkba, a jelölő karakterek megjelennek (pl. a "bold" szó mellett felbukkannak a `**` csillagok). Ezek a karakterek halványabb színűek (muted text).
* **Konzisztencia:** A színek, a betűstílusok és a térközök ne változzanak, amikor a jelölők megjelennek vagy eltűnnek.

## 2. Automatikus Blokk-átalakítás (Input Rules)

Gépelés közben bizonyos karaktersorozatok a sor elején azonnal átalakítják az aktuális blokk típusát.

| Trigger | Eredmény | Megjegyzés |
| :--- | :--- | :--- |
| `# ` ... `###### ` | Heading 1-6 | A szóköz leütése után vált át. |
| `- ` vagy `* ` | Bullet List | |
| `1. ` | Ordered List | |
| `[] ` | Todo List | |
| `> ` | Quote Block | |
| ` ``` ` | Code Block | Három visszajel után vált. |
| `---` | Horizontal Rule (HR) | Azonnali váltás a sor végén. |

## 3. Blokktípusok és Viselkedés

| Blokk Típus | Markdown Jelölő | Szerkesztőbeli viselkedés |
| :--- | :--- | :--- |
| **Paragraph** | (nincs) | Alapértelmezett szövegblokk. |
| **Heading 1-6** | `#` - `######` | **Egységes font-size.** A sor elején egy fix szélességű ikon jelzi a szintet (pl. H1, H2, H3...). |
| **Bullet List** | `-` | Automatikus behúzás, az `Enter` új listaelemeket hoz létre. |
| **Ordered List** | `1.` | Automatikus számozás követése. |
| **Todo List** | `- [ ]` | Interaktív checkbox a sor elején. |
| **Quote** | `>` | Függőleges vonal a blokk mellett, dőlt szövegstílus. |
| **Code Block** | ` ``` ` | Szintaxis kiemelés, külön háttérszín, monospace. |
| **Divider (HR)** | `---` | Vizuális választóvonal. Nem szerkeszthető szövegesen, csak törölhető. |

## 4. Heading Editor (Outline View)

A dokumentum szerkezetének kezelésére egy külön "Heading Editor" felület szolgál, amely tree-view formátumban jeleníti meg a címsorokat.

* **Hierarchia kezelése:** A nézetben a címsorok interaktívak, jobbra-balra tolhatóak (indent/outdent). Ez automatikusan frissíti az editorban a Markdown szintet.
* **Vizuális validáció:** A rendszer figyeli a hierarchikus konzisztenciát. Ha egy szint kimarad, a Heading Editorban a sor mellett egy piros `!` (felkiáltójel) jelenik meg.
* **Navigáció:** A nézetben bármelyik címsorra kattintva az editor a megfelelő blokkra görget.

## 5. Konverziós Mátrix (Convert-to)

| Forrás \ Cél | P | H1-6 | BL | OL | T | Q | CB | D |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Paragraph (P)** | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **Heading (H)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| **Bullet List (BL)** | ✓ | ✓ | - | ✓ | ✓ | ✓ | ✗ | ✗ |
| **Ordered List (OL)** | ✓ | ✓ | ✓ | - | ✓ | ✓ | ✗ | ✗ |
| **Todo List (T)** | ✓ | ✓ | ✓ | ✓ | - | ✓ | ✗ | ✗ |
| **Quote (Q)** | ✓ | ✓ | ✓ | ✓ | ✓ | - | ✗ | ✗ |
| **Code Block (CB)** | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | - | ✗ |
| **Divider (D)** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | - |

*Megjegyzés: A Code Block-ból való konverzió során a kód tiszta szövegként kerül át a célblokkba.*

## 6. Technikai megfontolások (Svelte 5)

* **State:** `$state` rúna a blokkok listájához.
* **Rendering:** Minden blokk külön komponens. A Heading komponens egy `level` propot kap az ikon rendereléséhez.
* **Validation logic:** Egy `$derived` state számolja a címsorok hierarchiáját és keresi a szintugrásokat.
