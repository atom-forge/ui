# Attachments Admin UI Komponens Specifikáció

## Áttekintés
Ez a dokumentum az `attachments.md`-ben definiált szerveroldali (JSON és Multi-Storage alapú) attachment rendszerhez tartozó Admin UI komponens specifikációját írja le. Célja, hogy egy egységes, újrahasznosítható felületet biztosítson bármely entitás (pl. User) fájljainak kezelésére (feltöltés, listázás, törlés).

## 1. Komponens Felépítése (Általános UI)

A komponens egy dedikált szekcióként vagy kártyaként (Card) jelenik meg az entitás szerkesztő űrlapján belül.

### Részei:
- **Fejléc:** A kategória neve (pl. "Galéria", "Önéletrajz") és egy számláló (pl. "2/12 feltöltve" a `maxCount` alapján).
- **Feltöltő Zóna (Dropzone):** Egy vizuálisan elkülönülő terület, ahova a felhasználó fájlokat húzhat (Drag & Drop), vagy kattintással megnyithatja a fájlválasztó ablakot.
- **Fájl Lista / Rács (Grid):** A már feltöltött fájlok megjelenítése.

## 2. Funkciók és Működés

### A. Megjelenítés és Listázás
- A komponens bemenetként (prop) megkapja az entitás `attachments` JSON tömbjéből **már kiszűrt, az adott `category`-hoz tartozó** bejegyzések listáját és az entitás azonosítóját (ID, Típus). A szülő felelős a szűrésért (pl. `attachments.filter(a => a.category === category)`).
- A komponens egy kategóriát kezel egyszerre — a `category` prop határozza meg, mit jelenít meg.
- **Előnézet (Preview):** 
  - Képek esetén (`image/jpeg`, `image/png`, `image/webp`) egy bélyegképet (thumbnail) mutat.
  - Egyéb fájlok (pl. `application/pdf`) esetén egy beszédes ikont (pl. PDF ikon) és a fájl nevét jeleníti meg.
- **Metaadatok megjelenítése:** A kártyákon vagy egy tooltip-ben látható a fájlnév, a méret (pl. "1.2 MB"), a feltöltés dátuma és a tárolási mód (Provider: S3 / Local).
- **URL másolása:** Egy gyorsgomb segítségével a futásidőben generált publikus/privát URL vágólapra másolható.

### B. Feltöltés (Upload)
- **Kliens oldali validáció:** A feltöltés megkezdése előtt a komponens ellenőrzi a fájlokat az `AttachmentConfig` alapján:
  - `allowedMime`: Csak a megengedett kiterjesztések választhatók / ejthetők be.
  - `maxSize`: Túl nagy fájl esetén azonnali hibaüzenet (Toast/Alert).
  - `maxCount`: Ha a feltöltés túllépné a limitet, a gomb inaktívvá válik, vagy hibaüzenet jelenik meg. `maxCount === 1` esetén az új fájl felülírja a régit: a kliens confirm dialogot mutat (UX védelem), de a szerver is mindig érvényesíti a cserét — a dialog csak figyelmeztetés, nem egyetlen kapuőr.
- **Feltöltési Folyamat:**
  - A fájl mellett a komponens képes kezdő metaadatokat (pl. kategória-specifikus `meta` objektum) is átadni a szervernek (FormData-ban JSON stringként).
  - Progress bar vagy spinner mutatja a feltöltés állapotát.
  - Siker esetén a fájl azonnal megjelenik a listában (optimistic UI frissítés vagy API re-fetch).

### C. Törlés (Delete)
- Minden fájl kártyáján található egy törlés gomb (kuka ikon).
- Kattintáskor megerősítő modális ablak (Confirm Dialog) jelenhet meg a véletlen törlések elkerülése végett.
- Törlés után a fájl eltűnik a listából, és a `maxCount` számláló frissül.

### D. Kép/Fájl Szerkesztés (Opcionális integráció)
- Képek esetén integrálható az `image-editor-spec.md`-ben leírt képszerkesztővel (vágás, forgatás, fókuszpont beállítás) a feltöltés előtt vagy után.

### E. Sorrendezés (Reordering)
- **Drag and Drop sorrendezés:** A fájlok listájában (vagy rácsában) az elemek húzd és ejtsd (drag and drop) módszerrel átrendezhetők.
- A sorrendezés vizuálisan azonnal frissül a felületen (optimistic UI), és **a mentés azonnal, automatikusan megtörténik** a komponensen belül egy háttér API hívással (`PATCH …/attachments/reorder`).
- Az `onReorder` callback értesítés jellegű (a szülő pl. frissíthet más UI részt) — a tényleges mentést a komponens saját maga végzi.

### F. Átnevezés (Rename)
- A feltöltött fájlok neve utólag módosítható a felületen.
- A rendszer automatikusan megőrzi és védi a fájl eredeti kiterjesztését.
- **Fizikai módosítás:** Az átnevezés nem csak a metaadatokban lévő nevet módosítja, hanem **fizikailag is átnevezi a fájlt a storage-ban** (proxy alapú kiszolgálás miatt fontos a valós fájlnév).
- Az átnevezés beküldésekor a komponens azonnal elküldi a `PATCH …/attachments/{id}` kérést. Az `onRename` callback értesítés jellegű — a tényleges mentést a komponens saját maga végzi.

