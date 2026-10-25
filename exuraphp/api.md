# API reference

[← exuraphp](README.md)

## `Exura` (static)

| Method | Does |
|---|---|
| `Exura::module($method, $route, $fn)` | if method and route match: runs `$fn`, merges its array into the response, sends JSON, ends the script |
| `Exura::fallback($data = [], $code = 404)` | sends `error: Route not found` with `$code`; call after all modules |
| `Exura::method($key = null, $default = false)` | one request value, or all values when `$key` is `null` |
| `Exura::data($key, $value)` | adds `$key` under `data` |
| `Exura::state($code)` | sets the HTTP status |
| `Exura::header(array $lines)` | sends each header line |
| `Exura::return($data, $code = null)` | merges `$data`, sets `$code`, sends JSON, ends the script |

`$method`: `'GET'` or a list such as `['PUT', 'PATCH']`, any case.
`$route`: matched from the start against the whole route; `*` matches anything (`user/*`).

## `ExuraEnvironment` (static)

Helpers you may read inside a module:

| Member | Returns |
|---|---|
| `ExuraEnvironment::getRoute()` | current route without leading `/` (`user/42`) |
| `ExuraEnvironment::getRequest()` | HTTP method (`GET`) |
| `ExuraEnvironment::getMethod()` | request data, same as `Exura::method()` |
| `ExuraEnvironment::$configure` | `['version' => …, 'url' => …]` |
| `ExuraEnvironment::$response` | the response being built |

## Response keys

| Key | When |
|---|---|
| `E X U R A - <version>` | always — trace: `url`, `state`, `route`, `method`, `request`, `referer` |
| `state` | always — HTTP status |
| `data` | from your return value or `Exura::data()` |
| `error` | on PHP errors, exceptions (`500`) and `fallback()` (`404`) |
| *anything else* | any other key you return |
