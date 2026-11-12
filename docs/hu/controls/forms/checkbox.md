# Checkbox

Logikai kapcsoló vezérlő opcionális csoportkezeléssel és három színvariánssal.

---

## Importálás

```ts
import { Checkbox, CheckboxView, CheckboxGroupManager, createCheckboxGroupManager } from '@atom-forge/ui';
```

## Komponensek

| Komponens | Leírás |
|-----------|-------------|
| `Checkbox` | Teljes, állapotot kezelő checkbox — kezeli az értékkötést, a csoportba regisztrálást és a kattintási logikát. |
| `CheckboxView` | Állapot nélküli, csak renderelő komponens. Nincs belső logikája; a `status`-t és az `onclick`-et te kezeled. |
| `CheckboxGroupManager` | Context provider komponens — csomagold bele a checkboxokat, hogy csoportként működjenek. |
| `createCheckboxGroupManager()` | Csoportkezelőt hoz létre az aktuális komponens contextjében, wrapper elem nélkül. |

---

## Checkbox propok

| Prop | Típus | Csoport | Alapérték | Leírás |
|------|------|-------|---------|-------------|
| `value` | `boolean` | Érték | `false` | Bindolható bejelölt állapot. Kizárja a `checked`-et. |
| `checked` | `boolean` | Érték | — | Alternatív bindolható bejelölt állapot. Kizárja a `value`-t. |
| `onchange` | `(checked: boolean) => void` | — | — | Minden alkalommal lefut, amikor a bejelölt állapot változik. |
| `label` | `string` | — | `''` | A checkbox mellett megjelenő szöveg. |
| `disabled` | `boolean` | — | `false` | Letiltja az interakciót; halványított megjelenést ad. |
| `primary` | `boolean` | Szín | — | A bejelölt állapot az elsődleges (primary) színt használja. |
| `accent` | `boolean` | Szín | — | A bejelölt állapot az accent színt használja. |
| `compact` | `boolean` | Méret | — | Közepes méret (16px-es doboz, `text-sm` címke). |
| `small` | `boolean` | Méret | — | Kis méret (14px-es doboz, `text-xs` címke). |
| `group` | `string` | — | — | A csoport neve. Szükséges hozzá egy `CheckboxGroupManager` a contextben. |
| `master` | `boolean` | — | `false` | Ha a `group` meg van adva — a csoport összes tagját váltja; indeterminate állapotot mutat, ha csak néhány van bejelölve. |

---

## CheckboxView propok

| Prop | Típus | Csoport | Alapérték | Leírás |
|------|------|-------|---------|-------------|
| `status` | `'checked' \| 'some' \| 'unchecked'` | — | `'unchecked'` | Vizuális állapot. A `'some'` mínusz ikont renderel (indeterminate). |
| `label` | `string` | — | `''` | A checkbox mellett megjelenő szöveg. |
| `disabled` | `boolean` | — | `false` | Halványított, nem interaktív megjelenés. |
| `primary` | `boolean` | Szín | — | Az aktív állapot az elsődleges (primary) színt használja. |
| `accent` | `boolean` | Szín | — | Az aktív állapot az accent színt használja. |
| `compact` | `boolean` | Méret | — | Közepes méret. |
| `small` | `boolean` | Méret | — | Kis méret. |
| `onclick` | `(event: MouseEvent) => void` | — | — | Kattintáskezelő — az állapotkezelés teljes egészében a te feladatod. |

---

## Színvariánsok

Három variáns a bejelölt/aktív állapothoz. Legfeljebb egy érvényes; kölcsönösen kizárják egymást (`XOR`).

| Variáns | Doboz színe | Hover |
|---------|-----------|-------|
| *(alapértelmezett)* | `bg-control-v border-frame text-control-contrast` | `hover:bg-secondary` |
| `primary` | `bg-primary border-primary text-primary-contrast` | `hover:bg-primary/10` |
| `accent` | `bg-accent border-accent text-accent-contrast` | `hover:bg-accent/10` |

A nem bejelölt állapot variánstól függetlenül mindig `bg-control border-frame`.

```sveltehtml
<Checkbox label="Default"  value={true} />
<Checkbox label="Primary"  value={true} primary />
<Checkbox label="Accent"   value={true} accent />

<!-- checked as alternative binding -->
<Checkbox label="Default" bind:checked={isOn} />

<!-- with onchange -->
<Checkbox label="Notify me" bind:value={enabled} onchange={(v) => console.log('changed:', v)} />
```

---

## Méretek

Három méret, kölcsönösen kizárják egymást.

| Méret | Doboz | Címke betűmérete |
|------|-----|-----------|
| *(normál)* | `w-5 h-5` (20px) | örökölt |
| `compact` | `w-4 h-4` (16px) | `text-sm` |
| `small` | `w-3.5 h-3.5` (14px) | `text-xs` |

