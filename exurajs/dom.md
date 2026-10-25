# DOM helper

[← exurajs](README.md)

`Exura.dom(selector)` wraps one element with a few chainable helpers.

```js
Exura.dom('#title').text('Hello').attr('text', 'h3 primary');
Exura.dom('#list').append(item);
Exura.dom('#box').on('click', () => console.log('clicked'));
```

`selector` is a CSS selector or an element. A module name works too: `Exura.dom('counter')` is `<exura-counter>`. Inside a module, `module.dom` is already the wrapper of its tag (or `false` without a tag).

## Methods

| Method | Read | Write (returns the wrapper) |
|---|---|---|
| `text(content?)` | `text()` → text content | `text('Hi')` |
| `html(content?)` | `html()` → inner HTML | `html('<b>Hi</b>')` |
| `attr(name, value?)` | `attr('card')` → value | `attr('card', 'primary')` |
| `append(node)` | – | adds an element or another wrapper |
| `find(selector)` | – | wrapper of the first match, or `null` |
| `on(event, fn)` | – | `addEventListener` |
| `clear()` | – | empties the element |

## Native methods

Anything the element itself has is forwarded. A native method that returns nothing gives the wrapper back, so you can continue with a helper:

```js
Exura.dom('#box').removeAttribute('card').text('Reset');
Exura.dom('#box').classList.toggle('open');
Exura.dom('#box').target;   // the real element
```

Chain **one** native method, then helpers — a second native method in the same chain is not forwarded.
