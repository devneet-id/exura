# Colors & dark mode

[← exuracss](README.md)

## Color tokens

| Name | Base |
|---|---|
| `default` | `#8E93A6` |
| `primary` | `#4360CF` |
| `secondary` | `#26272A` |
| `dark` | `#171719` |
| `light` | `#f5f5f5` |
| `white` | `#FBFBFE` |
| `black` | `#090909` |

Each name becomes CSS variables you can use in your own CSS:

```css
var(--color-primary)      /* the base color */
var(--color-primary-1)    /* 10% opacity */
var(--color-primary-5)    /* 50% opacity */
var(--color-primary-10)   /* 100% opacity */
```

## Shades `1–10`

A shade is the base color with transparency: `1` = 10% … `10` = 100%.
Because it is transparent, a shade **blends with whatever is behind it** — `primary-2` is a light blue on a white page and a deep blue on a black page.

Shades appear wherever a color is accepted:

| Where | Base | Shade |
|---|---|---|
| `text` | `text="primary"` | `text="primary:5"` |
| `card` | `card="primary"` | `card="primary:2"` |
| `ring` border / outline | `ring="b:full b:primary"` | `ring="b:full b:primary-5"` |
| `ring` shadow | – | `ring="s:full s:primary-3"` |

> `text` and `card` write a shade with `:` (`primary:5`), `ring` with `-` (`primary-5`).

## Dark mode

```html
<body dark>
```

That is all. Dark mode only swaps the body text and background (`dark` on `white` → `light` on `black`).
Everything else keeps its markup, because the default greys (`default-1` … `default-3`) used by inputs, buttons, hover states, list and table lines and rings are shades — they turn into dark greys on a light page and light greys on a dark page by themselves.

```html
<body dark>
  <div card="primary:2" ring="b:full b:primary-5" size="p:2">
    Same markup, light or dark.
  </div>
</body>
```

Toggle it with one line:

```html
<button button="primary" onclick="document.body.toggleAttribute('dark')">Dark mode</button>
```

Tips:

- Prefer **shades** (`primary:2`, `default-3`) for backgrounds and lines — they work on both sides.
- Use **base colors** (`primary`, `dark`) for solid elements such as buttons and badges.
- There is no separate dark palette to maintain.

## Add or change colors

Colors live in `exura.json` → `COLOR`. Add a name, rebuild, and `text`, `button` and `ring` know it; `card` also needs the name in `CARD` (with its text color). See [Customize](customize.md).
