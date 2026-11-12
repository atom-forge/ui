# Toast

Könnyű értesítő toastok, egy fix overlayben egymásra rakva. Imperatívan, a `getToastManager()`-rel nyitod meg őket. Beállítható idő után maguktól eltűnnek.

## Importálás

```ts
import { getToastManager } from '@atom-forge/ui';
```

A `Root` automatikusan biztosítja a toast managert, és megjeleníti az overlayt. Kézi beállítás nem kell.

---

## ToastManager API

A managert a `<Root>` fán belül bárhol lekérheted:

```ts
const toast = getToastManager();
```

### `toast.show(message, options?)`

Megjelenít egy toastot, és visszaadja az `id` stringjét. `duration` ms után (alapértelmezésben 3000) magától eltűnik.

### `toast.dismiss(id)`

Kézzel eltávolít egy toastot az azonosítója alapján.

---

## ToastOptions

| Opció | Típus | Alapérték | Leírás |
|--------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Beállítja a kiemelősáv színét és az alapértelmezett ikont. |
| `duration` | `number` | `3000` | Az automatikus eltűnés késleltetése ms-ban. `0` = soha nem tűnik el magától. |
| `closable` | `boolean` | `true` | Bezárógombot jelenít meg. |
| `icon` | `IconDefinition` | — | Felülírja a típus alapértelmezett ikonját. |
| `action` | `{ label: string; callback: () => void }` | — | Akciógombot ad a toasthoz. |

---

## Használat

```sveltehtml
<script lang="ts">
  const toast = getToastManager();
</script>

<Button label="Info"    onclick={() => toast.show('File saved.')}/>
<Button label="Success" onclick={() => toast.show('Upload complete!', { type: 'success' })}/>
<Button label="Warning" onclick={() => toast.show('Low disk space.', { type: 'warning' })}/>
<Button label="Error"   onclick={() => toast.show('Connection failed.', { type: 'error' })}/>
```

### Tartós toast akcióval

```ts
toast.show('New version available.', {
  type: 'info',
  duration: 0,
  action: {
    label: 'Update',
    callback: () => triggerUpdate(),
  },
});
```

### Kézi eltávolítás

```ts
const id = toast.show('Processing...', { duration: 0, closable: false });
await doWork();
toast.dismiss(id);
```

## Mikor használd

Nem blokkoló visszajelzéshez, például befejezésről, figyelmeztetésről vagy helyreállítható hibáról.

## Alternatívák

Vezérlő melletti, tartós validációhoz a [Field](../forms/field.md), olyan esetben pedig, amikor a felhasználónak a folytatás előtt kifejezetten döntenie kell, a [Modal](modal.md) való.

## Beállítás és korlátok

A Root létrehozza a toast managert, és megjeleníti a ToastContainert. Egy leszármazott komponens inicializálásakor kérd le. A show azonnal egy azonosítót ad vissza, nem befejezési promise-t; a dismiss(id) egy korábbi automatikus eltűnés után is biztonságosan hívható. A 0 duration tartós; más értékek timeoutot ütemeznek, hoverre nincs szüneteltetés. Az akció-callback lefut, és a toast azonnal eltűnik, az async munkát nem várja meg. Egyedi tartalomhoz használd a showCustom(component, props, options)-t; az egyedi komponensek maguk felelnek a bezárási felületükért. A toastok túlélik a route-navigációt. A szabványos renderernek nincs alert/status live region szerepe, ezért szükség esetén külön adj akadálymentes, tartós visszajelzést.
