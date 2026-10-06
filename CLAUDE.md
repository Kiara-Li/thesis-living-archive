# Living Archive — instructions for Claude

Kiara's thesis website (BFA Communication Design, Thesis 1, Fall 2026). Static site, no build step, hosted on GitHub Pages from `main`. Plain HTML/CSS/JS — keep it that way (no frameworks, no backend).

## The usual job: add this week's content

Kiara will say something like "add week 6" or "add my research activity notes". Do this:

1. **Content lives in `assets/js/data.js` only.** One node per assignment/step. Read the header comment there for the node fields.
2. **New week** → add a `kind: 'week'` node to `root.children`, before the `future` nodes:
   - `date: 'MM.DD'` (the class date), `tag:` short assignment name, `label:` short title.
   - The upcoming nodes are in `data.js` with `hidden: true` (on hold). Remove `hidden` only when Kiara asks.
   - If the week appears as an upcoming `future` node, turn that node into the week instead of adding a duplicate. Add or shift future nodes to match the schedule she gives.
3. **Steps** → children with `kind: 'step'`. Nest them when the assignment has parts (e.g. "10 Questions" under "Research Activities").
   - A step that should grow somewhere else on the map gets `island: true`.
   - A finished piece gets `kind: 'work'` + `href: 'works/<slug>/'`, an entry in `works: [...]`, and a page copied from `works/256/index.html`.
4. **Text rules**
   - **Only include what Kiara did or explicitly asks for.** No teacher-recommended readings/"Look At" lists, no placeholder steps for things she didn't do. Teacher feedback is fine **in Kiara's own paraphrase together with her understanding/response** — never paste his words verbatim on their own.
   - Label every week with its **date and assignment name**. **Don't write your own descriptions or interpretations** — no `text` unless it's Kiara's words. If she gave no caption for something, leave it empty.
   - Captions for individual images go in `entries` (see the header comment in `data.js`): `source` for the reference line, `about` for the source's own description, `text` for her caption, and `more` for longer writing or annotations with footnotes.
   - If she writes notes in Chinese and the site text is English, translate plainly and literally. Don't embellish, and flag it in your reply.
   - **Never paste the teacher’s brief text** (Notion / syllabus). The assignment name is enough.
   - Kiara's own writing (captions, reflections) goes in as she wrote it. Don't rewrite it or make it sound polished/AI-like.
   - Anything still missing → a `todo: '…'` string, which shows as a dashed "TO ADD" box. Remove the `todo` once the material is in.
   - Update `meta.updated` to today's date (MM.DD).
5. **Images** — only web copies go in the repo, under `assets/img/<folder>/full/` and `/thumb/`.
   - If they're already there, reference them as `'<folder>/<file-without-.jpg>'`.
   - If Kiara only has raw photos, she runs `python3 scripts/add_images.py <folder> <name>` **locally** and pushes. Never commit raw originals (phone photos, scans, PDFs) — they bloat git history forever.
   - If raw images show up anyway, run the script on them, then delete the originals before committing.
6. Check it: `node -e "global.window={};require('./assets/js/data.js')"` must not throw. Every `images` path must exist in both `full/` and `thumb/`.
7. Commit with a message like `Add W06 — Drafts & Iterations`. Don't change the git author email.

## Don't touch without being asked

The visual design and interaction (`assets/css/*`, `assets/js/map.js`, `sound.js`) are tuned by eye locally. In content tasks, don't edit them. If something looks broken, describe it instead of fixing it.

## Design rules (when asked to change design)

- Black + white only. Lines are the main element. Mono type (IBM Plex Mono) plus Inter for titles.
- References: the Dropbox "Smart Workspace" file-tree poster (boxed folder nodes, dotted leader notes, grey inactive nodes, "…" pills) and the "Achievement" chapter map (circled numbered nodes, dashed arrows, pill tags).
- Map behaviour: branches grow and stay; the current step and its path stay bright, everything else dims (still clickable, but no hover preview); hover shows an orbit of images; leaves open a side panel; works open real pages; visitor-made connections are never saved; every click plays a music-box note.

## Preview

`python3 -m http.server 8420` → http://localhost:8420 · deep link to any node: `/#<node-id>`
