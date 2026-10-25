# Watch

[← exurajs](README.md)

`watch(selector, fn)` runs `fn` when an element **scrolls into view**. Use it for lazy work: loading images, starting counters or charts, fetching data only when a section is seen.

```html
<exura-lazy>
  <img id="photo" data-src="big.jpg" alt="">
  <section id="stats">…</section>
</exura-lazy>

<script>
  Exura.module(function lazy() {
    lazy.watch('#photo', () => {
      const img = Exura.dom('#photo');
      img.attr('src', img.attr('data-src'));
    });

    lazy.watch('#stats', (entry) => {
      entry.target.setAttribute('card', 'primary:1');
    });
  });

  lazy();
</script>
```

## How it works

- Built on `IntersectionObserver` — no scroll listeners, no polling.
- `fn` runs **once**, the first time the element becomes visible, then the element is no longer watched.
- `fn` receives the observer **entry**: `entry.target` is the element, `entry.intersectionRatio` how much of it is visible.

## Inside a module

`module.watch(selector, fn)` looks for the selector **inside the module's tag** (first match).

| Situation | Result |
|---|---|
| element found | watched |
| element not in the tag | `console.warn`, nothing else happens |
| module has no tag | `console.warn`, nothing else happens |

`render()` replaces the tag's content with new elements. Call `watch()` **after** `render()`, so it watches the elements that are on the page:

```js
Exura.module(class Home {
  static start() {
    this.dom.html('');
    this.router('/', () => {
      this.render();
      this.watch('#stats', () => this.countUp());   // after render
    });
  }
  static countUp() { /* … */ }
});
```

## Run every time

The global form takes an **element** and options. Set `once: false` to run each time it enters the view:

```js
Exura.watch(document.querySelector('#banner'), () => {
  views++;
}, { once: false });
```

| Option | Default | Meaning |
|---|---|---|
| `once` | `true` | stop watching after the first time |

Next: [Router](router.md)