### G. Áthelyezés / Másolás Kategóriák Között (Move / Copy)
- A felhasználó áthelyezheti (Move) vagy átmásolhatja (Copy) a fájlt egy másik, azonos entitáshoz tartozó attachment kategóriába.
- A lehetséges célkategóriák listáját (nevükkel és konfigurációjukkal együtt) az `availableCategories` prop tartalmazza. A komponens az adott célkategória `config`-ja alapján kliens oldalon is validál (maxCount, allowedMime).
- **Fizikai duplikáció:** Másolás esetén a fájl fizikailag is megkettőződik a storage-ban. Áthelyezésnél fizikailag is mozog.
- A művelet végrehajtásakor a komponens azonnal elküldi a megfelelő API kérést (`POST …/copy` vagy `/move`). Az `onMoveToCategory` / `onCopyToCategory` callbackek értesítés jellegűek — a tényleges mentést a komponens saját maga végzi.

### H. Metaadatok Kezelése (Metadata Management)
- A komponens képes megjeleníteni és szerkeszthetővé tenni a kategória-specifikus metaadatokat.
- **Dinamikus / Custom Űrlapgenerálás:** 
  - Ha a komponens kap egy egyedi Svelte komponenst (`metadataEditorComponent` prop), azt használja az adatok renderelésére és szerkesztésére.
  - Ha nem kap, akkor a `metaSchema` (Zod) alapján automatikusan legenerálja az alapvető űrlapmezőket (pl. string -> input, boolean -> switch).
- **Read-only mezők:** A `config.readonlyMetaFields` tömbben felsorolt mezők inaktív (disabled) formában jelennek meg — ezeket a szerver generálja (pl. hangfájl hossza, képméret), a felhasználó nem szerkesztheti.
- A mentés **azonnali**: a komponens a mezők módosítása (blur esemény) után azonnal `PATCH` kérést küld. Az `onUpdateMeta` callback értesítés jellegű — a tényleges mentést a komponens saját maga végzi.

### I. Kép/Fájl Szerkesztés Integráció
- Képek esetén a komponens integrálható egy külső képszerkesztővel (pl. az `image-editor-spec.md`-ben leírtak szerint).
- **Működés:** A szerkesztő megnyílik, a felhasználó elvégzi a vágást/forgatást. Amikor a szerkesztő modális ablaka becsukódik, a komponens megvizsgálja a kapott választ.
  - Ha történt módosítás, a komponens automatikusan **újratölti (reload)** a fájlt vagy az egész listát.
  - Ha nem történt módosítás (pl. a user bezárta a modált), nem történik semmi, a felület változatlan marad.

## 3. Komponens API (Props) Tervezet (Svelte/React)

```typescript
interface AttachmentsManagerProps {
  entityId: string;           // Pl. 'user_123'
  entityType: string;         // Pl. 'user'
  category: string;           // Pl. 'GALLERY' vagy 'AVATAR'
  
  // A szülő felelős a szűrésért: attachments.filter(a => a.category === category)
  attachments: AttachmentData<any>[];
  
  config: AttachmentCategoryConfig; // A maxCount, maxSize, allowedMime, metaSchema, readonlyMetaFields szabályok
  
  // Cél kategóriák Move/Copy funkcióhoz. A config szükséges a kliens oldali validációhoz (maxCount, allowedMime)
  availableCategories?: { name: string; config: AttachmentCategoryConfig }[];
  
  imageEditorComponent?: Component;    // Opcionális képszerkesztő komponens
  metadataEditorComponent?: Component; // Opcionális egyedi metaadat űrlap komponens
  
  // Értesítő callbackek — a komponens maga végzi az API hívást, ezek a mentés utáni esemény jelzői
  onUploadSuccess?: (newAttachment: AttachmentData<any>) => void;
  onDeleteSuccess?: (deletedAttachmentId: string) => void;
  onReorder?: (newAttachmentsOrder: AttachmentData<any>[]) => void;
  onRename?: (attachmentId: string, newFilename: string) => void;
  onUpdateMeta?: (attachmentId: string, newMeta: any) => void;
  onMoveToCategory?: (attachmentId: string, targetCategory: string) => void;
  onCopyToCategory?: (attachmentId: string, targetCategory: string) => void;
  onError?: (errorMsg: string) => void;
}
```

## 4. Állapotok (States)
- **Idle:** Alapállapot, megjeleníti a fájlokat és a dropzone-t.
- **Dragging:** Amikor a felhasználó egy fájlt húz a dropzone fölé (vizuális visszajelzés, pl. keret színe megváltozik).
- **Uploading:** Feltöltés folyamatban (letiltott inputok, progress indikátor).
- **Error:** Hibaüzenet megjelenítése (pl. "A fájl túl nagy", "Hálózati hiba").
