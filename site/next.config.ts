import type { NextConfig } from "next";
import { fetchStars } from "./src/lib/site";

// Static export. BASE_PATH is set only when the site is served from a sub-path.
const basePath = process.env.BASE_PATH ?? "";

export default async function config(): Promise<NextConfig> {
  const stars = await fetchStars({ signal: AbortSignal.timeout(5000) });
  return {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_GITHUB_STARS: String(stars ?? "") },
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
