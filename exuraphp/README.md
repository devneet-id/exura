# exuraphp — Documentation

**exuraphp** is the HTTP API package of the Exura series: a route, a function, a JSON response — *Express-like*, in one PHP file.

```php
<?php
require __DIR__ . '/exura.php';

Exura::module('GET', 'hello', function() {
  return ['data' => 'Hello 👋'];
});

Exura::fallback();   // nothing matched → 404 as JSON
```

```shell
curl "http://localhost:8000/index.php?/hello"
```

## Pages

| Page | Covers |
|---|---|
| [Routing](routing.md) | `Exura::module()`, methods, routes, wildcards, `Exura::fallback()` |
| [Request](request.md) | reading body, form and query with `Exura::method()` |
| [Response](response.md) | returned arrays, `data()`, `state()`, `header()`, `return()`, errors, the JSON shape |
| [API reference](api.md) | every method in one place |

## Install

Copy `dist/exura.php` (or `dist/exura.min.php`) into your project and require it:

```php
require __DIR__ . '/exura.php';
```

PHP 8.1+. No Composer package, no extensions beyond PHP itself.

## Run it

exuraphp needs no server configuration — the route can travel in the query string:

```shell
php -S localhost:8000
curl "localhost:8000/index.php?/hello"
```

| URL style | Route |
|---|---|
| `index.php?/hello` | `hello` (works everywhere) |
| `index.php/hello` | `hello` (the script name is stripped) |
| `/hello` with a rewrite to `index.php` | `hello` |

Query values still work next to the route: `index.php?/users&page=2`.

## How a request flows

1. Each `Exura::module($method, $route, $fn)` checks the current request.
2. The **first** module whose method and route match runs `$fn`, sends the JSON response and **ends the script**.
3. Modules that do not match are skipped.
4. `Exura::fallback()` at the end answers `404` when nothing matched.
