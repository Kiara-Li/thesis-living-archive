# Living Archive

Kiara Li — BFA Communication Design, Thesis 1, Fall 2026

A black-and-white, line-based record of the thesis as it grows.

- **Process** (`index.html`) — a map of weeks and steps. Click to grow a branch, hover to preview, drag one node onto another to connect them (not saved). Each click plays a music-box note.
- **Works** (`works/`) — finished pieces on their own pages.

## Editing content

Everything on the map lives in `assets/js/data.js`: one node per assignment, labelled with its date and name. Fill in `text`, `images`, `feedback`, `response`, and delete a `todo` once it's done.

Images go in `assets/img/<folder>/full/` (≈1800px) and `assets/img/<folder>/thumb/` (≈420px) with the same filename. Refer to them as `'<folder>/<name>'`.

Deep links: `index.html#w5-nyabf` opens that step directly.

## Preview locally

```
python3 -m http.server 8420
```
then open http://localhost:8420