> **Megjegyzés:** Normál címkemérethez ne használd a `text-base`-t — mivel a `--color-base` definiált CSS-változó, a Tailwind v4 színosztályként értelmezi, nem betűméret-osztályként.

---

## Csoportkezelés

A csoportosított checkboxok egy `CheckboxGroupManager`-en keresztül osztoznak az állapoton. Az azonos csoportba tartozó checkboxoknak ugyanazt a `group` szöveget kell kapniuk, és ugyanahhoz a manager contexthez kell hozzáférniük.

### 1. lehetőség — Wrapper komponens

```sveltehtml
<CheckboxGroupManager>
  <Checkbox group="items" label="Select All" master />
  <hr />
  <Checkbox group="items" label="Option A" value={false} />
  <Checkbox group="items" label="Option B" value={true} />
  <Checkbox group="items" label="Option C" value={true} />
</CheckboxGroupManager>
```

### 2. lehetőség — Programozottan (szétszórt elrendezés)

Hívd meg a `createCheckboxGroupManager()`-t a legközelebbi közös ős script blokkjában. A checkboxoknak nem kell közvetlen gyerekeknek lenniük.

```sveltehtml
<script lang="ts">
  import { createCheckboxGroupManager, Checkbox } from '@atom-forge/ui';
  createCheckboxGroupManager();
</script>

<!-- checkboxes can be anywhere in the subtree -->
<Checkbox group="items" label="Select All" master />
<Checkbox group="items" label="Option A" value={false} />
```

### A master checkbox működése

| Csoport állapota | A master megjelenése |
|-------------|----------------|
| Mind bejelölve | bejelölt |
| Egyik sincs bejelölve | nem bejelölt |
| Vegyes | indeterminate (`'some'`) |

Ha vegyes vagy üres állapotban kattintasz a masterre → mindet bejelöli. Ha mind be van jelölve → mindegyikről leveszi a jelölést.

---

## Felépítés

```
Checkbox
  └── CheckboxView          (render only)

CheckboxGroupManager        (context provider component)
  └── sets CheckboxGroupManager instance in context

createCheckboxGroupManager() (function)
  └── same as above, without a wrapper element

CheckboxGroupManager (class)
  └── groups: Map<string, NamedCheckboxGroupManager>

NamedCheckboxGroupManager (class)
  ├── masters: Map<id, { changeState }>
  ├── values:  Map<id, { value, changeState }>
  ├── registerMaster / unregisterMaster
  ├── registerValue  / unregisterValue
  ├── set(id, value)         — toggle individual item
  ├── toggleAll()            — master click handler
  └── updateMasterState()    — recalculates master status after any change
```

A checkboxok az `onMount`-ban regisztrálják magukat, és megszűnéskor kiregisztrálnak (az `onMount`-ból visszaadott cleanup révén). A `group` propot az inicializáláskor `untrack()` rögzíti — a csoport nevének futásidejű módosítása nem támogatott.

---

## Akadálymentesség

A `CheckboxView` egy `<div role="checkbox">` elemet renderel, a következőkkel:
- `aria-checked` — `true` / `false` / `'mixed'` (indeterminate állapotban)
- `aria-disabled` — letiltott állapotban kerül rá
- `tabindex="0"` — billentyűzettel fókuszálható (letiltott állapotban elmarad)
- `onkeydown` — a Space és az Enter aktiválja a checkboxot

## Mikor használd

Független igen/nem választásokhoz, beleértve az „összes kijelölése” csoportokat indeterminate masterrel.

## Alternatívák

Egymást kizáró választásokhoz használd a [Radio](radio.md)-t, be/ki beállításhoz a [Switch](switch.md)-et. A CheckboxView csak akkor való, ha a hívó kezeli a teljes állapotot.

## Beállítás és működés

Egy kötést válassz (`value` vagy `checked`); az alias az inicializáláskor dől el, így ha a `checked`-et használod, logikai értékkel inicializáld. Az `onchange`-et a belső állapotbeállító útvonal hívja, a group manager frissítéseit is beleértve, nem pedig tetszőleges külső értékadások figyelője. Az önálló kötések követik a külső változásokat; csoportban a vizuális állapotot a manager birtokolja, és nincs olyan effect, amely a későbbi külső értékadásokat beszinkronizálná a managerbe. A csoportba regisztrálás mountkor történik. A master checkboxok az összesített állapotot mutatják, de ehhez nem frissítik a saját logikai kötésüket, és nem hívják meg az `onchange`-et. A csoportszintű műveletek nem hagyják ki a letiltott tagokat; a disabled a helyi interakciót tiltja, a manager által vezérelt változásokat nem.
