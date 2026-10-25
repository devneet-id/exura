# Customize

[← exuracss](README.md)

There are two ways to make exuracss your own:

| | 1. Override variables | 2. Rebuild from tokens |
|---|---|---|
| How | a few lines of CSS after `exura.css` | edit `exura.json`, run `php cast build` |
| Needs | nothing | PHP 8.1+, Composer |
| Best for | changing colors, fonts, sizes quickly | new color names, breakpoints, scales; the cleanest output |

exuracss is small, so **overriding variables is usually the fastest way**. Rebuild when you want new names or a clean file without overrides.

## 1. Override variables

Every token is a CSS variable on `:root`. Load your overrides **after** exuracss:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devneet-id/exuracss@1.x/dist/exura.min.css">
<style>
  :root {
    --color-primary: #2EAA5C;
  }
</style>
```

Everything that uses the **base** color follows at once: `button="primary"`, `text="primary"`, `card="primary"`, `ring="b:primary"`, links.

### Shades

The shades `--color-primary-1` … `-10` are stored as ready-made values, so they **keep the old color** when only the base changes. Override the shades you use as well — the shade number is the opacity:

```css
:root {
  --color-primary:    #2EAA5C;
  --color-primary-1:  rgba(46, 170, 92, 0.1);
  --color-primary-2:  rgba(46, 170, 92, 0.2);
  --color-primary-3:  rgba(46, 170, 92, 0.3);
  --color-primary-5:  rgba(46, 170, 92, 0.5);
  --color-primary-8:  rgba(46, 170, 92, 0.8);
}
```

(`button="primary"` uses `-3`, `-6` and `-8` for its shadow and hover.)

### Other variables

```css
:root {
  --font-used: "Inter", system-ui, sans-serif;
  --font-code: "JetBrains Mono", monospace;
  --text-h1: 3rem;
  --size-pm-2: 1.25rem;   /* p:2, m:2, px:2 … */
}
```

| Variable | Used by |
|---|---|
| `--color-<name>`, `--color-<name>-1` … `-10` | `text`, `card`, `button`, `ring`, forms, dark mode greys (`default-*`) |
| `--text-body`, `--text-h1` … `--text-h6`, `--text-small` | headings, `text="h1"`…, `small` |
| `--size-pm-<step>` (`0`, `0-5`, `1`, `1-5`, `2` … `10`) | `p:`, `m:` and their sides |
| `--size-wh-<fraction>` (`1-2`, `1-3`, `3-4` …) | `w:`, `h:` |
| `--font-used`, `--font-code` | body text, `code` / `samp` |

Breakpoints and display sizes are written into media queries, so they can only be changed with a rebuild.

## 2. Rebuild from tokens

exuracss is generated from `exura.json` (and `exura-clip.json` for icons). In the `exuracss` repository:

| Key | Controls | Example |
|---|---|---|
| `COLOR` | color names and base values (shades `1–10` are derived) | `"success": "#2EAA5C"` |
| `CARD` | which colors exist as `card`, and the text color on top | `"success": "light"` |
| `TEXT` | body, heading and `small` sizes | `"h1": "2.75rem"` |
| `TEXT_DISPLAY` | `display:1–4` sizes `[small screen, large screen]` | `"d1": ["2.75rem", "4.5rem"]` |
| `SCREEN` | breakpoints for the responsive prefixes | `"md": "768px"` |
| `SIZE_WH` | width / height fractions `[value, variable, css]` | `["1/3", "1-3", "33.333333%"]` |
| `SIZE_PM` | padding / margin scale `[value, variable, css]` | `["2", "2", "1rem"]` |
| `SIZE_PM_PREFIX` | side letters for padding / margin | `"x": ["left", "right"]` |

Example — add a `success` color:

```json
"COLOR": { "...": "...", "success": "#2EAA5C" },
"CARD":  { "...": "...", "success": "light" }
```

Then build:

```shell
composer install
php cast build --min=true    # dist/exura.css + dist/exura.min.css
php cast build-clip          # dist/exura-clip.css (icons)
```

Now `button="success"`, `card="success:2"`, `text="success"` and `ring="b:full b:success-5"` exist, with all shades computed for you.

exuracss is shaped with [Rune](https://github.com/devneet-id/rune); `php cast` lists every cast with a short note.
