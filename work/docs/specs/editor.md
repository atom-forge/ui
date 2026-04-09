# Blokk Szerkesztő Specifikáció (Notion-szerű)

## Áttekintés
Egy minimalista, blokk-alapú szerkesztő Svelte 5 környezetben. A rendszer a **"Split on Load / Join on Save"** elvet követi. A szerkesztő **Syntax Highlighting** módot használ: a Markdown szintaxis látható marad, de vizuálisan kiemelt.

## Adatmodell és Tárolás
A belső állapot egy reaktív JSON tömb, a mentési formátum pedig kiterjesztett Markdown.

### Belső Állapot (`$state`)
```typescript
interface Block {
  id: string;          // NanoID vagy UUID
  type: string;        // 'text' (Markdown), 'youtube', 'gallery', 'callout', stb.
  content: string;     // NYERS Markdown szöveg
  metadata: any;       // Speciális adatok a nem-szöveges blokkokhoz
}
```

## Vizuális Megjelenés (Esztétika)
- **Minimalista Esztétika:** Tiszta terek, kód-szerű letisztultság.
- **Tipográfia:** Alapértelmezett **Monospace betűtípus** (pl. JetBrains Mono, Fira Code vagy System Mono) a pontos karakter-igazítás és a Markdown olvashatóság érdekében.
- **Színpaletta:**
	- Háttér: Fehér (`#FFFFFF`) vagy finom törtfehér (`#F9F9F9`).
	- Szöveg: Mélyszürke (`#37352F`).
	- Szintaxis kiemelés: Finom, pasztell színek a Markdown jelölőknek (`#`, `**`, `>`).

## Megjelenítés és Szerkesztés
- **Blokk-struktúra:** Minden blokk egy egyedi `div[contenteditable]`.
- **Betűtípus:** Monospace (fix szélességű), ami megkönnyíti a kurzor pozicionálását és a vizuális szerkesztést.
- **Billentyűzet Navigáció:**
	- `ArrowUp/Down`: Koordináta-alapú detektálás a blokkváltáshoz, vízszintes (X) pozíció megőrzésével a természetes navigáció érdekében.
	- `Enter`: Új blokkot hoz létre. (Mentéskor: `\n\n` - bekezdés váltás).
	- `Shift + Enter`: Egyetlen manuális sortörés a blokkon **belül**. (Mentéskor: `\n`).
	- **Dupla Shift + Enter**: Automatikus blokk-hasítás (blokk-törés).
	- `Backspace`: Összevonja az aktuális blokkot az előzővel, ha a kurzor az elején áll.
- **Syntax Highlighting (Nem WYSIWYG):** A `text` blokkokban a Markdown karakterek láthatóak maradnak és színezettek.
- **Soft Wrap:** A hosszú sorok automatikusan tördelődnek a tároló szélénél (CSS `pre-wrap`).

## Technikai Megvalósítás (Svelte 5)
- **Állapotkezelés:** `$state` a blokkok listájához.
- **Szerkesztő felület:** `div[contenteditable]` alapú blokkok a `textarea` helyett a rugalmas formázhatóság miatt.
- **Dinamikus Renderelés:** `$derived` vagy Snippet alapú komponens választás a blokk típusa alapján.
- **Highlighting Logika:** Egy könnyűsúlyú parser, ami a `contenteditable` tartalmát stílusozza (regex alapú `span` injektálás).

## Ütemterv (Roadmap)
1. **1. fázis:** `div[contenteditable]` blokkok Monospace betűtípussal és alapvető szövegkezelés.
2. **2. fázis:** Syntax highlighting alapok (regex színezés).
3. **3. fázis:** Blokkok közötti navigáció és granuláris műveletek.
4. **4. fázis:** Speciális blokkok (YouTube, Callout) `block:` szintaxissal.
