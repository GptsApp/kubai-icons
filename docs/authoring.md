# Authoring library icons

Every icon in the library is one ES module in `icons/`. The design rules are the skill's
rules in [`PROMPT.md`](../PROMPT.md); this page covers only the library's file format,
naming and checks.

## One file per icon

`icons/<name>.js`, where `<name>` is the icon's id:

```js
import { defineIcon, KR, OL, rr, at, f } from '../packages/core/src/kit.js';

export default defineIcon({
  name: 'archive',              // kebab-case, matches the file name
  zh: '归档',                    // Simplified Chinese label
  category: 'files',            // an id from icons/categories.json
  tags: ['box', 'storage', 'store', '存档'],
  variants: ['plus', 'check', 'search', 'lock'], // badges this object takes
  off: false,                   // true adds a slashed "<name>-off" icon
  // One sentence: the object, and what it does on hover.
  svg: (u) => `...`,
  target: (h, s) => ({ ... }),
  draw(p, E) { ... }
});
```

- `svg(u)`, `target(hover, state)` and `draw(p, E)` follow section 9 of `PROMPT.md`
  exactly. The helpers named there (`rr`, `rp`, `R`, `circ`, `lines`, `star`, `gear`,
  `cloud`, `frontPiece`, `sector`, `KR`, `CR`, `OL`, `LINE`, `ACC`, `DEEP`, `DEEPS`,
  `CLOCK_MINUTES`) come from `packages/core/src/kit.js`, which also offers `ellipse`,
  `arrow` (a straight shaft with a solid head), `arcArrow`, `capsuleRing`, `scaleAt`,
  `rattle` (a damped swing that is 0 at both ends), `clamp01`, `SOFT`/`SOFTS` (the lighter
  mark colour #89B5FF) and `WHITE`/`WHITES` (white marks that soft variants turn deep).
- No `Date`, `Math.random` or other input: a build must always produce the same markup.
- Text (`<text>`) only when the glyph is the semantic core, as in the calendar's date.
- Shared geometry for a family of icons may live in a helper module whose name starts
  with an underscore (`icons/_arrows.js`); the build skips those files.
- Do not change `packages/core/src/kit.js` or the badges to suit one icon.

## Keywords

Every icon needs an entry in `icons/keywords.json`, which the website searches and lists:

- `shape`: the silhouette and main forms (`circle`, `rectangle`, `tab`).
- `object`: other names for what is drawn.
- `meaning`: what it stands for in an interface.
- `action`: what a user does with it, or the feature it labels.
- `zh`: Simplified Chinese search words.

## Names

- English, kebab-case, singular, object first: `file-text`, `cloud-rain`, `arrow-up-right`.
- The name says what is drawn, not what it is used for: `lightbulb`, not `idea`. Put uses
  in `tags`.
- Directions and states come last: `arrow-down`, `battery-low`, `lock-open`.
- Suffixes made by badges (`-plus`, `-check`, …) and `-off` are reserved for composites.

## Badges and the slash

A badge is a small solid disc with a white glyph, composed onto the base icon's lower
right corner at (22.6, 18.4), radius 5. A gap of 1.4 round it is cut out of the base, so
the badge reads apart from the body without an outline or shadow. Badges never take the
body's accent: the disc is a neutral ink by default, or the badge's own `tone` when a page
asks for semantic colours. A badge's `target()` returns its hover scale as `s`, and the gap
grows with it. List the badges in `variants`; each one creates
`<name>-<badge>`. Pick only the combinations a product would actually need: a folder
takes most of them, an arrow takes none.

| Badge | Meaning |
| --- | --- |
| `plus`, `minus`, `check`, `x` | add, remove, done, cancel or error |
| `alert`, `info` | warning, details |
| `up`, `down`, `right` | upload or export, download or import, move or send |
| `clock`, `sync` | scheduled or recent, syncing |
| `star`, `heart` | favourite, liked |
| `lock`, `search`, `cog` | private, find, settings |
| `sparkle`, `bolt` | AI or smart, fast or powered |

If the corner holds the icon's key detail, move the badge with `badgeAt: [x, y]`, or
leave that badge out. `off: true` lays a slash across the icon for things that switch
off: bells, microphones, cameras, signals, lights.

## Checks

```bash
node tools/check.mjs --only archive,inbox --with folder,mail,download
```

Sheets land in `check-out/lib/`: `sheet.png` (rest and hover), `frames.png` (the motion
from rest to end), `sizes.png` (24px and 28px) and `variants.png` (accents and the soft
variant). `--only` accepts a trailing `*` (`--only 'archive*'` shows every composite),
`--base` leaves composites out, `--out` picks another folder. Every item of the checklist
in section 10 of `PROMPT.md` has to pass, and the command has to finish without errors.

`npm run validate` checks every icon's metadata, names and markup.
