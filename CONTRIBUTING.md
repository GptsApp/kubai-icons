# Contributing to Kubai Icons

Thanks for helping with Kubai Icons. There are two ways to contribute: make the skill better, or add an icon you designed to the gallery. Issues and pull requests in Chinese or English are both welcome.

Everyone taking part follows the [code of conduct](CODE_OF_CONDUCT.md). Security issues never go in a public issue; see [SECURITY.md](SECURITY.md).

## Setup

Nothing to install. Open `index.html` in a browser to see the gallery. The scripts need Node.js 18 or later and Chrome (set `CHROME` if it isn't found):

```bash
node scripts/check.mjs --only 文件夹,邮件     # self-check, screenshots in check-out/
node scripts/export.mjs --only 文件夹         # static SVG, files in export/
```

`scripts/media.mjs` also needs `ffmpeg` and `img2webp`. Both output folders are ignored by git.

## Improving the skill

The skill is `PROMPT.md`, `SKILL.md`, the engine and the scripts. The most useful contributions make the next icon come out right on the first try.

- **A rule left you guessing.** Open a skill feedback issue first. Quote the rule, name the icon you were drawing, and say what you had to decide yourself. A screenshot helps. Rule changes start from evidence like this.
- **Run a blind test.** Give a fresh Claude session nothing but `SKILL.md` and `PROMPT.md`, ask for a few icons the set doesn't have, and report every place it had to guess. This is how most of the current rules were found.
- **Fix a script or the engine.** Bugs in `check.mjs`, `export.mjs`, `media.mjs` or the engine: an issue with the command you ran and its output, or a pull request with the fix.

Rules for skill pull requests:

1. **Discuss first** for anything larger than a fix: a new rule, a changed rule, or an engine change.
2. **Keep every rule a hard requirement.** Write what to do and where it applies, not history or reasoning. `PROMPT.md` and `SKILL.md` stay in Simplified Chinese; please don't submit translations of them.
3. **Check the whole set.** A rule or engine change must not change existing icons unless that is the point. Run `node scripts/check.mjs` without `--only` and attach before and after screenshots of anything that moved.
4. **Keep the docs in step.** If an option or a step changes, update `SKILL.md`, both READMEs and this file in the same pull request.

## Adding your own icon

Icons you design with the skill can join the gallery, credited to you.

Rules for icon pull requests:

1. **One feature, one everyday object.** Check `ORDER` in `src/app.js` first; an icon for a feature the set already covers won't be merged.
2. **Follow `PROMPT.md` completely.** Every item of the checklist in section 10 must pass. If a rule had to bend, say which and why.
3. **Use the engine as it is.** An icon pull request doesn't change `src/engine.js`. If your icon needs an engine change, open an issue first.
4. **Your own work.** No brand logos or trademarks, and nothing traced or copied from other icon sets.
5. **Name and credit.** Name the icon in Simplified Chinese like the others, and add `by: '<your GitHub handle>'` to its definition. The gallery shows it when someone hovers your icon.
6. **Append, don't rebalance.** Add the name to the end of `ORDER`. Leave the README counts and the gallery's column counts alone; they are updated when icons are merged.
7. **At most three icons per pull request,** one commit per icon.
8. **Show it.** Attach `frames.png`, `size-24.png` and `palettes.png` from:

   ```bash
   node scripts/check.mjs --only 你的图标 --with 文件夹,邮件,下载
   node scripts/check.mjs --only 你的图标 --accent #F59E0B
   ```

Not every icon will be merged, even a good one. The gallery is meant to read as one set, so the final call on fit stays with the maintainer, and you may be asked for changes.

## Before opening a pull request

```bash
node scripts/check.mjs
```

It must print `No script errors.`; CI runs the same command and a static export. Fill in the checklist in the pull request template.

## Conventions

- **Comments** explain the code to its reader. Keep discussion and history in the pull request.
- **README media.** When an icon shown in the README animations changes, rerun `node scripts/media.mjs` and commit the new files in `assets/`.
- **Commits.** One change per commit, with a short imperative subject, for example "Keep the compass needle level at rest".

## Licensing

This repository is under the [Kubai Icons License](LICENSE), which is source-available rather than open source. Forks made to propose changes back are allowed.

By submitting a contribution, you grant Kubai087 the rights described in section 7 of that license, and a merged icon becomes one of the skill's examples. The grant isn't exclusive: an icon you designed is still yours to use anywhere else.
