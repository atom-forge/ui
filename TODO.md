# TODO

Tervezett munka, fontossági sorrendben. A részletek és az ötletek a `notes/` mappában vannak; a szabályok az `AGENTS.md`-ben.

1. [x] **Lebegő elemek ablakban**
   - [x] Exportált `portal` akció az ui lebegőrétegébe; a `Tooltip` is ezt használja.
   - [x] Az ablakkezelő nem zár be egy már lekezelt (`defaultPrevented`) Escape-re; az ui popupjai meghívják a `preventDefault()`-ot.
   - [x] Dokumentáció: mikor `portal`, mikor popup-kezelő.
2. [x] **Escape ablakban**
   - [x] Böngészős próba: modalban és drawerben dátumválasztó, `Select`, tag-szerkesztő, Escape: csak a popup zárul be.
   - [x] Zenben nyitott popup Escape-jére a Zen ne záruljon be.
3. [x] **Dokumentáció a reference-first folyamat szerint**
   - [x] `docs/` → `docs/en/`, vele a book `![[../docs/...]]` beágyazásai, a `scripts/book-reference.ts`, a README és a `README-AI.md` linkjei.
   - [x] `docs/hu/` fordítás.
4. [x] **Book a közös szabályok szerint**
   - [x] Számozatlan fejezetfájlok.
   - [x] `id: atom-forge-ui`.
   - [x] `book/upgrading.md`.
   - [x] A `08-ai-notes-sveltekit.md` felvétele a `children` listába.
5. [x] **Fejlesztői szabályok összefésülése:** az `AGENTS/ui-lib-dev.md` szó szerint ismétli a svelte-helpers részt a `svelte-standards.md`-ből, és ellentmond neki (`src/lib/helpers/` vagy `@atom-forge/svelte-helpers`?); az `AGENTS/contribution/` részben fedi mindkettőt.
6. [x] **Showcase-leltárak:** a `check:showcase` API-leltárai a 0.0.34-hez vannak átnézve; az aktuális verzióhoz frissíteni. — Átnézve a 0.0.39-hez (`AUDITED_VERSION`): a propok változatlanok, a `closeTopmostIfClosable()` visszatérési típusa javítva.
7. [x] ~~**Block Editor 2**~~ — elvetve: a Brickee váltja ki, a kód kivezetve (lásd 13.).
8. [x] **Takarítás**
   - [x] A régi `atom-forge-ui-0.0.30.tgz` a repó gyökerében.
   - [x] A `@atlaskit/pragmatic-drag-and-drop-hitbox` függőség sehol nincs használva (a kivezetés előtt sem volt).
   - [x] A `var/tmp/` alatti ideiglenes fájlok (`test.ui-check.log`, `.hm`, `node-gyp`) a gitben vannak; törölni, és a `var/`-t felvenni a `.gitignore`-ba.
9. [x] **Release `@atom-forge/ship`-pel** (a saját `scripts/pub.ts` helyett)
   - [x] Release utáni lépés a Shipben: `ship.after` parancslista (`SHIP_VERSION`, `SHIP_TAG`), tesztekkel és dokumentációval.
   - [x] Ship-release az `after` funkcióval: 0.3.0 kint van npm-en.
   - [x] Az ui átállítása: `@atom-forge/ship` devDependency; `ship.verify` (`bun run check`, `bun run check:showcase`, `bunx publint`); `ship.after` (`ship-it check --wait 900`, `bun run deploy`); `pub`/`pub-check` scriptek; a `scripts/pub.ts`, `pub-check.ts`, `changelog-release.ts` törlése.
   - [x] `publish.yml`: `ship-it validate` a csendes verzió-átírás helyett.
   - [x] `AGENTS/devrules.md` release-szabályai.
10. [x] **Körkörös import a `/dev` oldalakon:** a `src/lib/index`-ből közvetlenül importáló dev-oldalak (pl. `/dev/overlay`) betöltésekor `Cannot access 'Popup' before initialization` (`src/lib/ui.ts`), a hidratálás néha elmarad. A `popup-manager.svelte.ts` a `../../../index`-ből importálja a `RenderSnippet`-et. A showcase-oldalakon nem jön elő. — Megoldva a 12.-vel: a `popup-manager` már nem az `index`-ből importál, és a többi barrel-import is a saját modulra mutat.
11. [x] **Holt kód:** a `DatePickerCalendar.svelte` és a `TimePickerPopup.svelte` sehol nincs használva; törölni vagy bekötni. — Törölve.
12. [x] **Megfontolandó: `@atom-forge/svelte-helpers` függőség.** Az ui a `src/lib/helpers/`-ben saját másolatot tart a típusokról és segédfüggvényekről (`ClassProp`, `XOR`, `variantMap`, `as`, `debounce`, `RenderSnippet`), és exportálja is őket; a csomagra váltás megszüntetné a kettőzést, de az exportok miatt meg kell gondolni. — Átállva: függőség `^0.0.4`, a `src/lib/index.ts` újraexportálja, a helyi másolatok törölve.
13. [x] **Komplex kontrollok kivezetése** — a `archive/complex-controls` git tag őrzi az utolsó állapotukat.
   - [x] BlockEditor (+ BlockView, a blokk-komponensek), TableEditor/TablePreview, DiagramEditor, MarkdownEditor — a Brickee váltja ki.
   - [x] GanttChart, ResourceManager.
   - [x] ImgEditor, és vele az `editors` kategória.
   - [x] `src/lib/dev/` editorok (`block-editor`, `block-editor-2`, `editorjs-editor`), a `/editor` és `/editorjs` dev-útvonal.
   - [x] Exportok, `UI` namespace, dokumentáció (en, hu), showcase-oldalak, book referencia, `sheetclip` és `turndown` függőség, notes.
14. [x] ~~**Megfontolandó: az ImgEditor helye.**~~ — elvetve: az ImgEditor is kivezetve (lásd 13.).
15. [x] **Showcase-leltár a többi kategóriára:** a `scripts/showcase/audit.mjs` csak a `data` és az `overlays` oldalakat ellenőrzi (24 oldal); a `content`, `display`, `forms`, `general`, `layout` és `scheduling` 45 oldalának nincs automatikus prop-leltára (`coverage` térkép, `owned` lista). — Mind a 69 oldal lefedve; 8 hiányzó prop pótolva (Prose `children`, `CheckboxGroupManager.children`, `CodeInput.class`, `Input.oninput`).
