# Radio

Rádiógomb-csoport, amely a `RadioGroup`-ból (a context provider) és a `RadioButton`-okból (az egyes opciók) épül fel. A méretet a `RadioGroup`-on állítod be, és minden gyerek örökli.

## Importálás

```ts
import { RadioGroup, RadioButton } from '@atom-forge/ui';
```

---

## RadioGroup propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `any` | — | Bindolható, aktuálisan kiválasztott érték. |
| `size` | `'normal' \| 'compact' \| 'small'` | `'normal'` | A contexten keresztül minden `RadioButton` gyereknek továbbadott méret. |
| `primary` | `boolean` | — | Primary színvariáns. Kizárja az `accent`-et. |
| `accent` | `boolean` | — | Accent színvariáns. Kizárja a `primary`-t. |
| `class` | `string` | — | További osztályok a wrapper diven. |

---

## RadioButton propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `value` | `any` | — | Az érték, amelyet ez az opció képvisel. |
| `label` | `string` | — | A gomb mellett megjelenő szöveges címke. |
| `disabled` | `boolean` | — | Letiltja ezt az opciót. |
| `class` | `string` | — | További osztályok. |

A méretet a szülő `RadioGroup` contextjéből örökli. Az elemek `compact` / `small` propjai csak akkor érvényesülnek, ha a csoportnál nincs megadva `size`. A színvariáns (`primary` / `accent` / alapértelmezett) mindig a `RadioGroup`-on állítható, és minden gyerekre vonatkozik.

---

## Használat

```sveltehtml
<script lang="ts">
  let role = $state('user');
</script>

<RadioGroup bind:value={role} class="flex flex-col gap-2">
  <RadioButton value="admin" label="Admin"/>
  <RadioButton value="user" label="User"/>
  <RadioButton value="guest" label="Guest" disabled/>
</RadioGroup>

<!-- Compact horizontal group -->
<RadioGroup bind:value={role} size="compact" class="flex flex-row gap-4">
  <RadioButton value="admin" label="Admin"/>
  <RadioButton value="user" label="User"/>
</RadioGroup>

<!-- Primary variant -->
<RadioGroup bind:value={role} primary class="flex flex-col gap-2">
  <RadioButton value="admin" label="Admin"/>
  <RadioButton value="user" label="User"/>
</RadioGroup>

<!-- Accent variant -->
<RadioGroup bind:value={role} accent class="flex flex-col gap-2">
  <RadioButton value="admin" label="Admin"/>
  <RadioButton value="user" label="User"/>
</RadioGroup>
```

## Mikor használd

Egy választáshoz néhány, egyszerre látható opció közül.

## Alternatívák

Kompakt listához használd a [Select](select.md)-et vagy a [NativeSelect](native-select.md)-et; független választásokhoz a [Checkbox](checkbox.md)-ot.

## Beállítás és működés

A RadioButtonnak egy RadioGroup ősre van szüksége, nem a Rootra. A csoport értékét bindold; az összehasonlítás szigorú egyenlőséggel történik. A csoport mérete és színe az inicializáláskor rögzül. A csoportnál megadott `size` elsőbbséget élvez az elemek méret-propjaival szemben; az elemek propjai csak akkor érvényesek, ha a csoport mérete nincs megadva. Az értékszinkronizálás effecteket használ, és nincs nyilvános change callback. **Jelenlegi korlát:** az opciók csak kattintásra reagáló divekként renderelődnek, natív radio inputok, billentyűzetes navigáció és radio ARIA-szemantika nélkül. Ne számíts a böngésző natív rádiógomb-akadálymentességére vagy űrlap-szerializálására.
