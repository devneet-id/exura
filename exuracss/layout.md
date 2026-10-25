# Layout

[← exuracss](README.md)

`container` centers the page, `flex` arranges children, `size` sets width, height and spacing, `misc` handles display, position, layering and white space.

## container

```html
<main container>…</main>
```

| Value | Result |
|---|---|
| *(no value)* | centered, side padding `1rem`, max width follows the breakpoint (640 / 768 / 1024 / 1280 / 1536px) |
| `fluid` | full width, no side padding |
| `overflow` | scrolls when the content is wider (good for tables and `<pre>`) |

Responsive: `md:container`, `lg:container="fluid"`…

## flex

```html
<div flex="wrap j:between a:middle g:2">
  <div>left</div>
  <div flex="1">grows</div>
  <div>right</div>
</div>
```

`flex` on a parent makes it a flex container. A few values describe an **item** instead and do **not** turn the element into a container: `1`, `auto`, `initial`, `none` and `s:*`.

| Group | Values | CSS |
|---|---|---|
| container | *(no value)*, `inline` | `display: flex` / `inline-flex` |
| direction `d:` | `row`, `row-reverse`, `column`, `column-reverse` | `flex-direction` |
| wrap | `wrap`, `nowrap`, `wrap-reverse` | `flex-wrap` |
| justify `j:` | `start`, `center`, `end`, `between`, `around`, `evenly` | `justify-content` |
| align items `a:` | `start`, `middle`, `end`, `stretch`, `baseline` | `align-items` |
| align content `c:` | `start`, `center`, `end`, `between`, `around`, `evenly` | `align-content` |
| gap `g:` | `0`, `1` (0.25rem), `2` (0.5rem), `3` (0.75rem), `4` (1rem), `5` (1.25rem), `6` (1.5rem) | `gap` |
| gap per axis | `gx:1`, `gy:1` | `column-gap` / `row-gap` |
| **item** grow | `1`, `auto`, `initial`, `none` | `flex` |
| **item** self `s:` | `auto`, `start`, `center`, `end`, `stretch`, `baseline` | `align-self` |

Responsive: `md:flex="d:row"`, `sm:flex="wrap"`…

## size

### Width `w:` and height `h:`

```html
<div flex>
  <div size="w:1/3">one third</div>
  <div size="w:expand">the rest</div>
</div>
```

| Values | Result |
|---|---|
| `1/2` · `1/3 2/3` · `1/4 2/4 3/4` · `1/5 … 4/5` · `1/6 5/6` · `1/8 … 7/8` · `1/10 … 9/10` · `1/12 … 11/12` | percentage of the parent |
| `full` | 100% |
| `auto`, `min`, `max`, `fit` | `auto`, `min-content`, `max-content`, `fit-content` |
| `expand` | fills the remaining space — use it **inside a `flex` parent** (`w:expand` in a row, `h:expand` in a `flex="d:column"`) |

Fractions and `expand` show their effect best inside a `flex` parent; a percentage height (`h:1/2`) needs a parent with a height.

### Padding `p` and margin `m`

```html
<div size="p:2 mb:1 mx:auto">…</div>
```

| Scale | `0` | `0.5` | `1` | `1.5` | `2` | `2.5` | `3` | `4` | `5` | `6` | `7` | `8` | `9` | `10` | `auto` |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| rem | 0 | .25 | .5 | .75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.25 | 2.5 | 2.75 | 3 | 3.25 | auto |

| Side | Padding | Margin |
|---|---|---|
| all | `p:2` | `m:2` |
| top / bottom | `pt:2` / `pb:2` | `mt:2` / `mb:2` |
| start (left) / end (right) | `ps:2` / `pe:2` | `ms:2` / `me:2` |
| left + right | `px:2` | `mx:2` |
| top + bottom | `py:2` | `my:2` |

Responsive: `md:size="w:1/2 p:3"`…

## misc

| Group | Values |
|---|---|
| display `d:` | `none`, `block`, `inline-block` |
| position `p:` | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| layer `z:` | `0` (0), `1` (100), `2` (500), `3` (1000), `4` (1500), `5` (2000) |
| white space `ws:` | `wrap`, `nowrap`, `pre`, `pre-line`, `pre-wrap` |

```html
<header card="dark" misc="p:sticky z:3" style="top:0">…</header>
<nav misc="d:none" md:misc="d:block">…</nav>
```

## Example: responsive columns

```html
<div container>
  <div flex="wrap">
    <div size="w:full p:1" md:size="w:1/2" lg:size="w:1/4">…</div>
    <div size="w:full p:1" md:size="w:1/2" lg:size="w:1/4">…</div>
    <div size="w:full p:1" md:size="w:1/2" lg:size="w:1/4">…</div>
    <div size="w:full p:1" md:size="w:1/2" lg:size="w:1/4">…</div>
  </div>
</div>
```
