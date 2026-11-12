# Stepper

Navigációs komponens, amely végigvezeti a felhasználót egy lépésenkénti folyamaton. Megjeleníti a befejezett, az aktuális és a következő lépéseket, összekötő vonalakkal. Vízszintes és függőleges elrendezést is támogat.

## Importálás

```ts
import { Stepper } from '@atom-forge/ui';
```

## Propok

| Prop          | Típus                         | Alapérték        | Leírás |
|---------------|-------------------------------|------------------|-------------|
| `steps`       | `Step[]`                      | `[]`             | A lépések tömbje. Minden lépésnek van `id`-ja, `label`-je és opcionális `description`-je. |
| `current`     | `string` (bindable)           | `steps[0]?.id`   | Az aktív lépés `id`-ja. Az előtte lévő lépések befejezettnek számítanak. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'`   | Az elrendezés iránya. |
| `readonly`    | `boolean`                     | `true`           | Ha `false`, egy befejezett lépésre kattintva oda lehet visszalépni. |
| `compact`     | `boolean`                     | `false`          | Kisebb ikon- és betűméret. Kompakt módban a leírások rejtve vannak. |
| `class`       | `string`                      | —                | További CSS-osztályok a gyökér `<nav>` elemen. |

## Step típus

```ts
type Step = {
    id: string;
    label: string;
    description?: string;
};
```

## Akadálymentesség

- A gyökérelem egy `<nav aria-label="Progress">`.
- A lépések rendezett listaként (`<ol>`) jelennek meg.
- Az aktív lépés `aria-current="step"` attribútumot kap.
- A befejezett lépések képernyőolvasóknak szóló `sr-only` "(Completed)" címkét kapnak.
- `readonly={false}` esetén a befejezett lépések `<button>` elemként jelennek meg.

## Használat

```sveltehtml
<script lang="ts">
    import { Stepper } from '@atom-forge/ui';

    const steps = [
        { id: 'info',    label: 'Basic info',  description: 'Fill in your details.' },
        { id: 'address', label: 'Address',      description: 'Where should we ship?' },
        { id: 'review',  label: 'Review',       description: 'Double-check your order.' },
        { id: 'submit',  label: 'Submit' },
    ];

    let current = $state('address');
</script>

<Stepper {steps} bind:current readonly={false} />
```

## Mikor használd

Egy lépésenkénti munkafolyamat előrehaladásának megjelenítésére.

## Alternatívák

Egyenrangú tartalomnézetekhez a [Tabs](tabs.md), munkafolyamat-állapot helyett eseményekhez a [Timeline](../data/timeline.md) való.

## Beállítás és korlátok

A current-et egy érvényes lépésazonosítóhoz bindold. A „befejezett” azt jelenti, hogy a lépés az aktuális előtt áll, nem azt, hogy külön validálva lett. A `readonly={false}` csak befejezett lépésekre enged navigálni; az előrelépés az alkalmazás dolga. Nincs validáció, oldaltartalom, perzisztencia vagy változás-callback. Érvénytelen current azonosítónál minden lépés következőként jelenik meg. A kompakt méretet inicializáláskor rögzíti.
