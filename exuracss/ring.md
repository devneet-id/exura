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

`o:full` draws an outline around the whole element (it does not take space). Style, width and color work as for the border: `o:dashed`, `o:2`, `o:primary-5`.
An outline has no sides — there is no `o:top` / `o:start`…; use a border for one side.

## Shadow `s:`

| Value | Result |
|---|---|
| `s:full`, `s:top`, `s:bottom`, `s:start`, `s:end` | soft shadow on that side |
| `+ s:sm` / `+ s:lg` | smaller / larger blur |
| `+ s:primary-3` (any color shade) | colored shadow |

```html
<div ring="s:full s:lg s:primary-3">glowing card</div>
```

Shadow, border and outline can be combined in one `ring`: `ring="b:full s:full"`.

## Responsive

Borders can change per breakpoint — sides, style and width:

```html
<div ring="b:bottom b:primary-3" md:ring="b:full">underline on phones, full border from 768px</div>
<div md:ring="b:none">…</div>
```

| Responsive value | Result |
|---|---|
| `b:full`, `b:top`, `b:bottom`, `b:start`, `b:end` | which sides are drawn |
| `b:dashed`, `b:dotted`, `b:double` | style |
| `b:2`, `b:3`, `b:4` | width |
| `b:none` | no border |

The color comes from the plain `ring` (`b:primary-3`); colors and shadows are not responsive.
