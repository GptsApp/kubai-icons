<h1 align="center">Kubai Icons</h1>

<p align="center">
  66 functional icons that change shape on hover, built the way the bookmark folder icon in
  <a href="https://github.com/kubai087/lumno-extension">Lumno</a> is built.
  <br />
  The repository is also a Claude skill that draws new icons in the same style.
</p>

<p align="center">
  <a href="PROMPT.md">Rules</a> ·
  <a href="SKILL.md">Skill</a>
  <br />
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.md">English</a>
</p>

<p align="center">
  <img src="assets/gallery.png" alt="The gallery: 66 icons in 11 columns, with the palette switcher and demo switch above them" />
</p>

## What's inside

| Path | What it is |
| --- | --- |
| `index.html` | The gallery: every icon, a palette switcher and a demo switch. Open it in a browser. |
| `src/engine.js` | Colour derivation, motion, geometry, gradients and filters, and the runtime that mounts, paints and animates an icon. |
| `src/icons.js` | The icons. Each one is `svg(u)`, `target(hover, state)` and `draw(p, E)`. |
| `src/app.js` | The gallery grid and controls. `ORDER` decides which icons show and in what order. |
| `scripts/check.mjs` | The self-check. Renders rest, hover, the motion in between, 24px, 28px and every palette in headless Chrome, and reports script errors. |
| `PROMPT.md` | The rules every icon follows. |
| `SKILL.md` | How to use the repository as a Claude skill. |
| `history/` | Three earlier versions, kept as a record of how the set took shape. |

## How an icon is built

Each icon is a back piece, optional white content and a front piece, like a folder holding a sheet of paper. Outlines sit outside the fill, so shapes keep their full size. Every gradient, outline and shadow is derived from one accent colour. Each part has exactly two keyframes, rest and hover, and the motion is something the object itself does: the folder opens, the envelope unseals, the calendar turns to the next day.

![Eight icons from rest (top) to the end of the hover (bottom)](assets/motion.png)

Seven palettes come with the set: one colour per icon, five clear tones built from a single base colour, and black.

![The same eight icons in all seven palettes](assets/palettes.png)

[PROMPT.md](PROMPT.md) has the full rules: canvas and keylines, layers, corners and outlines, light, colour, marks, motion, and the checklist each icon has to pass.

## Use it as a Claude skill

```bash
git clone https://github.com/kubai087/kubai-icons.git ~/.claude/skills/kubai-icons
```

Then ask Claude for icons, for example "add a scissors icon to this set" or "make a set of dynamic icons for this app". The skill reads `PROMPT.md`, writes each icon after the closest existing one, and runs the self-check until the icons pass. [SKILL.md](SKILL.md) describes the workflow.

## Self-check

Requires Node.js 18 or later and Chrome. Everything runs headless; no window opens.

```bash
node scripts/check.mjs --only 剪刀,地图 --with 文件夹,邮件,下载
```

| Option | What it does |
| --- | --- |
| `--only` | Checks only these icons. Without it, the whole set. |
| `--with` | Adds existing icons beside them for comparison. |
| `--accent #F59E0B` | Paints every icon in one accent colour, to check marks on light accents. |
| `--scale 3` | Renders every sheet at 3×, to look for seams. |
| `--out dir` | Writes the screenshots somewhere other than `check-out/`. |

`CHROME` overrides the browser path.

## Contributing

Bug reports, rule feedback and fixes are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [code of conduct](CODE_OF_CONDUCT.md) first; security issues go through [SECURITY.md](SECURITY.md).

## License

This repository is under the [Kubai Icons License](LICENSE). It is source-available, not open source. In short:

- **Your icons are yours.** Icons you make with the skill belong to you, for any use including commercial, with no credit required.
- **Ship the engine with them.** You may copy the engine, the gallery, the example icons and the self-check into your own icon set's project, change them, and ship that project, as long as the copyright notice at the top of each file stays.
- **Use and share the skill freely.** You may run it for any work, change it for your own use, and share exact, unmodified copies for free.
- **Don't republish it as something else.** Don't distribute a modified or translated version of the rules (`PROMPT.md`, `SKILL.md`), sell the skill, remove its notices, or present it under another name or as your own work.

The Kubai and Lumno names and logos are not licensed for reuse.
