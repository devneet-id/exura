<p align="center">
  <a href="https://github.com/devneet-id/exuracss"><img src="https://img.shields.io/github/v/tag/devneet-id/exuracss?label=exuracss" alt="exuracss version"></a>
  <a href="https://github.com/devneet-id/exurajs"><img src="https://img.shields.io/github/v/tag/devneet-id/exurajs?label=exurajs" alt="exurajs version"></a>
  <a href="https://github.com/devneet-id/exuraphp"><img src="https://img.shields.io/github/v/tag/devneet-id/exuraphp?label=exuraphp" alt="exuraphp version"></a>
</p>

<p align="center">
  <a href="https://github.com/devneet-id/exura" target="_blank">
    <img src="https://raw.githubusercontent.com/devneet-id/.github/refs/heads/main/design/mreazenith/exura/v1-card-2.svg" width="300" alt="Exura">
  </a>
</p>

**Exura** is a series of three super-light frameworks — one for **CSS**, one for **JavaScript**, one for **PHP**.
Each mirrors what a modern framework in its field can do, packed into **a single file** with no runtime dependencies and no build step for the user.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devneet-id/exuracss@1.x/dist/exura.min.css">
<script src="https://cdn.jsdelivr.net/gh/devneet-id/exurajs@1.x/dist/exura.min.js"></script>
```
```php
require __DIR__ . '/exura.php';
```

This repository is the **home of the series**: the introduction, how the packages fit together, and the documentation of each package.

## 🧩 The Series

| Package | Focus | Mirrors | Core idea | Size (min · gzip) | Repository |
|---|---|---|---|---|---|
| **exuracss** | semantic styling | a utility / component CSS framework | style with **attributes**: `button="primary"`, `flex="wrap"`, `size="w:1/2"` | ~215 KB · **~21 KB** | [devneet-id/exuracss](https://github.com/devneet-id/exuracss) |
| **exurajs** | modern reactive JavaScript | a reactive UI framework | `Exura.module()` → `state`, `effect`, `render` on an `<exura-name>` tag | ~5.5 KB · **~2 KB** | [devneet-id/exurajs](https://github.com/devneet-id/exurajs) |
| **exuraphp** | modern HTTP API endpoints | an *Express-like* API micro-framework | `Exura::module($method, $route, $fn)` → JSON | ~6 KB · **~2 KB** | [devneet-id/exuraphp](https://github.com/devneet-id/exuraphp) |

Each package stands on its own — use one, two, or all three.

## 💡 Principles

- **Super light, still a framework.** Small is the point, but never at the cost of the abilities a developer expects from a framework.
- **One focus per package.** exuracss is about styling, exurajs about reactivity, exuraphp about HTTP. A feature belongs to the package whose focus it serves — nothing is forced across the series.
- **Readable by default.** Markup and code read like sentences: `flex="wrap j:between a:middle"`, `effect(() => render(), ['count'])`, `Exura::module('GET', 'user/*', …)`.
- **One file, no build for the user.** Drop in `dist/`, done.
- **Assist, not intrude.** Exura stays out of the developer's way.

### Dark mode (exuracss)
exuracss has no separate dark palette. Every color has ten transparent shades (`primary-1` … `primary-10`) that blend with whatever is behind them, so the same markup works on light and dark. Dark mode is just:

```html
<body dark>
```

## 🔍 The series together

A page styled by **exuracss**, made reactive by **exurajs**, talking to an API built with **exuraphp** — three single files.

**`api.php`**
```php
<?php
require __DIR__ . '/exura.php';

Exura::module('GET', 'notes', function() {
  return ['data' => [
    ['title' => 'Try Exura', 'done' => true],
    ['title' => 'Ship it',   'done' => false],
  ]];
});

