# Routing

[← exuraphp](README.md)

```php
Exura::module($method, $route, $callback);
```

## Method

One method or a list, any case:

```php
Exura::module('GET', 'notes', fn() => ['data' => listNotes()]);
Exura::module('post', 'notes', fn() => ['data' => createNote()]);
Exura::module(['PUT', 'PATCH'], 'notes/*', fn() => ['data' => updateNote()]);
Exura::module('DELETE', 'notes/*', fn() => ['data' => true]);
```

## Route

The **whole route** must match, from its start. Matching ignores case and leading or trailing slashes.

| Pattern | Matches | Does not match |
|---|---|---|
| `notes` | `notes`, `/notes/` | `notes/1`, `api/notes` |
| `notes/*` | `notes/1`, `notes/1/edit` | `notes` |
| `api/*/notes` | `api/v1/notes` | `api/notes` |
| `*` | anything | – |

`*` matches any text, including `/`.

### Reading the route

There are no named parameters yet. Use a wildcard and read the route:

```php
Exura::module('GET', 'user/*', function() {
  $route = ExuraEnvironment::getRoute();          // "user/42"
  $id    = substr($route, strrpos($route, '/') + 1);
  return ['data' => ['id' => $id]];
});
```

## Order matters

The first matching module answers and the script ends. Put specific routes before general ones:

```php
Exura::module('GET', 'notes/today', fn() => ['data' => today()]);   // first
Exura::module('GET', 'notes/*',     fn() => ['data' => one()]);     // then the wildcard
```

The callback runs **only** when its module matches — code inside it never runs for other routes.

## Fallback

```php
Exura::fallback();                                   // 404 + error "Route not found"
Exura::fallback(['data' => ['hint' => 'see /docs']]); // add your own data
Exura::fallback([], 405);                            // another status
```

Call it **after** all modules. It answers every request that reached it.

If the same file also serves a page (HTML), limit the fallback to API requests:

```php
if (preg_match('#^/#', $_SERVER['QUERY_STRING'] ?? '')) {
  Exura::fallback();
}
// …HTML below
```
