# State, store & effect

[← exurajs](README.md)

Each module has two data maps and any number of effects.

| | `store` | `state` |
|---|---|---|
| Purpose | static data: labels, config, text | data that changes |
| Triggers effects | no | yes |
| Used by `render()` | yes | yes (wins when a key exists in both) |

Both are `Map`s: `set`, `get`, `has`, `delete`, `forEach`… work as usual.

## store

```js
profile.store.set('title', 'Profile');
Exura.store('profile', { fullname: 'Anwar Achilles', role: 'Maintainer' });   // merge many keys
```

## state

```js
counter.state.set('count', 0);
counter.state.get('count');            // 0
Exura.state('counter', { count: 0, step: 1 });   // set many keys
```

`set()` compares with the old value (`!==`). Setting the **same** value does nothing.
Objects and arrays are compared by reference — set a new array (`[...list, item]`) or a derived value (a count, a joined string) so the change is seen.

## effect

```js
counter.effect(() => counter.render(), ['count']);
```

`effect(fn, deps)`:

- runs `fn` **once right away** when it is registered,
- runs it again whenever `state.set()` changes one of the keys in `deps` (and the values actually differ from the last run),
- with `deps` left out (or `null`), runs on **every** state change.

A module can have **many** effects:

```js
Exura.module(function greet() {
  const { state, effect, render } = greet;
  state.set('name', 'friend');

  effect(() => state.set('length', state.get('name').length), ['name']);   // derive
  effect(() => render(), ['name', 'length']);                                // draw
  effect(() => console.log('something changed'));                           // every change
});
greet();
```

An effect that sets state inside itself will not run itself again in a loop — re-entry is blocked while it is running.

## Order of updates

When several keys change together, set the ones the effect **does not** watch first, and the watched key **last**:

```js
static sync() {
  this.state.set('total', total);   // not watched
  this.state.set('count', count);   // watched → render sees both new values
}
```
