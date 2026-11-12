# Timeline

Rugalmas idővonal-komponens, amely egy `items` tömböt függőleges vagy vízszintes vonal mentén jelenít meg. A tartalom és a pontok snippetekkel teljesen testreszabhatók.

## Import

```ts
import { Timeline } from '@atom-forge/ui';
```

## Propok

| Prop | Típus | Alapérték | Leírás |
|------|------|---------|-------------|
| `items` | `any[]` | kötelező | Az adattömb. Változtatás nélkül kerül mindkét snippethez. |
| `right` | `boolean` | — | Függőleges elrendezés, a tartalom jobbra (ez az alapértelmezés, ha nincs irány megadva). |
| `left` | `boolean` | — | Függőleges elrendezés, a tartalom balra. |
| `bottom` | `boolean` | — | Vízszintes elrendezés, a tartalom alul. |
| `top` | `boolean` | — | Vízszintes elrendezés, a tartalom felül. |
| `alternate` | `boolean` | `false` | Minden következő elemnél a másik oldalra teszi a tartalmat. |
| `children` | `Snippet<[any]>` | kötelező | Az egyes elemek tartalmát rendereli. |
| `dot` | `Snippet<[any]>` | — | A vonalon lévő pontot rendereli. Alapból egy kis szürke kör. |
| `class` | `string` | — | További osztályok az összekötő vonal elemén. |

Az irány-propok (`left`, `right`, `top`, `bottom`) kizárják egymást; pontosan egyet adj meg. Ha egyik sincs megadva, a `right` viselkedés érvényes.

## Elrendezések

| Elrendezés | Szerkezet |
|--------|-----------|
| `right` | Függőleges vonal bal oldalt, minden tartalom tőle jobbra |
| `left` | Függőleges vonal jobb oldalt, minden tartalom tőle balra |
| `right` + `alternate` | Háromoszlopos rács, a tartalom jobbra és balra váltakozik |
| `bottom` | Vízszintes vonal a szakasz tetején, minden tartalom alatta |
| `top` | Vízszintes vonal alul, minden tartalom felette |
| `bottom` + `alternate` | A tartalom a pontsor alatt és felett váltakozik |

## Példa

```sveltehtml
<script lang="ts">
  import { Timeline } from '@atom-forge/ui';
  import { CheckCircle, Circle } from 'lucide-svelte';

  const tasks = [
    { label: 'Design', done: true },
    { label: 'Build', done: true },
    { label: 'Test', done: false },
  ];
</script>

<Timeline items={tasks} right>
  {#snippet dot(t)}
    {#if t.done}
      <CheckCircle size={18} class="text-emerald-500" />
    {:else}
      <Circle size={18} class="text-muted-contrast" />
    {/if}
  {/snippet}

  {#snippet children(t)}
    <p class="text-sm font-medium">{t.label}</p>
  {/snippet}
</Timeline>
```

## Mikor használd

Sorrendbe rendezett események, mérföldkövek vagy aktivitás megjelenítésére egyedi tartalommal és pontokkal.

## Alternatívák

Aktív munkafolyamat előrehaladásához a [Stepper](../layout/stepper.md), szerkeszthető, egységekhez pozicionált elemekhez az [Organizer](../scheduling/organizer.md) való.

## Beállítás és korlátok

Az elemek a megadott sorrendben jelennek meg: a komponens nem rendez dátum szerint, és nem számol időarányos pozíciót. Legfeljebb egy irány-propot válassz, vagy hagyd el mindet, ekkor right lesz. A `class` a vonalat stílusozza, nem a külső elrendezést. A snippetek az egyes elemeket index nélkül kapják. Nincs kiválasztás, kinyitás, dátumértelmezés vagy kattintáskezelés; az interakciókat és a lista-szemantikát a tartalomban állítsd össze. A vízszintes elrendezések nem adnak külön görgetési vezérlőt.
