# Attachment Rendszer Tervezet (JSON alapú, Multi-Storage)

## 1\. Tárolási Stratégia (Storage Providers)

A rendszert úgy alakítjuk ki, hogy egy "Adapter" mintát használva cserélhető legyen a háttértár. Egy környezeti változó (pl. `STORAGE_PROVIDER=local` vagy `s3`) dönti el, hova mentsünk.

-   **S3 Provider:** Fájlok feltöltése AWS S3, Cloudflare R2 vagy MinIO bucketbe.

-   **Local Provider:** Fájlok mentése a szerver fájlrendszerébe (pl. `./uploads` mappa). A fájlokat egy dedikált SvelteKit endpoint szolgálja ki. (Reverse proxy - pl. Nginx/Caddy - vagy app szinten dönthető el a jogosultságvizsgálat).


_Megjegyzés:_ Minden fájl a SvelteKit/Bun szerveren folyik át. A `Bun.write()` használata rendkívül gyors lokális fájlmentést tesz lehetővé.

## 2\. Adatbázis Séma (Prisma - JSON)

A fájlok metaadatait az entitás (pl. `User`) egy JSON mezőjében tároljuk. Nincs külön `Attachment` tábla. Csak a `path`\-t tároljuk, az URL-t futásidőben generáljuk.

```
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  // ... egyéb mezők
  
  attachments Json?    // Itt tároljuk a fájlok metaadatait tömbként
}
```

**A JSON struktúrája (TypeScript Interface):**

```
export interface AttachmentData<TMeta = Record<string, any>> {
  id: string;         // Generált azonosító (pl. crypto.randomUUID())
  category: string;   // Rendszer szintű kategória: 'AVATAR', 'CV', 'GALLERY'
  filename: string;   // Eredeti fájlnév (URL-safe formátumban tárolva)
  provider: 'local' | 's3'; // Hol van aktuálisan tárolva
  path: string;       // S3 object key VAGY relatív lokális útvonal.
  mimeType: string;
  size: number;
  uploadedAt: string; // ISO dátum
  
  // Kategória-specifikus extra metaadatok
  meta?: TMeta;       // Pl. { zoom: 1.5, visible: true }, EXIF adatok, MP3 tagek stb.
}
// Az 'attachments' mező a DB-ben egy AttachmentData[] típusú tömb lesz.
```

## 3\. Kategóriák és Szabályrendszer (Konfiguráció)

A konfigurációban definiáljuk a kategóriánként eltérő `metaSchema`\-kat (Zod), illetve egy opcionális `onUpload` processzor függvényt, ami a nyers fájlból automatikusan generálhat metaadatokat, VAGY akár magát a fájlt is módosíthatja.

- **`normalize`**: Ha `true`, a szerver feltöltés előtt normalizálja a képet: egységes formátumra konvertálja (WebP), maximális méretre méretezi, és eltávolítja az EXIF adatokat (adatvédelem). Csak képtípusoknál értelmes.
- **`readonlyMetaFields`**: String tömb, amely felsorolja azokat a `meta` mezőneveket, amelyeket kizárólag a szerver (pl. `onUpload` processzor) írhat — a kliens PATCH kérésekor ezek a mezők figyelmen kívül maradnak. Pl. `['durationSeconds', 'width', 'height']`.

```
// attachment.config.ts
import { z } from 'zod';

export const AttachmentConfig = {
  USER: {
    AVATAR: { 
      maxCount: 1, 
      maxSize: 2 * 1024 * 1024, 
      allowedMime: ['image/jpeg', 'image/png', 'image/webp'], 
      normalize: true,
      metaSchema: z.object({
        zoom: z.number().min(1).max(3).optional().default(1),
        offsetX: z.number().optional(),
        offsetY: z.number().optional()
      }).optional()
    },
    GALLERY: { 
      maxCount: 12, 
      maxSize: 900 * 1024, 
      allowedMime: ['image/jpeg', 'image/png', 'image/webp'], 
      normalize: false,
      metaSchema: z.object({
        alt: z.string().max(100).optional(),
        visible: z.boolean().default(true),
        tags: z.array(z.string()).optional()
      }).optional(),
      // Pre-processzor: Vízjel hozzáadása
      onUpload: async (file: File, currentMeta: any) => {
        // const bufferWithWatermark = await addWatermark(file);
        return {
          meta: currentMeta,
          file: file // Itt adhatjuk vissza a módosított buffert is!
        };
      }
    },
    VOICE_INTRO: {
      maxCount: 1,
      maxSize: 5 * 1024 * 1024,
      allowedMime: ['audio/mpeg'],
      normalize: false,
      metaSchema: z.object({
        title: z.string().optional(),
        artist: z.string().optional(),
        durationSeconds: z.number().optional()
      }).optional(),
      readonlyMetaFields: ['durationSeconds'], // csak a szerver írhatja (onUpload processzor)
      // Pre-processzor: kinyeri a tageket mentés előtt
      onUpload: async (file: File, currentMeta: any) => {
        // pl. music-metadata hívás Bun alatt
        return {
          meta: {
            ...currentMeta,
            title: "Parsed Title", 
            artist: "Parsed Artist"
          },
          file: file // Fájl marad az eredeti
        };
      }
    }
  }
} as const;
```

## 4\. API és Üzleti Logika Tervezet

### A. Storage Service (Absztrakció)

