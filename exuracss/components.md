# Components

[← exuracss](README.md)

## button

Every `<button>` is styled; any element becomes a button with the `button` attribute.

```html
<button>Default</button>
<button button="primary">Primary</button>
<a href="#" button="secondary">Link as button</a>
<a href="#" button>Plain link button</a>
<button button="none">Bare</button>
```

| Value | Result |
|---|---|
| *(none)* on `<button>` | soft grey (`default-3`) that follows dark mode |
| `primary`, `secondary`, `dark`, `default`, `black` | solid color, white text, colored shadow |
| `light`, `white` | solid light color, black text |
| `none` | no padding, no background |
| `<a button>` (empty) | link color, transparent, no underline |

Hover and focus darken the button and lift its shadow.

## card

A padded block with a background and a matching text color.

```html
<div card="primary">solid</div>
<div card="primary:2">tinted (shade 2)</div>
<div card="dark" size="p:3">dark panel</div>
```

| Value | Background | Text |
|---|---|---|
| `default`, `primary`, `secondary`, `dark`, `black` | the color | light |
| `light`, `white` | the color | dark |
| `name:1` … `name:10` | the shade | same as the base |

`card` takes **one value** — put spacing and borders in `size` and `ring`:

```html
<div card="primary:2" ring="b:full b:primary-5" size="p:2 mb:1">…</div>
```

## list

```html
<ul list="ring:y" ring="b:full">
  <li>One</li>
  <li>Two</li>
</ul>

<ul list="dir:x ring:x">
  <li>Home</li><li>Docs</li><li>About</li>
</ul>
```

| Value | Result |
|---|---|
| *(no value)* | no bullets, no indent, items padded and stacked |
| `dir:y` / `dir:x` | stacked / in a row |
| `wrap` | items wrap to the next line |
| `ring:y` / `ring:x` | divider line between items |

## table

Every `<table>` is full width with padded cells and a row hover.

```html
<div container="overflow">
  <table table="ring:y">
    <thead><tr><th>Name</th><th>Role</th></tr></thead>
    <tbody><tr><td>Anwar</td><td>Maintainer</td></tr></tbody>
  </table>
</div>
```

| Value | Lines |
|---|---|
| `ring` | all cells |
| `ring:x` | between columns |
| `ring:y` | between rows |

Wrap wide tables in `container="overflow"` so they scroll on small screens.

## Forms

`input`, `select` and `textarea` are styled without attributes: full width, soft `default-1` background, darker on hover and focus, so they follow dark mode. Checkboxes and radios keep their natural width; `range` gets a primary track and a round thumb.

```html
<label>Name</label>
<input type="text" placeholder="Your name">
<select><option>One</option></select>
<textarea rows="3"></textarea>
<button button="primary">Send</button>
```

`fieldset` and `legend` get a thin border and a muted label.
