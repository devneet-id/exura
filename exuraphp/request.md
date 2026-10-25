# Request

[← exuraphp](README.md)

`Exura::method()` reads the request data — JSON body, form body and query string — through one call.

```php
// POST index.php?/notes   body: {"title": "First note", "tags": ["a", "b"]}
Exura::module('POST', 'notes', function() {
  $title = Exura::method('title', 'untitled');   // "First note"
  $tags  = Exura::method('tags', []);            // ["a", "b"]
  $all   = Exura::method();                       // every value
  return ['data' => compact('title', 'tags')];
});
```

| Call | Returns |
|---|---|
| `Exura::method('key')` | the value, or `false` when missing |
| `Exura::method('key', $default)` | the value, or `$default` when missing |
| `Exura::method()` | all values as an array |

## Where the values come from

| Source | Example |
|---|---|
| JSON body | `Content-Type: application/json` · `{"title": "Hi"}` |
| form / urlencoded body | `title=Hi` (also `$_POST`) |
| query string | `index.php?/notes&page=2` |

Values are merged in that order; query values are added last. The `?/route` part is not included.

## Other request facts

```php
ExuraEnvironment::getRequest();   // "POST"
ExuraEnvironment::getRoute();     // "notes"
$_SERVER['HTTP_AUTHORIZATION'] ?? null;   // headers come from PHP as usual
```
