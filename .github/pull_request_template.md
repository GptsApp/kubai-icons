## What this changes

<!-- Which icons, packages, rules or scripts change, what someone sees differently, and why. Link the issue it comes from. -->

## Type

- [ ] New library icon (`icons/`)
- [ ] Icon fix
- [ ] Packages, tools or site
- [ ] Skill: rules, scripts or engine
- [ ] New skill gallery example (at most three)

## Checks

- [ ] `npm run validate` and `npm test` pass
- [ ] A changeset is added (`npx changeset`) for anything that changes a published package
- [ ] Docs updated where an option or a step changed

For library icons:

- [ ] Every item of the checklist in `PROMPT.md` section 10 passes
- [ ] `sheet.png`, `frames.png`, `sizes.png` and `variants.png` from `node tools/check.mjs --only <names> --with folder,mail` attached
- [ ] Names, `zh`, category and tags follow `docs/authoring.md`; badges only where a product would need them
- [ ] My own work, with no brand logos or copied icons

For a skill change:

- [ ] `node scripts/check.mjs` prints `No script errors.`
- [ ] Existing icons look the same, or before and after screenshots of what moved are attached

For a skill gallery example:

- [ ] `frames.png`, `size-24.png` and `palettes.png` attached, plus the `--accent #F59E0B` run
- [ ] Named in Simplified Chinese, credited with `by`, and appended to the end of `ORDER`
