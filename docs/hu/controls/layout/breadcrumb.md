# Breadcrumb

Navigációs útvonal, amely az aktuális oldal helyét mutatja a hierarchiában. Az elemeket `/` választja el. Az utolsó elem mindig félkövér, nem kattintható szöveg.

## Importálás

```ts
import { Breadcrumb } from '@atom-forge/ui';
```

---

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | — | A breadcrumb szegmensei sorrendben. Az utolsó elem mindig nem kattintható. |
| `maxLabelLength` | `number` | — | Minden címkét ennyi karakterre rövidít (`…`-et fűz hozzá). |
| `maxSegments` | `number` | — | Ha az elemek száma ezt meghaladja, a középső szegmenseket egy `…` gombba vonja össze. Kattintásra context menüben jelennek meg a rejtett elemek. |
| `class` | `string` | — | További Tailwind-osztályok a `<nav>` elemen. |

### BreadcrumbItem

```ts
type BreadcrumbItem = {
  label: string;
  href?: string;
  onclick?: (e: MouseEvent) => void;
};
```

---

## Használat

```sveltehtml
<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile' },
]}/>
```

Rövidítéssel és összevonással:

```sveltehtml
<Breadcrumb
  maxLabelLength={20}
  maxSegments={3}
  items={breadcrumbs}
/>
```

### Megjegyzések

- Az utolsó elem a `href`-től függetlenül mindig nem kattintható `<span>`.
- A nem utolsó, `href`-fel vagy `onclick`-kel rendelkező elemek `<a>` linkként jelennek meg.
- A nem utolsó, `href`/`onclick` nélküli elemek letiltott `<span>`-ként jelennek meg.
- A hosszú címkéket a `truncate max-w-32` (linkek) vagy a `max-w-48` (aktuális oldal) vágja le.
- Ha a `maxSegments` be van állítva és túllépik, a középső elemek egy `…` gombba záródnak, amely context menüt nyit.


## Mikor használd

Az oldal szülőhierarchiáján belüli navigációhoz.

## Alternatívák

Egyenrangú nézetekhez a [Tabs](tabs.md), folyamat előrehaladásához a [Stepper](stepper.md) való.

## Beállítás és korlátok

A Root adja a popup contextet az összevont navigációhoz; a komponens akkor is olvassa ezt a contextet, ha az összevonás ki van kapcsolva. Az utolsó elem mindig szöveg. A `maxSegments` túllépése pontosan első / ellipszis / utolsó elrendezést ad, a megtartott szülők száma nem állítható. Az összevont elemek href-akciója a `window.location.href`-et állítja; a normál linkek anchorök. A csak onclickkel rendelkező szegmens `href="#"`-et kap, ezért szükség esetén a handlerben hívd meg a preventDefaultot. Route-felderítést vagy router-állapotot nem kezel.
