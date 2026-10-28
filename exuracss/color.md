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

## Dark mode — reversal

```html
<body dark>
```

Dark mode **reverses** the neutral pairs: `light ↔ dark` and `white ↔ black`, shades included. `primary`, `secondary`, `default` and any other color stay the same.

| Written | Light mode | Dark mode |
|---|---|---|
| page | `dark` text on `white` | `light` text on `black` |
| `text="dark"` | dark | light |
| `card="white"` | white panel, dark text | black panel, light text |
| `button="dark"` | dark button, white text | light button, black text |
| `ring="b:full b:dark"` | dark line | light line |
| `button="primary"` | blue, white text | unchanged |

The default greys (`default-1` … `default-3`) used by inputs, buttons, hover states, list and table lines and rings are transparent shades, so they adapt to whatever is behind them.

### On any element

`dark` works on any element, not only `<body>` — a dark footer on a light page:

```html
<footer dark size="p:3">
  <span text="dark">reads as light here</span>
</footer>
```

`light` brings the normal pairs back inside a dark area — for a part that must stay light, or content that should not flip:

```html
<body dark>
  <div light card="white" size="p:2">always a white card with dark text</div>
</body>
```

Toggle the whole page with one line:

```html
<button button="primary" onclick="document.body.toggleAttribute('dark')">Dark mode</button>
```

Tips:

- Use `dark` / `light` / `white` / `black` when a part should **flip** with the mode (page surfaces, neutral text, separators).
- Use any other color (`primary`, `secondary`, your own) when it should **stay** the same.
- Prefer **shades** (`primary:2`, `default-3`) for tinted backgrounds and lines — they work on both sides.
- There is no separate dark palette to maintain.

## Add or change colors

Colors live in `exura.json` → `COLOR`. Add a name, rebuild, and `text`, `button` and `ring` know it; `card` also needs the name in `CARD` (with its text color). See [Customize](customize.md).
