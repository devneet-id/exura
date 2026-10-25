# Ring — border, outline, shadow

[← exuracss](README.md)

`ring` draws lines and shadows around an element. Words starting with `b:` are **border**, `o:` **outline**, `s:` **shadow**.

```html
<div ring="b:full b:primary-5" size="p:2">bordered</div>
<div ring="b:bottom b:dashed">underlined section</div>
<div ring="s:full s:lg">soft shadow</div>
```

## Border `b:`

| Group | Values |
|---|---|
| side | `full`, `top`, `bottom`, `start`, `end` (one side removes the others) |
| style | `solid`, `dashed`, `dotted`, `double`, `groove`, `inset`, `outset`, `ridge`, `none` |
| width | `1` (default thin), `2`, `3` (3px), `4` (4px) |
| color | `primary`, `default`… or a shade `primary-1` … `primary-10` |

Without a color the border uses `default-2`, a soft grey that follows dark mode.

```html
<div ring="b:start b:4 b:primary" size="ps:2">callout</div>
```

## Outline `o:`

Same values as border — `o:full`, `o:dashed`, `o:2`, `o:primary-5` — drawn as an outline (it does not take space).
Use `o:full`; the outline is always drawn around the whole element.

## Shadow `s:`

| Value | Result |
|---|---|
| `s:full`, `s:top`, `s:bottom`, `s:start`, `s:end` | soft shadow on that side |
| `+ s:lg` | larger blur |
| `+ s:primary-3` (any color shade) | colored shadow |

```html
<div ring="s:full s:lg s:primary-3">glowing card</div>
```

> A plain side shadow (`s:full`, `s:bottom`…) is drawn only when it is the **only word** in `ring`. Together with a border, add a size or color: `ring="b:full s:full s:lg"` or `ring="b:full s:full s:primary-3"`.
