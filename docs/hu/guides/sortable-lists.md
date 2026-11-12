# Rendezhető listák összeállítása

Átrendezhető sorokat vagy lapos táblákat stabil elemazonosítókkal és bindolt tömbökkel építs. Egy befejezett húzást helyi állapotváltozásként kezelj, ne mentett tranzakcióként.

## Választás feladat szerint

| Feladat | Összeállítás | Döntés |
|---|---|---|
| Egy sor átrendezése | [SortableList](../controls/data/sortable.md) | Bindold az `items`-t; adj meg `item` snippetet. |
| Áthelyezés oszlopok között | SortableGroup + egyedi azonosítójú SortableListek | Minden cserélhető elemnek globálisan egyedi ID kell. |
| Sorműveletek elkülönítése a húzástól | SortableList `dragHandleSelector`-ral | Adj meg hozzá illeszkedő, értelmes címkéjű fogantyút. |
| Csempék átrendezése | SortableList `orientation="grid"` beállítással | A csempék méretét és térközét magad add meg. |
| Üres oszlop magyarázata | A SortableList `empty` propja | Add meg a kötelező ikont és címet; maradjon használható ejtési terület. |
| Hierarchikus csomópontok mozgatása | [Tree](../controls/layout/tree.md) | A hierarchiát ne korlátlan lapos áthelyezésekkel modellezd. |
| Ütemezett elemek húzása koordináták szerint | [Organizer](../controls/scheduling/organizer.md) | A lista-rendezéstől eltérő interakciós és adatszerződés. |

## Beállítás

Svelte 5-öt használj, a témával és a könyvtár Tailwind 4 szkennelésével az [Első lépések](getting-started.md#css-beállítása) szerint. A SortableListhez **nem** kell Root. A listák közötti áthelyezéshez egyedül a SortableGroup által adott context szükséges. A Root ettől még körbeveheti az alkalmazást a többi vezérlő miatt.

## Recept: feladatok mozgatása két oszlop között

Teljes komponens reaktív oszloptömbökkel, típusos sor-snippetekkel, csak fogantyúval indítható húzással és helyi változásértesítéssel. Nem feltételez külső mentőfüggvényt.

```sveltehtml
<script lang="ts">
  import { Button, SortableGroup, SortableList } from '@atom-forge/ui';
  import { Inbox } from 'lucide-svelte';

  type Task = { id: string; title: string };

  let todo = $state<Task[]>([
    { id: 'task-1', title: 'Plan' },
    { id: 'task-2', title: 'Design' },
  ]);
  let doing = $state<Task[]>([{ id: 'task-3', title: 'Build' }]);
  let changes = $state(0);
  let lastChangedLane = $state('');

  function changed(lane: string) {
    changes += 1;
    lastChangedLane = lane;
  }
</script>


<SortableGroup class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <section aria-label="To do">
    <h2>To do</h2>
    <SortableList
      id="todo"
      bind:items={todo}
      dragHandleSelector="[data-handle]"
      class="min-h-40 gap-2"
      empty={{ icon: Inbox, title: 'No tasks to do' }}
      onchange={() => changed('To do')}
    >
      {#snippet item(task)}
        <div class="flex items-center gap-2 rounded border border-frame bg-control p-3">
          <Button type="button" ghost compact data-handle label={`Move ${task.title}`} class="cursor-grab"/>
          <span>{task.title}</span>
        </div>
      {/snippet}
    </SortableList>
  </section>
  <section aria-label="Doing">
    <h2>Doing</h2>
    <SortableList
      id="doing"
      bind:items={doing}
      dragHandleSelector="[data-handle]"
      class="min-h-40 gap-2"
      empty={{ icon: Inbox, title: 'Nothing in progress' }}
      onchange={() => changed('Doing')}
    >
      {#snippet item(task)}
        <div class="flex items-center gap-2 rounded border border-frame bg-control p-3">
          <Button type="button" ghost compact data-handle label={`Move ${task.title}`} class="cursor-grab"/>
          <span>{task.title}</span>
        </div>
      {/snippet}
    </SortableList>
  </section>
</SortableGroup>
<p role="status">{changes ? `Local list updates: ${changes}. Last changed: ${lastChangedLane}.` : 'Move a task to update the board.'}</p>
```

A [Button](../controls/general/button.md) által renderelt natív gomb kapja meg a `data-handle` attribútumot, amely illeszkedik a szelektorra. A fogantyús húzás interakcióját a függőség adja; a pointeres és billentyűzetes működést teszteld a saját alkalmazásodban. A számláló **listaértesítéseket** számol, nem húzásokat: egy áthelyezés mindkét oszlopot frissítheti.

Egyetlen sorhoz hagyd el a SortableGroupot, és tarts meg egy egyedi azonosítójú SortableListet. A független, csoporton kívüli listáknak is különböző lista-ID kell; az azonos ID-k közös DnD típust kapnak, és véletlenül elemeket cserélhetnek.

## Az alkalmazás feladatai

- A sorrendet és az oszloptagságot az `onchange(nextItems, detail)` alapján mentsd, egyértelmű hibakezeléssel, újrapróbálással és visszagörgetéssel. A bindolt tömbök már a callback előtt értéket kapnak; ez nem megszakítható validációs hook.
- Táblánál hangold össze az értesítéseket, és a teljes tábláról ments konzisztens pillanatképet, ahelyett hogy feltételeznéd: egy oszlop callbackje egy atomi, listák közötti tranzakciót jelent.
- Az ID-k legyenek stabilak és egyediek az összes cserélő zónában. Elemazonosítóként soha ne használd az aktuális tömbindexet.
- Ne feltételezd, hogy a `SortableGroup.rules` vagy a `typeField` kikényszeríti az engedélyezett áthelyezéseket: a jelenlegi SortableList implementáció nem használja ezt a régi szabálymotort. A jogosultságokat/korlátozásokat az alkalmazás tervezésében érvényesítsd; ha az érvénytelen ejtéseket meg kell akadályozni, válassz másik interakciót.
- Az áthelyezés részleteit kezeld óvatosan: a `fromIndex` vagy a `toIndex` lehet `-1` a belépő/kilépő listában; a callbackek csak akkor futnak le, ha a tagság vagy a sorrend megváltozik, nem minden hovernél.
- Nincs külön disabled prop, a régi preview propok pedig csak kompatibilitási célt szolgálnak. A függőben lévő állapot alatti korlátozás, a visszavonás, a párhuzamosság kezelése és — ahol szükséges — egy húzás nélküli alternatív mozgatási folyamat a te feladatod.
