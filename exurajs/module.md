# Module

[← exurajs](README.md)

`Exura.module()` **registers** a module. It does not run it — you decide when the module starts.

When registered, exurajs:

1. takes the **name** of the function or class (`counter`) as the module ID,
2. looks for the tag `<exura-counter>` and keeps its content as the **template**,
3. attaches `store`, `state`, `effect`, `render`, `dom`, `watch` and `router` to the module,
4. makes the module **global**: `window.counter`.

The template is taken **at registration**, so you may empty the tag right after (`this.dom.html('')`) and bring it back later with `render()` — that is how pages are built with the [router](router.md).

## Function module

```html
<exura-hello>
  <span>{{greet}}, {{name}}</span>
</exura-hello>

<script>
  Exura.module(function hello() {
    const { store, state, render } = hello;
    store.set('greet', 'Hello');
    state.set('name', 'Exura');
    render();
  });

  hello();   // run it
</script>
```

Inside a function module, reach the tools through the function itself (`hello.state`) or destructure them.
Add your own methods the same way: `hello.rename = (n) => hello.state.set('name', n);`

## Class module

A class with **static methods** reads naturally — inside a static method, `this` is the module:

```html
<exura-cart>
  <b>{{count}}</b> items · <b>{{total}}</b>
  <button onclick="cart.add(18000)">Add coffee</button>
</exura-cart>

<script>
  Exura.module(class cart {
    static init() {
      this.items = [];
      this.state.set('count', 0);
      this.state.set('total', 0);
      this.effect(() => this.render(), ['count']);
    }

    static add(price) {
      this.items.push(price);
      this.state.set('total', this.items.reduce((a, b) => a + b, 0));
      this.state.set('count', this.items.length);
    }
  });

  cart.init();
</script>
```

- Use **static** methods. `this.render()` and friends do not exist on instances (`new cart()`, `constructor`).
- Static methods can be called straight from markup: `onclick="cart.add(18000)"`.
- Do not name your own methods `store`, `state`, `effect`, `render`, `dom`, `watch` or `router` — exurajs sets those when the module is registered.

## Without a tag

A module does not need a tag. Without `<exura-name>`, `dom` is `false` and `render()` only logs a warning — the module still has `store`, `state` and `effect`, which is handy for shared logic.

## Calling modules from HTML

Because modules are global, inline handlers just work, even after a re-render:

```html
<button onclick="counter.add(1)">+1</button>
<input oninput="greet.state.set('name', this.value)">
```

## Reading the registry

```js
Exura.load();            // Map of every module
Exura.load('cart');      // [module, store, state, effects, element]
ExuraEnvironment.configure.get('version');
```
