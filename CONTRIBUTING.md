# Contributing to Kubai Icons

Thanks for helping with Kubai Icons. This repository holds an agent skill, the open-source icon library drawn with it, and the website. You can make the skill better, add or fix library icons, improve the packages and the website, or add an example to the skill's gallery.

Everyone taking part follows the [code of conduct](CODE_OF_CONDUCT.md). Security issues never go in a public issue; see [SECURITY.md](SECURITY.md).

## The icon library

The library is built from `icons/` (one ES module per object) and `badges/`. Everything else in `packages/` and `site/` is generated from them or consumes them.

```bash
npm install
node tools/check.mjs --only my-icon --with folder,mail,download   # contact sheets in check-out/lib
npm run validate                                                  # names, metadata, markup
npm run build                                                     # all packages
npm test
npm run site:dev                                                  # the website
```

Rules for library pull requests:

1. **Follow `PROMPT.md` and `docs/authoring.md`.** Every item of the checklist in section 10 of `PROMPT.md` must pass; the format, naming and badge rules are in the authoring guide.
2. **One object per file, named for what is drawn.** Search the website first; an object the set already has won't be merged twice. Badged and slashed versions come from `variants` and `off`, not from new files.
3. **Badges only where a product needs them.** A folder takes most badges; an arrow takes none.
4. **Your own work.** No brand logos or trademarks, and nothing traced or copied from other icon sets.
5. **Credit.** Add `by: '<your GitHub handle>'` to the definition; it is kept in the icon's metadata.
6. **Show it.** Attach `sheet.png`, `frames.png`, `sizes.png` and `variants.png` from `tools/check.mjs`. CI renders the icons you touched again and uploads the sheets.
7. **Add a changeset** (`npx changeset`) for any change to a published package: a new icon is a minor change, a redraw a patch, a rename or removal a major one.

Request an icon you need with the icon request form instead of a pull request if you don't plan to draw it. If you already have an icon but don't want to open a pull request, use the [submission page](https://icons.kubai.design/icons/submit/).

## The skill

### Setup

Nothing to install. Open `index.html` in a browser to see the gallery. The scripts need Node.js 18 or later and Chrome (set `CHROME` if it isn't found):

```bash
node scripts/check.mjs --only 文件夹,邮件     # self-check, screenshots in check-out/
node scripts/export.mjs --only 文件夹         # static SVG, files in export/
```

`scripts/media.mjs` also needs `ffmpeg` and `img2webp`. Both output folders are ignored by git.

### Improving the skill

The skill is `PROMPT.md`, `SKILL.md`, the engine and the scripts. The most useful contributions make the next icon come out right on the first try.

- **A rule left you guessing.** Open a skill feedback issue first. Quote the rule, name the icon you were drawing, and say what you had to decide yourself. A screenshot helps. Rule changes start from evidence like this.
- **Run a blind test.** Give a fresh agent session nothing but `SKILL.md` and `PROMPT.md`, ask for a few icons the set doesn't have, and report every place it had to guess. This is how most of the current rules were found.
- **Fix a script or the engine.** Bugs in `check.mjs`, `export.mjs`, `media.mjs` or the engine: an issue with the command you ran and its output, or a pull request with the fix.

Rules for skill pull requests:

1. **Discuss first** for anything larger than a fix: a new rule, a changed rule, or an engine change.
2. **Keep every rule a hard requirement.** Write what to do and where it applies, not history or reasoning. `PROMPT.md` and `SKILL.md` stay in Simplified Chinese; please don't submit translations of them.
3. **Check the whole set.** A rule or engine change must not change existing icons unless that is the point. Run `node scripts/check.mjs` without `--only` and attach before and after screenshots of anything that moved.
4. **Keep the docs in step.** If an option or a step changes, update `SKILL.md`, both READMEs and this file in the same pull request.

### Adding an example to the gallery

Icons you design with the skill can join the skill's gallery (`src/icons.js`), credited to you.

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
npm run validate && npm run build && npm test   # library changes
node scripts/check.mjs                          # skill changes; must print `No script errors.`
```

CI runs both, builds every package and the website, and renders contact sheets. Fill in the checklist in the pull request template.

## Conventions

- **Comments** explain the code to its reader. Keep discussion and history in the pull request.
- **README media.** When an icon shown in the README animations changes, rerun `node scripts/media.mjs` and commit the new files in `assets/`.
- **Commits.** One change per commit, with a short imperative subject, for example "Keep the compass needle level at rest".

## Releasing

For maintainers.

### Packages

The four npm packages are versioned together with Changesets. Merging to `master` opens or updates a "Version packages" pull request; merging that pull request publishes to npm through `.github/workflows/release.yml`, using npm trusted publishing. The website deploys from `master` through `.github/workflows/deploy-pages.yml`.

### The skill

A skill release ships two zips built from a committed revision: the standard skill, and a copy for skill marketplaces that read `version`, `display_name`, `display_name_en`, `description_zh` and `description_en` at the top of the frontmatter instead of under `metadata`.

1. In a pull request, raise `metadata.version` in `SKILL.md`, and update the other metadata fields if the name or description changed.
2. After it merges, build both zips from `master`:

   ```bash
   node scripts/pack.mjs
   ```

3. Publish them:

   ```bash
   gh release create v<version> dist/kubai-icons-v<version>.zip dist/kubai-icons-v<version>-platform.zip
   ```

## Licensing

The repository holds three parts under three licences; see [LICENSING.md](LICENSING.md).

- Contributions to the icons and packages (`icons/`, `badges/`, `packages/`) are accepted under the [MIT License](LICENSE-ICONS).
- Contributions to the website (`site/`, `tools/`, `tests/`, `docs/`) are accepted under the terms in [LICENSE-SITE](LICENSE-SITE).
- Contributions to the skill are accepted under the [Kubai Icons License](LICENSE): by submitting one, you grant Kubai087 the rights described in its section 7, and a merged gallery icon becomes one of the skill's examples. The grant isn't exclusive: an icon you designed is still yours to use anywhere else.
