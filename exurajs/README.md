# exurajs — Documentation

**exurajs** is the reactive JavaScript package of the Exura series: modules, state, effects and templates in one small file.

```html
<exura-counter>
  <h2>Count: {{count}}</h2>
  <button onclick="counter.add(1)">+1</button>
</exura-counter>

<script>
  Exura.module(class counter {
    static init() {
      this.state.set('count', 0);
      this.effect(() => this.render(), ['count']);
    }
    static add(n) {
      this.state.set('count', this.state.get('count') + n);
    }
  });
  counter.init();
</script>
```

## Pages

| Page | Covers |
|---|---|
| [Module](module.md) | `Exura.module()`, function and class modules, the `<exura-name>` tag, global access |
| [State, store & effect](state.md) | reactive `state`, static `store`, `effect(fn, deps)` |
| [Render & templates](render.md) | `{{key}}`, `{{{key}}}`, attributes, lists |
| [DOM helper](dom.md) | `Exura.dom()` and its chainable methods |
| [Watch](watch.md) | run code when an element scrolls into view |
| [Router](router.md) | pages from the path: patterns, params, 404 |
| [Multi-page site](pages.md) | one module per page, shared modules, an entry point |
| [API reference](api.md) | every method in one place |

## Install

```html
<script src="https://cdn.jsdelivr.net/gh/devneet-id/exurajs@1.x/dist/exura.min.js"></script>
```

Or copy `dist/exura.js` / `dist/exura.min.js` into your project. No build step, no dependencies.

Place your module scripts **after** the `<exura-name>` tags they use (for example at the end of `<body>`), so the tags exist when the module is registered.

## The idea in four lines

1. **A module** is a function or a class you register with `Exura.module()`. Its name is its tag: `counter` ↔ `<exura-counter>`.
2. **The tag's content is the template.** `{{count}}` is filled from the module's store and state.
3. **`state.set()`** runs every **effect** that depends on the changed key.
4. **An effect calls `render()`**, and the tag shows the new values.

exurajs works well with [exuracss](../exuracss/README.md) — placeholders also work inside attributes, so `card="{{tone}}:2"` just works.
