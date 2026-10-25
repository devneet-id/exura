# Text

[← exuracss](README.md)

```html
<span text="h3 bold primary">Title</span>
<p text="default center">Muted, centered paragraph.</p>
<span text="display:1 bold">Hero</span>
```

| Group | Values |
|---|---|
| size | `h1` (2.75rem), `h2` (2.25rem), `h3` (1.75rem), `h4` (1.5rem), `h5` (1.25rem), `h6` (1rem) — also makes the element `display: block` |
| display | `display:1` (4.5rem), `display:2` (4rem), `display:3` (3.5rem), `display:4` (3rem) — smaller below 768px |
| weight | `lighter`, `normal`, `bold` |
| style | `italic`, `underline`, `uppercase`, `lowercase` |
| align | `start`, `center`, `end` |
| overflow | `nowrap`, `ellipsis` (one line, cut with `…`) |
| color | any color name: `primary`, `default`, `dark`… |
| color shade | `primary:1` … `primary:10` |

`text="default"` is the usual way to write muted, secondary text — it reads well on light and dark.

## Styled elements

These HTML elements are styled without any attribute:

| Element | Look |
|---|---|
| `h1`–`h6`, `p` | sizes from the scale, no top margin |
| `a` | primary color, underline on hover |
| `small` | 0.75rem |
| `code`, `samp`, `kbd` | monospace; `kbd` looks like a key |
| `blockquote`, `q`, `cite` | italic, muted, quote bar / quote marks / em dash |
| `abbr[title]` | shows the title after the text |
| `mark` | soft yellow highlight |
| `s`, `del`, `u`, `ins` | colored, thick line |
| `hr` | thin line that follows dark mode |
| `ul`, `ol`, `dd`, `fieldset`, `address` | tidy spacing |
