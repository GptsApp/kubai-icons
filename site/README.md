# kubai-icons-site

The documentation site and icon browser, a static Next.js export with shadcn/ui.

```bash
npm run site:dev     # from the repository root: builds the packages and site data, then starts Next.js
npm run site:build   # static export in site/out
```

`NEXT_PUBLIC_SITE_URL` sets the public address used in canonical links and social cards. `BASE_PATH` is needed only when the site is served from a sub-path. Analytics stays off unless `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (with optional `NEXT_PUBLIC_UMAMI_SRC`) or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set at build time; see `src/lib/analytics.ts`.

`public/data/`, `public/gallery/` and `src/generated/` are written by `tools/build.mjs` and are not committed.
