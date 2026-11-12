# Zen

Teljes képernyős overlay zavaró tényezők nélküli fókuszmódhoz. Bármilyen tartalmat becsomagolhatsz vele, és az elmosott, elsötétített backdrop fölött jelenik meg. Kizárólag a `bind:active`-val aktiválható — nincs beépített kiváltója.

## Importálás

```ts
import { Zen } from '@atom-forge/ui';
```

---

## Propok

| Prop              | Típus                              | Alapérték | Leírás                                                                                              |
|-------------------|------------------------------------|---------|-----------------------------------------------------------------------------------------------------|
| `active`          | `boolean`                          | `false` | Bindolható. A láthatóságot szabályozza.                                                             |
| `closeOnEsc`      | `boolean`                          | `true`  | Bezárás `Escape` billentyűre.                                                                       |
| `closeOnBackdrop` | `boolean`                          | `true`  | Bezárás a backdropra kattintáskor.                                                                  |
| `title`           | `string`                           | —       | Opcionális címke az overlay alján egy keskeny sávban, másodlagos pill stílusban.                    |
| `backdropClass`   | `string`                           | —       | További Tailwind-osztályok a backdrop elemen.                                                       |
| `zenClass`        | `string`                           | —       | További Tailwind-osztályok a belső tartalom-/elrendezés-wrapperen.                                  |
| `closeButton`     | `Snippet<[{ close: () => void }]>` | —       | Egyedi bezárógomb. Egy `close` callbacket kap. Alapértelmezésben egy `×` gomb a jobb felső sarokban. |

---

## Elrendezés

```
div with dialog role (fixed inset-0, z-9998, backdrop)
├── × close button (absolute top-4 right-4)
└── flex-col full height
    ├── flex-1 — centres content vertically & horizontally (max-w-3xl)
    └── title area (shrink-0, secondary pill label, bottom)
```

- Aktív állapotban a body görgetése zárolva van; a görgetősáv szélességét kompenzálja, hogy ne ugorjon el az elrendezés.
- Az `Escape` és a backdropra kattintás `active = false`-ra állít.

---

## Használat

### Fókuszmódú szerkesztő

```sveltehtml
<script lang="ts">
  let text = $state('');
  let zenActive = $state(false);
</script>

<Field label="Article">
  <Textarea bind:value={text} rows={4} showCounter/>
</Field>
<Button icon={IconArrowsMaximize} label="Zen mode" onclick={() => zenActive = true}/>

<Zen bind:active={zenActive} title="Article">
  <Textarea bind:value={text} rows={10} showCounter class="flex-1"/>
</Zen>
```

### Űrlap zen módban

```sveltehtml
<Button label="Write a message" onclick={() => active = true}/>

<Zen bind:active title="New Message">
  <FieldGroup labelWidth="100px" class="w-full">
    <Field label="Name" layout="horizontal">
      <Input bind:value={name}/>
    </Field>
    <Field label="Message" layout="horizontal">
      <Textarea bind:value={message} rows={8} class="flex-1"/>
    </Field>
    <FieldSpan class="flex justify-end gap-2">
      <Button label="Cancel" ghost onclick={() => active = false}/>
      <Button label="Send" onclick={() => active = false}/>
    </FieldSpan>
  </FieldGroup>
</Zen>
```

### Egyedi bezárógomb

```sveltehtml
<Zen bind:active {closeButton}>
  <!-- content -->
</Zen>

{#snippet closeButton({ close })}
  <button onclick={close}>
    <IconX size={14}/> Exit
  </button>
{/snippet}
```

---

## Megjegyzések

- `active = false` esetén a `Zen` semmit nem renderel — a template-ben bárhová nyugodtan elhelyezheted.
- A megnyitás mindig kívülről, `bind:active = true`-val történik.
- A `title` opcionális — ha elhagyod, az alsó sáv nem jelenik meg.

## Mikor használd

Zavaró tényezők nélküli tartalommegjelenítéshez, amelyet egy külső aktív állapot vezérel.

## Alternatívák

Manager alapú promise-eredményekhez és közös rétegzéshez a [Modal](modal.md) vagy a [Drawer](drawer.md) való.

## Beállítás és korlátok

Az active-et alkalmazásállapothoz bindold; nem kell Root manager context. Inaktív állapotban a gyerekek unmountolódnak, ezért a szerkesztett értékeket kívül tárold. Az Escape/backdrop opciók csak ezeket a bezárási utakat szabályozzák, a mindig jelen lévő bezárógombot nem. A Zen fix, független z-indexet használ, és nem része a Modal/Drawer stacknek; a documenten lévő Escape-figyelője figyelmen kívül hagyja a már kezelt (`preventDefault()`) Escape-et, így egy Zenen belüli beépített popup bezárása nyitva hagyja a Zent, egy befoglaló modal vagy drawer pedig figyelmen kívül hagyja a Zen által kezelt Escape-et. Aktív állapotban zárolja a body overflow-ját és paddingjét, utána mindkettőt törli, ahelyett hogy visszaállítaná a korábbi inline értékeket. Nincs automatikus fókuszcsapda/fókusz-visszaállítás vagy akadálymentes dialógusnév; billentyűzetes felhasználóknak ezeket neked kell biztosítanod. Az elfogadott class prop nem kerül a renderelt markupra; használd a zenClass/backdropClass propokat.
