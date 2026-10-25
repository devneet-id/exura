# Router

[← exurajs](README.md)

`router(pattern, fn)` runs `fn` when the current path matches `pattern`. It is how one HTML file serves many pages.

```js
Exura.router('/user/:id', ({ id }) => console.log(id));   // /user/42 → "42"
```

## The idea

The router does not draw anything — it decides **which code runs**. Drawing is still `render()`. That works because a module saves its tag's content as the template when it is **registered**:

1. `Exura.module(Home)` → the content of `<exura-home>` is saved as the template.
2. `dom.html('')` → empty the tag, so the raw `{{…}}` template is not shown.
3. `router('/', …)` → on a matching path, `render()` puts the template back, filled with the module's data.
4. No route matches → the tag stays empty.

## Put routes where your structure wants them

`router`, `render` and `dom` belong to the module from the moment it is **registered**. So a route can be written **anywhere** — inside a class, inside a function, or outside every module. All three behave the same; pick the one that fits how you build the site, and mix them if you like.

### Inside a class module

Each page owns its route and its page logic. Good for sites where a page does more than show a template (widgets, listeners, animations).

```js
Exura.module(class Home {
  static start() {
    this.dom.html('');

    this.router('/', () => {
      this.render();
      this.faq();        // bind what lives inside the page — after render()
      this.clock();
    });
  }

  static faq()   { /* … */ }
  static clock() { /* … */ }
});

Exura.module(class About {
  static start() {
    this.dom.html('');
    this.router('/about', () => this.render());
  }
});

Home.start();
About.start();
```

Use an **arrow function** for the callback so `this` stays the module.

### Inside a function module

The same idea in function style — the module body is the setup.

```js
Exura.module(function Home() {
  const { dom, render, router } = Home;
  dom.html('');
  router('/', () => render());
});

Exura.module(function About() {
  const { dom, render, router } = About;
  dom.html('');
  router('/about', () => render());
});

Home();
About();
```

### Outside the modules — one route table

Modules only hold the page; every route sits in one list. Good when you want to see the whole site map at a glance. The module body does not even need to run — registering it is enough.

```js
Exura.module(class Home {
  static faq() { /* … */ }
});
Exura.module(class About {});

Home.dom.html('');
About.dom.html('');

Home.router('/',       () => { Home.render(); Home.faq(); });
Home.router('/home/',  () => Home.render());
About.router('/about', () => About.render());
```

### One module, several routes

A single module can also answer many paths — same template with other data, or its own template:

```js
Exura.module(class app {
  static start() {
    this.dom.html('');

    this.router('/', () => {
      this.state.set('title', 'Home');
      this.render();
    });

    this.router('/about', () => {
      this.state.set('title', 'About');
      this.render();
    });

    this.router('/post/:id', ({ id }) => {
      this.render(`<h1>Post ${id}</h1>`);   // stored as the new template
    });
  }
});
app.start();
```

| Style | Routes live | Fits |
|---|---|---|
| class module | in each page's `start()` | pages with their own logic |
| function module | in each module body | small pages, function style |
| route table | in one place, outside | seeing the whole site map |
| one module | in one `start()` | pages that share a template |

For a full site with shared parts (navbar, loader) and an entry point, see [Multi-page site](pages.md).

## Without a server — hash pages

`router()` reads `location.pathname`, so `/` patterns need a server that sends every path to the same file. Opened straight from disk (`file://…/index.html`), or on hosting without rewrites, the path is the file's own path and no `/` route matches. A `#` pattern is not read by `router()` either.

For pages that work **anywhere** — even without a server — use the hash (`index.html#about`) with a few lines of your own. The modules stay the same:

```html
<a href="#home">Home</a>
<a href="#about">About</a>

<exura-home><h1>Home</h1></exura-home>
<exura-about><h1>About</h1></exura-about>

<script>
  Exura.module(class Home {});
  Exura.module(class About {});

  const pages = { '#home': Home, '#about': About };

  function route() {
    const hash = location.hash || '#home';           // default page
    for (const [key, page] of Object.entries(pages)) {
      key === hash ? page.render() : page.dom.html('');
    }
  }

  window.addEventListener('hashchange', route);       // follow link clicks and Back
  route();                                            // first load
</script>
```

| | `/` routes (`router()`) | `#` pages (above) |
|---|---|---|
| Needs a server rewrite | yes | no — works from disk, GitHub Pages, any host |
| Changing page | reloads the page | instant, no reload; Back / Forward work |
| URL | `/about` | `index.html#about` |

Run page logic after `render()` the same way: `key === hash ? (page.render(), page.start?.()) : page.dom.html('')`.

## Patterns

| Pattern | Matches | Params |
|---|---|---|
| `/` | `/` | – |
| `/about` | `/about` | – |
| `/user/:id` | `/user/42` | `{ id: '42' }` |
| `/post/:slug/comments` | `/post/hello/comments` | `{ slug: 'hello' }` |

- Start every pattern with `/` — `location.pathname` always does, so `'home/'` never matches; write `'/home/'`.
- The **whole path** must match: `/user/:id` does not match `/user/42/edit`.
- A trailing slash counts: `/about/` does not match `/about` — add both if needed.
- Params are strings; decode them when they may contain encoded characters: `decodeURIComponent(id)`.

## A 404 page

Nothing runs when no route matches. Mark a hit and show a fallback module **last**:

```js
Exura.module(function Home() {
  const { dom, render, router } = Home;
  dom.html('');
  router('/', () => { render(); Home.found = true; });
});

Exura.module(function NotFound() {
  const { dom, render } = NotFound;
  dom.html('');
  if (!Home.found) render();
});

Home();
NotFound();   // after every page
```

## Things to know

- The router reads the path **once**, when it is called — on page load. Links between pages (`<a href="/about">`) load the page again.
- The **server** must send every path to the same HTML file. With `php -S`, use the file itself as the router script:
  ```shell
  php -S localhost:8000 index.php
  ```
- On a **sub-folder** (for example GitHub Pages at `/exura/`), write the folder in every pattern: `'/exura/'`, `'/exura/about'`.
- Bind listeners and start [watch](watch.md) **after** `render()` inside the route.
- `Exura.router(pattern, fn)` and `module.router(pattern, fn)` are the same thing.
