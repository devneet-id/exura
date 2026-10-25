# API reference

[← exurajs](README.md)

## `Exura` (static)

| Method | Does |
|---|---|
| `Exura.module(fnOrClass)` | registers a module (name = ID = `<exura-ID>` tag) and makes it global |
| `Exura.store(ID, data?)` | returns the module store; merges `data` (object) when given |
| `Exura.state(ID, data?)` | returns the module state; sets every key of `data` when given |
| `Exura.effect(ID, fn, deps?)` | adds an effect; runs it now and on changes of `deps` (`null` = every change) |
| `Exura.render(ID, template?)` | fills the template and writes the tag; `template` replaces the stored one |
| `Exura.escape(value)` | escapes `& < > " '` |
| `Exura.dom(selectorOrElement)` | returns an `ExuraDom` wrapper (`'name'` → `<exura-name>`) |
| `Exura.watch(element, fn, { once = true })` | runs `fn` when the element enters the view |
| `Exura.router(pattern, fn)` | calls `fn(params)` when `location.pathname` matches `pattern` |
| `Exura.load(ID?)` | `[module, store, state, effects, element]`, or the Map of all modules |
| `Exura.environment(env)` | reserved for environment options |

## Module members

Set by `Exura.module()` on the function or class:

| Member | Same as |
|---|---|
| `module.store` | `Exura.store(ID)` |
| `module.state` | `Exura.state(ID)` |
| `module.effect(fn, deps?)` | `Exura.effect(ID, fn, deps)` |
| `module.render(template?)` | `Exura.render(ID, template)` — warns when there is no tag |
| `module.dom` | wrapper of `<exura-ID>`, or `false` |
| `module.watch(selector, fn)` | `Exura.watch()` on an element **inside** the tag |
| `module.router(pattern, fn)` | `Exura.router(pattern, fn)` |

In a class module these are static: `this.state`, `this.render()` inside static methods.

## `ExuraDom`

`text()`, `html()`, `attr()`, `append()`, `find()`, `on()`, `clear()`, `.target`, plus every native method of the element — see [DOM helper](dom.md).

## `ExuraEnvironment`

The registry behind everything — `Map`s named `module`, `store`, `state`, `effect`, `render`, `boiler` (templates) and `configure`:

| `configure` key | Value |
|---|---|
| `version` | exurajs version |
| `mode` | `production` |
| `url` | current origin with a trailing `/` |
