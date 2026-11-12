# Adatmegjelenítés összeállítása

Abból a kérdésből indulj ki, amelyre a felhasználónak választ kell kapnia. Az adatlekérést és az átalakításokat tartsd a megjelenítő vezérlőn kívül, és válassz egyértelmű ágat a betöltés, a hiba, az üres eredmény és a kitöltött állapot számára.

## Választás feladat szerint

| Feladat | Összeállítás | Döntés |
|---|---|---|
| Lapos rekordok összehasonlítása | [Table](../controls/data/table.md) | Típusos oszlopok, formatterek vagy cella-snippetek. |
| Rekordok keresése és böngészése | [Input](../controls/forms/input.md) + Table + [Pagination](../controls/layout/pagination.md) | A hívó szűr, szeletel és kezeli a lapozási állapotot. |
| Üres eredmény magyarázata | [EmptyState](../controls/display/empty-state.md) | Csak a betöltés befejezése után mutasd; tegyél mellé helyreállító műveletet. |
| Összetartozó tartalom csoportosítása | [Card](../controls/display/card.md) | A paddinget, a címsorokat és a műveleteket magad add meg. |
| Hierarchia megjelenítése | [Tree](../controls/layout/tree.md) | Hierarchikus adatot használj, ne lapítsd táblázattá a kapcsolatokat. |
| Időbeli események bemutatása | [Timeline](../controls/data/timeline.md) | Rekordrács helyett inkább eseménysort mutass. |
| Trendek vagy eloszlás megjelenítése | [Charts](../controls/data/charts.md), [Heatmap](../controls/data/heatmap.md) | Válaszd a megfelelő adatformát, és adj szöveges alternatívát. |
| Korlátos teljesülés megjelenítése | [ProgressRing](../controls/data/progress-ring.md), [MeterGroup](../controls/data/meter-group.md) | Ellenőrizd az érték/tartomány szerződést; ezek nem adatbetöltők. |

## Beállítás

Svelte 5-öt használj SvelteKitben, a témával és a Tailwind 4 `dist` szkennelésével az [Első lépések](getting-started.md#css-beállítása) szerint. A CSS-t a gyökér layoutban importáld, az oldal tartalmát pedig csomagold `Root`-ba. A Table inicializáláskor lekéri a popup contextet, de csak az oszlopbeállítások menüjéhez használja. Ha a `columnsEditable` be van kapcsolva, kell a Root (vagy egy kézzel beállított popup provider/container); egy kikapcsolt oszlopszerkesztésű, egyszerű Table nélküle is renderelhető.

## Recept: helyi tábla szűrése és lapozása

Teljes oldalkomponens a Root alatt. A kis oldalméret miatt a lapozás backend nélkül is látható.

```sveltehtml
<script lang="ts">
  import { Card, EmptyState, Field, Input, Pagination, Table, type ColumnDef } from '@atom-forge/ui';
  import { Search } from 'lucide-svelte';

  type Person = { id: number; name: string; role: string };
  const searchId = $props.id();
  let people = $state<Person[]>([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Editor' },
    { id: 3, name: 'Carol', role: 'Reader' },
  ]);
  const columns: ColumnDef<Person>[] = [
    { key: 'name', label: 'Name', grow: true },
    { key: 'role', label: 'Role', width: '10rem' },
  ];
  let query = $state('');
  let page = $state(1);
  const pageSize = 2;
  const filtered = $derived(people.filter(person => person.name.toLowerCase().includes(query.toLowerCase())));
  const total = $derived(Math.max(1, Math.ceil(filtered.length / pageSize)));
  const currentPage = $derived(Math.min(Math.max(1, page), total));
  const visible = $derived(filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize));
</script>

<Card class="p-4 flex flex-col gap-4">
  <h2>People</h2>
  <Field label="Search by name" for={searchId}>
    <Input id={searchId} bind:value={query} oninput={() => page = 1}/>
  </Field>
  {#if filtered.length === 0}
    <EmptyState icon={Search} title="No matching people" description="Try another name."/>
  {:else}
    <Table data={visible} {columns}/>
    {#if total > 1}
      <Pagination page={currentPage} {total} onchange={next => page = next}/>
    {/if}
  {/if}
  <p role="status">{filtered.length} matching people</p>
</Card>
```

Előbb szűrj, és csak utána számold ki az oldalszámot és szeletelj. A `Pagination.total` **oldalszám**, nem rekordszám; az oldalak 1-től indulnak, az `onchange` pedig a hívó állapotát frissíti. Keresésnél állítsd vissza az oldalt, és ha a gyűjtemény zsugorodik, korlátozd az érvényes oldalszámot.

## Az alkalmazás feladatai

- Az adatlekérés, a betöltés megkülönböztetése a hibáktól és az üres eredményektől, az újrapróbálás, valamint az elavult kérések megszakítása vagy figyelmen kívül hagyása. A fenti helyi tömbnek szándékosan nincs hálózati életciklusa.
- Szükség szerint a rendezés, a kijelölés, a szerkesztés, a szűrés, a lapozás és a virtualizáció megvalósítása. A Table a kapott sorokat a kapott sorrendben rendereli; nem data-grid motor.
- Az URL-szinkronizáció, a szerveroldali lapozás, a jogosultságok, a formázás és a vizualizációk akadálymentes alternatívái.
- Az oszlopokat inicializálási konfigurációként kezeld: a Table belsőleg eltárolja a kezdeti tömböt, és kitölti az oszlopobjektumokon hiányzó `visible` flageket. A későbbi cseréhez újra kell mountolni; a `bind:columns` jelenleg nem jelzi vissza a hívónak a láthatósági menüben tett változásokat.
- Egy oszlopban ne kombináld a `formatter`-t a `snippet`-tel, se a `grow`-t a `shrink`-kel. A `fixed` a láthatóságot védi, és a görgetés nélküli súlyozást befolyásolja; nem hoz létre sticky oszlopot.
- Egyedi sorműveletekhez használj egyértelmű, akadálymentes gombokat/linkeket. A Table `rowClick`-je figyelmen kívül hagyja az interaktív leszármazottakat, de a hívó által kezelt kijelölés és navigáció így is átgondolt viselkedést igényel.
