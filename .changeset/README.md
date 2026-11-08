# Changesets

Every pull request that changes a published package adds a changeset:

```bash
npx changeset
```

Pick the packages (they are versioned together), the bump and a one-line summary. New icons are a minor bump; renaming or removing an icon is a major bump; redrawing one is a patch.