```
// storage.server.ts
export interface StorageAdapter {
  upload(file: File | Buffer, directory: string, originalFilename: string): Promise<string>;
  delete(path: string): Promise<void>;
  rename(oldPath: string, newFilename: string): Promise<string>;         // returns new path
  copy(sourcePath: string, targetDirectory: string, newFilename: string): Promise<string>; // returns new path
}
```

### B. Upload Folyamat (`POST /api/users/{id}/attachments`)

**Payload (FormData):** `file`, `category`, és egy JSON stringesített `meta` objektum (ha a user is küld manuális adatokat).

1.  **Validáció:** Jogosultság ellenőrzése. Fájl validáció (`AttachmentConfig` szerint).

2.  **Kliens Meta Validáció:** `let parsedMeta = config.metaSchema.parse(JSON.parse(formData.get('meta') || '{}'))`

3.  **Fájl Feldolgozás (Pre-process):** `let uploadFile: File | Buffer = file;` Ha van a configban `onUpload` függvény: `const processed = await config.onUpload(file, parsedMeta);` `parsedMeta = processed.meta;` `uploadFile = processed.file || file;` // Felülírjuk, ha a processzor módosította

4.  **Entitás lekérése:** `const user = await prisma.user.findUnique(...)`

5.  **Limit ellenőrzés a JSON-ben:** `maxCount` vizsgálata, esetleges korábbi fájl törlése (ha `maxCount === 1`).

6.  **Fájlnév Normalizálás & Mentés:** `StorageAdapter.upload(uploadFile, ...)`

7.  **DB Frissítés:** Az új fájl metaadatainak (benne a módosított `parsedMeta` objektummal) hozzáfűzése a JSON tömbhöz és mentés: `prisma.user.update({ data: { attachments: updatedArray } })`

8.  **Hook futtatása:** `onAttachmentUploaded(newAttachment, entityType, entityId)`


### C. Update és Metaadat Kezelés (`PATCH /api/users/{id}/attachments/{fileId}`)

A kliens felküldi az új `meta` objektumot vagy a fájl új nevét (`filename`).
- **Név módosítás (Rename):** Ha a `filename` változik, a szerver **fizikailag is átnevezi a fájlt a storage-ban** (StorageAdapter.rename funkció), és frissíti a DB-t. Ez szükséges a proxy/statikus kiszolgáló miatt.
- **Meta frissítés:** A backend a kategóriának megfelelő `metaSchema`-val validálja, és frissíti a JSON tömbben az adott fájl `meta` tulajdonságát.
- **Read-only meták:** A backend a `config.readonlyMetaFields` tömb alapján kiszűri a kliens által küldött meta objektumból a csak-olvasható mezőket, így azok kliens oldalról nem írhatók felül.

### D. Sorrendezés (`PATCH /api/users/{id}/attachments/reorder`)

A kliens elküldi az adott kategórián belüli fájlok kívánt sorrendjét ID-k tömbjeként.

**Payload (JSON):** `{ category: string, orderedIds: string[] }`

1. **Validáció:** Jogosultság ellenőrzése. Az `orderedIds` tömb elemeinek meg kell egyeznie pontosan a DB-ben lévő, adott kategóriába tartozó fájlok ID-ivel (se több, se kevesebb).
2. **DB frissítés:** A JSON tömb sorrendje az `orderedIds` alapján átrendezésre kerül, majd Prisma `update`-tel mentés.

### E. Áthelyezés és Másolás (`POST /api/users/{id}/attachments/{fileId}/copy` és `/move`)

A kliens kéri egy fájl átrakását egy másik kategóriába. **Payload (JSON):** `{ targetCategory: string }`
- **Copy (Másolás):** A rendszer validálja a cél kategória szabályait (maxCount, allowedMime). Ha minden rendben, a `StorageAdapter.copy` **fizikailag is megkettőzi a fájlt**, új azonosítót generál, és beteszi az új bejegyzést a JSON tömbbe. (Ez meggátolja, hogy az eredeti törlése elrontsa a másolatot).
- **Move (Áthelyezés):** A rendszer validál, a fájlt fizikailag áthelyezi/átnevezi (ha szükséges a mappastruktúra miatt), frissíti a JSON adatokat (kategória módosítása).

### F. Delete Folyamat (`DELETE /api/users/{id}/attachments/{fileId}`)

1.  **Entitás lekérése:** Törlendő fájl megkeresése a JSON-ben.

2.  **Fájl törlése:** `StorageAdapter.delete(file.path)`.

3.  **DB Frissítés:** JSON tömb szűrése, mentés.

4.  **Hook futtatása:** `onAttachmentDeleted(deletedAttachment, entityType, entityId)`


## 5\. Eseményvezérelt Hookok

```
// attachment.hooks.ts
export async function onAttachmentUploaded(attachment: AttachmentData, entityType: string, entityId: string) {
  console.log(`[ATTACHMENT_ADDED] ${entityType}/${entityId} - ${attachment.filename}`);
}

export async function onAttachmentDeleted(attachment: AttachmentData, entityType: string, entityId: string) {
  console.log(`[ATTACHMENT_REMOVED] ${entityType}/${entityId} - ${attachment.filename}`);
}
```

## 6\. Nyitott Kérdések / Továbbfejlesztés (TBD)

-   **Konzisztencia (Árva fájlok kezelése):** Ha a fájl fizikai mentése sikeres, de a Prisma DB `update` elszáll, a fájl a storage-ban marad. Ennek takarítására egy ütemezett jobot (pl. havi Bun cron job) hozunk létre, ami összeveti a storage tartalmát a DB-vel, és törli az árva fájlokat.