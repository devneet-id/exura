# Render & templates

[← exurajs](README.md)

The content of `<exura-name>` is the module's **template**. `render()` fills it with the module's store and state and replaces the tag's content.

```html
<exura-profile>
  <span text="h4">{{fullname}}</span>
  <span card="{{tone}}:2">{{status}}</span>
</exura-profile>
```

## Placeholders

| Placeholder | Inserts |
|---|---|
| `{{key}}` | the value as **text** — `<`, `>`, `&`, quotes are escaped |
| `{{{key}}}` | the value as **raw HTML** |

```js
greet.state.set('name', '<b>bold</b>');
// {{name}}   → shows the text <b>bold</b>
// {{{name}}} → shows bold
```

Use `{{{key}}}` only for HTML you build yourself. Escape user text inside it with `Exura.escape()`.

Placeholders work in text **and in attributes**, which pairs well with exuracss:

```html
<div card="{{tone}}:2" ring="b:full b:{{tone}}-5">Hello, {{name}}</div>
```

Only plain keys are supported — no expressions. Compute the value first, then put it in state.

## Lists

There is no loop syntax: build the HTML string and insert it raw.

```html
<exura-todo>
  <p>{{left}} left of {{total}}</p>
  <ul list="ring:y">{{{items}}}</ul>
</exura-todo>
```

```js
Exura.module(class todo {
  static init() {
    this.list = [{ text: 'Write docs', done: false }];
    this.sync();
    this.effect(() => this.render(), ['items']);
  }
  static toggle(i) {
    this.list[i].done = !this.list[i].done;
    this.sync();
  }
  static sync() {
    this.state.set('total', this.list.length);
    this.state.set('left', this.list.filter(t => !t.done).length);
    this.state.set('items', this.list.map((t, i) =>
      `<li onclick="todo.toggle(${i})">${t.done ? '✅' : '⬜'} ${Exura.escape(t.text)}</li>`
    ).join(''));
  }
});
todo.init();
```

## Things to know

- **Render replaces the whole content** of the tag. Listeners added with `addEventListener` inside it are lost — use inline handlers (`onclick="todo.toggle(1)"`) or bind them again after rendering.
- **Keep inputs outside the tag** when you update state while typing, otherwise the input is redrawn and loses focus.
- **Change the template:** `render(newTemplate)` stores a new template and renders it.
- `render()` before any `{{key}}` has a value leaves that placeholder as written.
