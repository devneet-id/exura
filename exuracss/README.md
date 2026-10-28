# exuracss — Documentation

**exuracss** is the styling package of the Exura series: you style with **attributes**, not class names.

```html
<div container>
  <div card="primary:2" ring="b:full b:primary-5" size="p:2">
    <span text="h4 bold primary">Hello, Exura</span>
    <button button="primary">Save</button>
  </div>
</div>
```

## Pages

| Page | Covers |
|---|---|
| [Colors & dark mode](color.md) | color tokens, shades `1–10`, `text`/`card` colors, `<body dark>` |
| [Layout](layout.md) | `container`, `flex`, `size` (width, height, padding, margin), `misc` |
| [Text](text.md) | headings, display sizes, weight, alignment, colors |
| [Ring](ring.md) | border, outline, shadow |
| [Components](components.md) | `button`, `card`, `list`, `table`, forms, styled HTML elements |
| [Clip icons](clip.md) | emoji icons with `exura-clip.css` |
| [Customize](customize.md) | `exura.json` tokens and rebuilding with `cast` |

## Install

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devneet-id/exuracss@1.x/dist/exura.min.css">
<!-- optional: emoji icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devneet-id/exuracss@1.x/dist/exura-clip.css">
```

Or copy `dist/exura.css` / `dist/exura.min.css` into your project.

## How attributes work

Every concern has its **own attribute**. The value is a list of words separated by spaces:

```html
<div flex="wrap j:between a:middle">…</div>
<div size="w:1/2 p:2 mb:1">…</div>
```

- **Order does not matter** — `size="p:2 w:1/2"` equals `size="w:1/2 p:2"`.
- **`prefix:value`** — most values are short pairs: `w:` width, `j:` justify, `a:` align, `b:` border…
- **An attribute without a value** is a switch: `<div container>`, `<body dark>`.

Most attributes also have a size word: `button="primary sm"`, `card="primary:2 lg"`, `list="sm"`, `table="lg"`.

## Responsive

Add a breakpoint in front of the attribute name. It applies **from that width up**:

```html
<div size="w:full" md:size="w:1/2" lg:size="w:1/3">…</div>
<div misc="d:none" md:misc="d:block">only from 768px</div>
```

| Prefix | From |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `xxl:` | 1536px |

Responsive prefixes work on **`size`**, **`flex`**, **`misc`**, **`container`**, **`button`**, **`card`** (size), **`list`**, **`ring`** (borders) and **`table`** (size).

The design is **mobile-first**: the plain attribute is the phone layout, each prefix takes over from its width **until a larger prefix takes over** — with `md:` and `lg:` set, `md:` shows only from 768 to 1023px.

Utilities always win over a component's own defaults: `misc="d:none"` hides a `text="h3"`, `md:flex="d:row"` turns a `list` into a row.

## Files in `dist/`

| File | Contains |
|---|---|
| `exura.css` | everything, readable |
| `exura.min.css` | everything, minified |
| `exura-clip.css` | emoji icons only (optional) |
