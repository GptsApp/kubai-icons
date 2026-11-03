# Contributing to Kubai Icons

Thanks for helping with Kubai Icons. Issues and pull requests in Chinese or English are both welcome.

Everyone taking part follows the [code of conduct](CODE_OF_CONDUCT.md).

## Where things go

- **An icon looks or moves wrong** (a seam, a doubled outline, a mark that disappears in a palette, a motion that ends in the wrong place): open an icon issue.
- **The skill left you guessing** (a rule in `PROMPT.md` or `SKILL.md` that was unclear, contradicted another, or didn't cover your case): open a skill feedback issue. Quote the rule and say what you had to decide yourself.
- **The engine, gallery or self-check** (`src/engine.js`, `src/app.js`, `index.html`, `scripts/check.mjs`): an icon issue with the command you ran and its output.
- **Security issues**: never in a public issue. See [SECURITY.md](SECURITY.md).

For anything larger than a fix, such as a new rule or a change to the engine, open an issue first so we can agree on the direction before you spend time on it.

## Setup

Nothing to install. Open `index.html` in a browser to see the gallery. The self-check needs Node.js 18 or later and Chrome (set `CHROME` if it isn't found):

```bash
node scripts/check.mjs --only 文件夹,邮件
```

Screenshots land in `check-out/`, which git ignores.

## Before opening a pull request

```bash
node scripts/check.mjs
```

It must print `No script errors.`; CI runs the same command. For icon changes, also run the check on the icons you touched with a few existing ones beside them, and attach `frames.png`, `size-24.png` and `palettes.png`:

```bash
node scripts/check.mjs --only 新图标 --with 文件夹,邮件,下载
```

## Conventions

- **Rules.** Every icon follows `PROMPT.md`; section 10 is the checklist. If a rule had to bend, say which and why in the pull request.
- **Engine.** New icons reuse `src/engine.js` and follow the pattern of the closest existing icon. Engine changes need an issue first.
- **Counts.** When the number of icons changes, update the count in both READMEs and make every column count in `index.html` divide the new total.
- **Comments** explain the code to its reader. Keep discussion and history in the pull request.
- **Commits.** One change per commit, with a short imperative subject, for example "Keep the compass needle level at rest".

## Licensing

This repository is under the [Kubai Icons License](LICENSE), which is source-available rather than open source. By submitting a contribution, you grant Kubai087 the rights described in section 7 of that license.

Only add images or code that you made yourself.
