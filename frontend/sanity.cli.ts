/**
 * Marks the frontend as a Sanity "app" project root and configures TypeGen.
 *
 * The Sanity CLI (v8+) resolves a project root by searching upwards for a
 * `sanity.config.*` (studio) or `sanity.cli.*` (app) file, and refuses to run
 * without one. The frontend only uses the CLI for `sanity typegen generate`.
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  typegen: {
    path: "./**/*.{ts,tsx,js,jsx}",
    schema: "../studio/schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: true,
  },
});
