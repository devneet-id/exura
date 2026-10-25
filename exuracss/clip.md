# Clip icons

[← exuracss](README.md)

Clip turns emoji into icons with an attribute. It lives in a separate file so you only load it when you need it:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devneet-id/exuracss@1.x/dist/exura-clip.css">
```

```html
<i clip="rocket"></i> Launch
<button button="primary"><i clip="check"></i> Saved</button>
<i clip="wave animate"></i>
```

## Names

| Group | Names |
|---|---|
| status | `check`, `cross`, `warning`, `info`, `question`, `idea`, `stop` |
| reaction | `star`, `heart`, `broken-heart`, `fire`, `sparkles`, `zap`, `boom`, `clap`, `wave`, `eyes`, `trophy`, `medal`, `crown` |
| face | `smile`, `sad`, `angry`, `cool`, `cry`, `nerd`, `sleep`, `skull`, `ghost`, `robot` |
| tech | `laptop`, `keyboard`, `gear`, `hammer`, `bug`, `lock`, `unlock`, `link`, `folder`, `file`, `rocket` |
| arrow & media | `up`, `down`, `left`, `right`, `repeat`, `play`, `pause`, `fastforward`, `rewind` |
| food | `coffee`, `tea`, `cookie`, `cake`, `pizza`, `burger`, `rice`, `ramen`, `bento`, `sushi`, `meat`, `fries`, `icecream` |

## Modifiers

Add them after the name: `clip="rocket animate"`.

| Modifier | Result |
|---|---|
| `animate` | gentle up-and-down bounce |
| `effect:icon` | flat monochrome icon (inverted inside `[dark]`) |
| `effect:isolate` | small icon in a round grey badge |
| `effect:emboss` | embossed edge |
| `effect:ghost` | soft, slightly transparent |

## Add your own

Icons come from `exura-clip.json` → `EMOJI` (`"name": "emoji"`). Add a pair and run `php cast build-clip`. See [Customize](customize.md).
