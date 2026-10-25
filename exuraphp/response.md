# Response

[← exuraphp](README.md)

Every answer is JSON with `Content-Type: application/json`. Unicode and slashes are kept as they are (`👋`, `https://…`).

## Return an array

The array returned by the callback is merged into the response:

```php
Exura::module('GET', 'hello', function() {
  return ['data' => 'Hello 👋'];
});
```

```json
{
    "E X U R A - 1.0.0": {
        "url": "http://localhost:8000/",
        "state": 200,
        "route": "hello",
        "method": [],
        "request": "GET",
        "referer": ""
    },
    "state": 200,
    "data": "Hello 👋"
}
```

The first block is the **trace** — url, status, route, request data and method — to make debugging easy. `state` is the HTTP status.

## Build it step by step

```php
Exura::module('GET', 'stats', function() {
  Exura::data('php', PHP_VERSION);
  Exura::data('memory', memory_get_usage());
  Exura::state(200);
  return [];
});
// → "data": { "php": "8.3.6", "memory": 412345 }
```

| Method | Does |
|---|---|
| `Exura::data($key, $value)` | adds `$key => $value` under `data` |
| `Exura::state($code)` | sets the HTTP status (default `200`) |
| `Exura::header([...])` | sends extra headers |

```php
Exura::header(['Cache-Control: no-store', 'X-Api: notes']);
```

## Answer right away

`Exura::return($data, $code)` sends the response immediately and ends the script — handy for early exits:

```php
Exura::module('POST', 'notes', function() {
  $title = Exura::method('title');
  if (!$title) {
    Exura::return(['error' => ['message' => 'title is required']], 422);
  }
  Exura::return(['data' => ['title' => $title]], 201);
});
```

## Errors

PHP warnings, notices and exceptions inside a module become JSON with status `500`:

```php
Exura::module('GET', 'fail', function() {
  throw new RuntimeException('Something went wrong', 7);
});
```

```json
{
    "E X U R A - 1.0.0": { "...": "...", "state": 500, "route": "fail" },
    "state": 500,
    "error": {
        "type": "RuntimeException",
        "code": 7,
        "message": "Something went wrong",
        "file": "/var/www/index.php",
        "line": 5
    }
}
```

The error includes the file and line — keep that in mind before exposing an API publicly.

## 404

`Exura::fallback()` answers when no module matched:

```json
{
    "E X U R A - 1.0.0": { "...": "...", "state": 404, "route": "nope" },
    "error": { "message": "Route not found", "route": "nope" },
    "state": 404
}
```
