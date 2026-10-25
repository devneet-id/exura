# Multi-page site

[← exurajs](README.md)

A whole site in one HTML file: **one module per page**, a few shared modules, and one entry point that starts them in order.

## The HTML

Every page has its own tag. Shared parts (navbar, loader) have theirs too.

```html
<body>
  <exura-loader>…splash…</exura-loader>

  <exura-navbar>
    <ul list="dir:x">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/career">Career</a></li>
    </ul>
  </exura-navbar>

  <exura-home>…home page…</exura-home>
  <exura-about>…about page…</exura-about>
  <exura-career>…career page…</exura-career>

  <script src="exura.min.js"></script>
  <script src="app.js"></script>
</body>
```

All page templates are in the file, but only the page that matches the path is drawn.

## The script — `app.js`

Order matters: **helpers → modules → entry point**.

```js
/* ---------- shared modules ---------- */

// No tag needed: a module can be a namespace for actions.
Exura.module(class Modal {
  static open(id)  { Exura.dom(`[modal]#${id}`).classList.add('open'); }
  static close(id) { Exura.dom(`[modal]#${id}`).classList.remove('open'); }
});

Exura.module(class Loader {
  static close() {
    this.dom.classList.add('hidden');
  }
});

Exura.module(class Navbar {
  static start() {
    window.addEventListener('scroll', () => {
      this.dom.classList.toggle('scrolled', window.scrollY > 0);
    });
  }
});

/* ---------- pages ---------- */

Exura.module(class Home {
  static start() {
    this.dom.html('');                 // hide every page first
    this.router('/', () => {
      this.render();                   // draw this page
      this.faq();                      // then bind what lives inside it
    });
  }

  static faq() {
    this.dom.find('#faq').on('click', (e) => { /* … */ });
  }
});

Exura.module(class About {
  static start() {
    this.dom.html('');
    this.router('/about', () => this.render());
  }
});

Exura.module(class Career {
  static start() {
    this.dom.html('');
    this.router('/career', () => this.render());
  }
});

/* ---------- entry point ---------- */

async function instance() {
  Navbar.start();
  Home.start();
  About.start();
  Career.start();

  Loader.close();
}

document.addEventListener('DOMContentLoaded', instance);
```

## How it works

1. **Registration** — every `Exura.module(…)` saves its tag's content as the template and makes the module global (`Home`, `About`…).
2. **`instance()`** — runs once the page is parsed and starts the modules in a fixed order.
3. **Each page module** empties its tag and asks the router about its own path. Only one matches, so only one page is rendered; the others stay empty.
4. **After `render()`**, bind listeners and start widgets that live inside the page (accordions, clocks, charts). `render()` replaces the tag's content, so anything bound before it is gone.
5. **Shared modules** (navbar, loader) never call the router — they are on every page.

## Tips

- **One module, one job.** Pages render; `Navbar`, `Loader`, `Modal` handle shared UI; tag-less modules group related actions (`Modal.open('login')` from any `onclick`).
- **Keep `start()` methods** for setup and call them only from the entry point — the order of the site lives in one place.
- **Translations, analytics, animations** that scan the page belong **after** the pages are started, so they see the rendered content.
- The server must send every path (`/about`, `/career`) to the same HTML file. On a sub-folder, include it in the patterns (`'/site/about'`).
- Normal links (`<a href="/about">`) load the page again — the router runs on every load.
