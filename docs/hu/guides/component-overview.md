# Komponensek áttekintése

Az eszközöket aszerint válaszd, milyen feladatot oldanak meg, majd a beállításhoz, a viselkedéshez, az API-hoz és a korlátokhoz kövesd a hivatkozott dokumentációt. Az alábbi kategóriaindex a dokumentált publikus modulokat tartalmazza; a listában szereplés nem jelent stabilitási garanciát. A dokumentált publikus szimbólumokat az `@atom-forge/ui`-ból importáld, ne a forrásmappák útvonalairól.

Ez az oldal az angol nyelvű [`../../en/guides/component-overview.md`](../../en/guides/component-overview.md) magyar fordítása; eltérés esetén az angol változat a mérvadó.

Az ajánlott olvasási sorrendhez kezdd az [AI Consumer Entry Point](../../../README-AI.md) oldallal.

## Választás feladat szerint

| Feladat | Összevetendő eszközök | Választási szempontok |
|---|---|---|
| Egy érték kiválasztása | [NativeSelect](../controls/forms/native-select.md), [Select](../controls/forms/select.md), [Radio](../controls/forms/radio.md) | Natív select viselkedés, kereshető/egyedi lenyíló lista, vagy közvetlenül látható választási lehetőségek. |
| Több érték kiválasztása | [MultiSelect](../controls/forms/multi-select.md), [Checkbox](../controls/forms/checkbox.md) | Lenyíló listás kiválasztás vagy látható checkboxok; mindegyiknél olvasd el a binding szerződését. |
| Szöveges tagek szerkesztése | [TagEditor](../controls/forms/tag-editor.md) | Szabad szöveges stringek; előre definiált opcióértékekhez vesd össze a MultiSelecttel. |
| Címkézett input építése | [Field](../controls/forms/field.md), [Input](../controls/forms/input.md), [Textarea](../controls/forms/textarea.md) | A label/hint/error wrappert a megfelelő vezérlővel komponáld; lásd: [Űrlapok](./forms.md). |
| Dátum vagy idő megadása | [DatePicker](../controls/forms/date-picker.md), [TimePicker](../controls/forms/time-picker.md), [DateTimePicker](../controls/forms/date-time-picker.md) | Igazodj a szükséges dátum/idő értékformához; ezek inputok, nem ütemezőfelületek. |
| Bináris beállítás megjelenítése | [Switch](../controls/forms/switch.md), [Checkbox](../controls/forms/checkbox.md) | Be/ki beállítás vagy bejelölt kiválasztás; ne feltételezz azonos propneveket. |
| Táblázatos rekordok megjelenítése | [Table](../controls/data/table.md), [Pagination](../controls/layout/pagination.md), [EmptyState](../controls/display/empty-state.md) | A rekordmegjelenítést és az alkalmazás által kezelt lapozást/állapotot komponáld össze; lásd: [Adatmegjelenítés](./data-display.md). |
| Mérések vizualizálása | [BarChart](../controls/data/bar-chart.md), [Charts](../controls/data/charts.md), [Heatmap](../controls/data/heatmap.md), [MeterGroup](../controls/data/meter-group.md) | Oszlopok, Chart.js diagramok, kétdimenziós értékek vagy egy egész részei. |
| Haladás vagy betöltés jelzése | [ProgressBar](../controls/forms/progress-bar.md), [ProgressRing](../controls/data/progress-ring.md), [Skeleton](../controls/display/skeleton.md) | Mért előrehaladás vagy a tartalom alakját követő betöltési placeholderek. |
| Elemek átrendezése vagy áthelyezése | [SortableList / SortableGroup](../controls/data/sortable.md) | Egy lista sorrendje vagy listák közötti áthelyezés; lásd: [Rendezhető listák](./sortable-lists.md). |
| Navigáció vagy panelek rendezése | [Tabs](../controls/layout/tabs.md), [Accordion](../controls/layout/accordion.md), [Tree](../controls/layout/tree.md), [Splitter](../controls/layout/splitter.md) | Egyenrangú nézetek, kinyitható szakaszok, hierarchia vagy átméretezhető panelek. |
| Kiegészítő UI megnyitása | [Modal](../controls/overlays/modal.md), [Drawer](../controls/overlays/drawer.md), [Popup](../controls/overlays/popup.md) | Dialógus, széli panel vagy horgonyzott tartalom; lásd: [Overlay-ek](./overlays.md). |
| Műveletek elérhetővé tétele | [ContextMenu](../controls/overlays/context-menu.md), [CommandPalette](../controls/overlays/command.md) | Helyi menü vagy kereshető parancsok; a command palette láthatóságát az alkalmazásnak kell kezelnie. |
| Magyarázat vagy értesítés | [Tooltip](../controls/overlays/tooltip.md), [Toast](../controls/overlays/toast.md), [EmptyState](../controls/display/empty-state.md) | Hoverre megjelenő magyarázat, átmeneti visszajelzés vagy tartós „nincs tartalom” állapot. |
| Szöveges tartalom vagy dokumentáció renderelése | [Prose](../controls/content/prose.md), [Doc](../controls/content/doc.md) | Olvasható tartalom, illetve API-, kód- és példadokumentációs alapelemek. |
| Tartalom szerkesztése | [Brickee](https://github.com/atom-forge/brickee), egy erre a könyvtárra épülő külön csomag | Formázott szöveg és JSON-ban tárolt blokkos dokumentumok; ebben a csomagban nincs saját szerkesztővezérlő. |
| Dátumok és erőforrások ütemezése | [Calendar](../controls/scheduling/calendar.md), [Organizer](../controls/scheduling/organizer.md) | Naptáresemények és egyedi egységrácsok (idővonalak, erőforrás-sorok) összevetése. |

## Kategóriaindex

---

## Általános
Alapvető építőelemek és primitív vezérlők, amelyeket az egész alkalmazásban használsz.

- **[Badge](../controls/general/badge.md)**: Abszolút pozicionált overlay jelző értesítésszámokhoz vagy státuszpöttyökhöz.
- **[Button](../controls/general/button.md)**: Kattintható elem műveletek indításához.
- **[Chip](../controls/general/chip.md)**: Kompakt inline címke metaadatokhoz, státuszokhoz vagy tagekhez.
- **[Icon](../controls/general/icon.md)**: Wrapper ikonokhoz egységes méretezéssel és vonalvastagság-szabályozással.
- **[Kbd](../controls/general/kbd.md)**: Billentyűparancsokat jelenít meg fizikai billentyűsapkákként.

---

## Adatok és diagramok
Komponensek összetett adathalmazok vizualizálásához, megjelenítéséhez és kezeléséhez.

- **[Bar Chart](../controls/data/bar-chart.md)**: Reszponzív oszlopdiagram egyértékű, csoportosított többsoros és halmozott elrendezéssel.
- **[Charts (Chart.js)](../controls/data/charts.md)**: Chart.js-alapú, canvasra rajzoló diagramkomponensek.
- **[Heatmap](../controls/data/heatmap.md)**: SVG-alapú hőtérkép kétdimenziós adathalmazok színskálás megjelenítéséhez.
- **[Meter Group](../controls/data/meter-group.md)**: Szegmentált vízszintes sáv, amely az egészen belüli arányokat mutatja.
- **[Progress Ring](../controls/data/progress-ring.md)**: Kör alakú SVG haladásjelző.
- **[Sortable](../controls/data/sortable.md)**: Komponensek drag-and-drop rendezéshez és listák átrendezéséhez.
- **[Table](../controls/data/table.md)**: Generikus, típusbiztos adattábla sticky fejléccel és egyedi cellarendereléssel; a rendezés az alkalmazás feladata.
- **[Timeline](../controls/data/timeline.md)**: Rugalmas idővonal-komponens, amely függőleges vagy vízszintes vonal mentén jeleníti meg az elemeket.

---

## Megjelenítés
Komponensek tartalom, felhasználói adatok és UI-állapot megjelenítéséhez.

- **[Avatar](../controls/display/avatar.md)**: Kör alakú felhasználóábrázolás képpel vagy monogrammal.
- **[Avatar Group](../controls/display/avatar-group.md)**: Egymást átfedő Avatar komponensek vízszintes sora.
- **[Card](../controls/display/card.md)**: Lekerekített szegélyű felület-container állítható árnyékmélységgel.
- **[Carousel](../controls/display/carousel.md)**: Vízszintesen görgethető slide-container scroll-snappel és navigációval.
- **[Empty State](../controls/display/empty-state.md)**: Középre igazított placeholder, ha egy szakasznak nincs tartalma.
- **[Flip Card](../controls/display/flip-card.md)**: 3D-ben megforduló kártya elő- és hátlappal.
- **[Skeleton](../controls/display/skeleton.md)**: A tartalom alakját követő betöltési placeholderek.

---

## Tartalom
Komponensek strukturált tartalom rendereléséhez.

- **[Doc](../controls/content/doc.md)**: API-táblák, kódmegjelenítés és példabemutató alapelemek.
- **[Prose](../controls/content/prose.md)**: Komponálható alapelemek szöveges tartalom és Markdown rendereléséhez.

---

## Űrlapok
Egységes űrlapvezérlők és inputok felhasználói adatok bekéréséhez.

- **[Checkbox](../controls/forms/checkbox.md)**: Logikai kapcsoló vezérlő csoportkezeléssel és több variánssal.
- **[Code Input](../controls/forms/code-input.md)**: Szegmentált input OTP-khez, PIN-kódokhoz és licenckulcsokhoz.
- **[Color](../controls/forms/color.md)**: Stílusozott színinput hex érték kiválasztásához.
- **[Date Picker](../controls/forms/date-picker.md)**: Egyetlen dátum kiválasztása felugró naptárral.
- **[Date Time Picker](../controls/forms/date-time-picker.md)**: Összevont dátum- és időbevitel.
- **[Field](../controls/forms/field.md)**: Wrapper, amely egy űrlapvezérlőhöz labelt, hintet és hibaüzenetet társít.
- **[Input](../controls/forms/input.md)**: Stílusozott szöveges input ikonokkal, prefix/suffix slotokkal és variánsokkal.
- **[Multi-Select](../controls/forms/multi-select.md)**: Vezérlő több elem kiválasztásához egy rögzített listából.
- **[Native Select](../controls/forms/native-select.md)**: Stílusozott wrapper a natív HTML select elem körül.
- **[Progress Bar](../controls/forms/progress-bar.md)**: Vízszintes haladásjelző sima átmenetekkel.
- **[Radio](../controls/forms/radio.md)**: Rádiógomb-csoport egymást kizáró opciókhoz.
- **[Select](../controls/forms/select.md)**: Egyedi, kereshető lenyíló lista.
- **[Slider](../controls/forms/slider.md)**: Tartomány- és skalárérték-csúszka egy vagy két fogantyúval.
- **[Switch](../controls/forms/switch.md)**: Kapcsoló bináris be/ki állapotokhoz.
- **[Tag Editor](../controls/forms/tag-editor.md)**: Interaktív input szöveges tagek listájának kezeléséhez.
- **[Textarea](../controls/forms/textarea.md)**: Többsoros szöveges input, az inputrendszerrel egységes stílusban.
- **[Time Picker](../controls/forms/time-picker.md)**: Stílusozott wrapper a natív időinput körül.

---

## Elrendezés
Szerkezeti komponensek a tartalom rendezéséhez és bejárásához.

- **[Accordion](../controls/layout/accordion.md)**: Kinyitható tartalompanelek egy vagy több egyszerre nyitott elemmel.
- **[Breadcrumb](../controls/layout/breadcrumb.md)**: Navigációs útvonal, amely az aktuális oldal helyét mutatja.
- **[Button Bar](../controls/layout/button-bar.md)**: Vizuális wrapper, amely a gyerekelemeit egységes vízszintes sávba csoportosítja.
- **[Pagination](../controls/layout/pagination.md)**: Vezérlők a többoldalas tartalom lapozásához.
- **[Pagination Slider](../controls/layout/pagination-slider.md)**: Csúszkaalapú lapozó vezérlő.
- **[Splitter](../controls/layout/splitter.md)**: Átméretezhető, osztott paneles container összetett elrendezésekhez.
- **[Stepper](../controls/layout/stepper.md)**: Többlépéses haladásjelző és navigációs vezérlő.
- **[Tabs](../controls/layout/tabs.md)**: Fülekre épülő navigáció több vizuális variánssal.
- **[Tree](../controls/layout/tree.md)**: Összecsukható fanézet hierarchikus adatszerkezetekhez.

---

## Overlay-ek
Dinamikus overlay-ek, amelyek az alkalmazás fő tartalma fölött jelennek meg.

- **[Command](../controls/overlays/command.md)**: Kereshető command palette és a parancselemek API-ja.
- **[Context Menu](../controls/overlays/context-menu.md)**: Deklaratív konfigurációból felépített popup menü.
- **[Drawer](../controls/overlays/drawer.md)**: Becsúszó panel, amely bármelyik képernyőszélhez rögzíthető.
- **[Modal](../controls/overlays/modal.md)**: Imperatív modal dialógusrendszer.
- **[Popup](../controls/overlays/popup.md)**: Lebegő overlay-rendszer horgonyzott tartalomhoz, például lenyíló listákhoz és almenükhöz.
- **[Toast](../controls/overlays/toast.md)**: Könnyű értesítések egy rögzített overlay-ben egymásra rakva.
- **[Tooltip](../controls/overlays/tooltip.md)**: Késleltetéssel megjelenő, hoverre aktiválódó tooltipek.
- **[Zen](../controls/overlays/zen.md)**: Teljes képernyős overlay zavaró tényezők nélküli fókuszmódhoz.

---

## Ütemezés
Vezérlők naptárakhoz és egységalapú tervezőfelületekhez.

- **[Calendar](../controls/scheduling/calendar.md)**: Naptárnézetek és eseményszerkesztési callbackek.
- **[Organizer](../controls/scheduling/organizer.md)**: Egységalapú ütemezőfelület naptárakhoz, dashboardokhoz és erőforrásrácsokhoz.
