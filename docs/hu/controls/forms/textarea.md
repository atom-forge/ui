# Textarea

Többsoros szöveges beviteli mező, az `Input`-tal egységes stílusban. Tud automatikusan növekedni, van karakter-/szószámlálója, módosításkövetése, okos Tab-behúzása, és programozott API-ja a szöveg kezeléséhez `bind:this`-en keresztül.

## Importálás

```ts
import { Textarea } from '@atom-forge/ui';
import type { TextareaAPI } from '@atom-forge/ui';
```

---

## Propok

| Prop | Csoport | Típus | Alapérték | Leírás |
|------|-------|------|---------|-------------|
| `value` | Alap | `string` | `''` | Bindolható szöveges tartalom. |
| `dirty` | Alap | `boolean` | `false` | Bindolható. `true`, ha az érték eltér a kezdetitől. |
| `placeholder` | Alap | `string` | — | Placeholder szöveg. |
| `disabled` | Alap | `boolean` | `false` | Letiltja a textarea-t. |
| `invalid` | Alap | `boolean` | `false` | Destructive piros keretet mutat. |
| `rows` | Méretezés | `number` | `3` | A látható sorok minimális száma. |
| `maxRows` | Méretezés | `number` | — | Az automatikus növekedés legnagyobb sorszáma. |
| `resizable` | Méretezés | `boolean` | `false` | Engedélyezi a natív átméretező fogantyút. |
| `compact` | Méretezés | `boolean` | — | Kompakt méret. Kizárja a `small`-t. |
| `small` | Méretezés | `boolean` | — | Kis méret. Kizárja a `compact`-ot. |
| `maxLength` | Funkció | `number` | — | A megengedett karakterek maximális száma. |
| `showCounter` | Funkció | `boolean` | `false` | Karakterszámlálót mutat a jobb alsó sarokban. |
| `monospace` | Funkció | `boolean` | `false` | `font-mono`-t használ. |
| `handleTab` | Funkció | `boolean` | `false` | Okos Tab / Shift+Tab behúzáskezelés. |
| `tabSize` | Funkció | `number` | `2` | A behúzás mérete szóközökben. `0` = szó szerinti tabulátorkarakter. |
| `adornment` | Snippetek | `Snippet` | — | A jobb alsó sarok tartalma. Felülírja a `showCounter`-t. |
| `counter` | Snippetek | `Snippet<[{count, max, words, letters}]>` | — | Egyedi számláló snippet. |

---

## TextareaAPI (bind:this)

```ts
interface TextareaAPI {
  // Wraps the current selection.
  // wrap: a single string used as both prefix and suffix, or [prefix, suffix] for asymmetric markers.
  // unwrapWhenWrapped: if true and the selection (or surrounding characters) already have the markers, removes them instead.
  wrapSelection(wrap: string | [string, string], unwrapWhenWrapped?: boolean): void;

  // Inserts text at the current cursor position.
  insertAtCursor(text: string): void;

  // Selects all text.
  selectAll(): void;

  // Focuses the textarea, optionally placing the cursor at an edge.
  focus(at?: 'beginning' | 'end'): void;
}
```

---

## Használat

### Alap, automatikus növekedéssel és számlálóval

```sveltehtml
<Field label="Biography">
  <Textarea bind:value={bio} rows={3} maxRows={8} showCounter maxLength={200}/>
</Field>
```

### Kódszerkesztő

```sveltehtml
<Textarea bind:value={code} bind:dirty monospace handleTab tabSize={2} rows={5}/>
```

### Eszköztár a bind:this API-val

```sveltehtml
<script lang="ts">
  let text = $state('');
  let api: TextareaAPI;
</script>

{@render toolbar()}
<Textarea bind:value={text} bind:this={api} rows={6}/>

{#snippet toolbar()}
  <ButtonBar>
    <!-- symmetric: **text** — toggle on/off -->
    <Button compact ghost icon={IconBold}   onclick={() => api.wrapSelection('**', true)}/>
    <Button compact ghost icon={IconItalic} onclick={() => api.wrapSelection('*', true)}/>
    <Button compact ghost icon={IconCode}   onclick={() => api.wrapSelection('`', true)}/>
    <!-- asymmetric: <mark>text</mark> -->
    <Button compact ghost label="mark" onclick={() => api.wrapSelection(['<mark>', '</mark>'], true)}/>
  </ButtonBar>
{/snippet}
```

### Egyedi számláló snippet

```sveltehtml
<Textarea bind:value showCounter>
  {#snippet counter({ count, max, words })}
    <span class="text-xs text-muted-contrast">{words} words · {count}/{max}</span>
  {/snippet}
</Textarea>
```


## Mikor használd

Többsoros sima szöveghez, opcionális számlálóval, automatikus növekedéssel és kijelölés-szerkesztéssel.

## Alternatívák

Egysoros szöveghez használd az [Input](input.md)-ot. Ez a vezérlő nem szintaxist értelmező kódszerkesztő, és nem is rich-text szerkesztő.

## Beállítás és működés

A `value`-t bindold; a `dirty`-t egy effect számolja újra a kezdeti értékhez képest, és nincs API az alapérték visszaállítására. Az automatikus növekedés a DOM/érték frissítése után fut; a `maxRows` a magasságot korlátozza, nem a szöveg hosszát. A `maxLength` a natív textarea korlátot használja; a programozott szerkesztések és a külső értékadások túlléphetik. A `handleTab` a Tabot behúzásra használja, ami megváltoztatja a szokásos billentyűzetes fókusznavigációt. Nincs toolbar prop, sem általános natív attribútum- vagy eseménytovábbítás; az eszköztárat a komponensen kívül állítsd össze. A kijelölés-API csak a textarea mountolása után használható.