Exura::fallback();   // nothing matched → 404 as JSON
```

**`index.html`**
```html
<body>
  <div container size="py:3">
    <exura-notes>
      <div card="primary:2" ring="b:full b:primary-5" size="p:2">
        <span text="h4 bold primary">{{left}} left of {{total}}</span>
        <ul list="ring:y" size="m:0 mt:1">{{{items}}}</ul>
      </div>
    </exura-notes>
    <button button="primary" size="mt:1" onclick="notes.load()">Reload</button>
  </div>

  <script>
    Exura.module(class notes {
      static async load() {
        const res = await fetch('api.php?/notes').then(r => r.json());
        const list = res.data;
        this.state.set('total', list.length);
        this.state.set('left', list.filter(n => !n.done).length);
        this.state.set('items', list.map(n => `<li>${n.done ? '✅' : '⬜'} ${Exura.escape(n.title)}</li>`).join(''));
      }
    });
    notes.effect(() => notes.render(), ['items']);
    notes.load();
  </script>
</body>
```

`{{key}}` is escaped, `{{{key}}}` inserts HTML; a module can be a `function` or a `class` with static methods (`this.state`, `this.render()`).

## 🗂️ Repositories

| Repository | Contains |
|---|---|
| [`exura`](https://github.com/devneet-id/exura) | this introduction and the documentation: `exuracss/`, `exurajs/`, `exuraphp/` |
| [`exuracss`](https://github.com/devneet-id/exuracss) | `src/`, tokens (`exura.json`), `dist/exura.css`, `exura.min.css`, `exura-clip.css` |
| [`exurajs`](https://github.com/devneet-id/exurajs) | `src/`, `dist/exura.js`, `exura.min.js` |
| [`exuraphp`](https://github.com/devneet-id/exuraphp) | `src/`, `dist/exura.php`, `exura.min.php` |

All packages live on the **`1.x`** branch.

## 🔢 Versioning

- **Semantic Versioning per package** — each package has its own `MAJOR.MINOR.PATCH`; they do not have to match.
- `fix` → patch · compatible `feat` → minor · anything that changes how you write markup or code → major (with a new `2.x` branch).
- The version lives in one place — the package's runite `cast` — and is written into `dist/` on build.

## 🛠️ Shaped with Rune

Every package is shaped with **[Rune](https://github.com/devneet-id/rune)** — a lore-driven, modular concept beneath PHP that responds to development rather than dictating it.
Each package has a runite, `cast`, that turns `src/` into `dist/`:

```shell
composer install
php cast                       # all casts with notes
php cast build --min=true      # build dist/ (+ .min)
php cast version --up          # bump the version
```

## 📚 Documentation

| Package | Start here | Pages |
|---|---|---|
| **exuracss** | [exuracss/](exuracss/README.md) | [colors & dark mode](exuracss/color.md) · [layout](exuracss/layout.md) · [text](exuracss/text.md) · [ring](exuracss/ring.md) · [components](exuracss/components.md) · [clip icons](exuracss/clip.md) · [customize](exuracss/customize.md) |
| **exurajs** | [exurajs/](exurajs/README.md) | [module](exurajs/module.md) · [state, store & effect](exurajs/state.md) · [render & templates](exurajs/render.md) · [DOM helper](exurajs/dom.md) · [watch](exurajs/watch.md) · [router](exurajs/router.md) · [multi-page site](exurajs/pages.md) · [API](exurajs/api.md) |
| **exuraphp** | [exuraphp/](exuraphp/README.md) | [routing](exuraphp/routing.md) · [request](exuraphp/request.md) · [response](exuraphp/response.md) · [API](exuraphp/api.md) |

Later the same pages will be published with GitHub Pages — styled and made interactive with Exura itself.

## 🤝 Contributing

1. Fork the package repository and work on `1.x`.
2. Change `src/`, then build with `php cast build --min=true`.
3. One commit, one message: `type(scope): summary` — e.g. `fix(route): match full route with wildcard`.
4. Open a pull request to `devneet-id/<package>` on `1.x`.

## 🎯 Goal

The Exura series will:

- Let **CSS, JavaScript and PHP speak the same language** — readable, attribute-first, module-first.
- Grow **only where its focus grows**: on-demand CSS, list rendering for JS, route parameters for PHP.
- Become the foundation of **websites built with Exura** — starting with its own documentation.
- Stay **light**, and never become a burden for the developer.

Exura is here to assist — not to intrude.

---

Created by **Anwar Achilles** · part of **[DEVNEET](https://github.com/devneet-id)**
