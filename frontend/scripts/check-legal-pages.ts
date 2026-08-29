/**
 * Fails the build when a legal page the site hard-links to is missing from the
 * dataset.
 *
 * `legalPage` is a repeatable document type whose URL lives in an editor-owned
 * `slug` field, so nothing in the type system ties `LEGAL_PAGES` to documents
 * that actually exist. The footer renders in the root layout, so a dataset
 * without those two documents -- a forgotten `studio/seed` import, or a slug
 * renamed despite the warning on the field -- puts a 404 link on every page of
 * the site. This turns that into a build failure instead.
 *
 * A Sanity outage is deliberately *not* a failure: it says nothing about the
 * content, and `next build` will fail on its own if the API is unreachable.
 */
import { createClient } from "@sanity/client";
import type * as NextEnv from "@next/env";
import { createRequire } from "node:module";

import { LEGAL_PAGES } from "../constants/legal";

// Before importing anything that reads env at module load: a plain Node script
// gets none of the `.env.local` handling `next build` does for itself.
// `@next/env` is a CommonJS bundle whose named exports an ES module cannot
// see, hence `createRequire` rather than a plain import. It is used in place
// of `process.loadEnvFile` so this resolves env exactly the way `next build`
// does -- including the .env cascade, and CI where the vars come from the
// environment and no .env file exists.
const { loadEnvConfig } = createRequire(import.meta.url)(
  "@next/env",
) as typeof NextEnv;

loadEnvConfig(process.cwd());

const { apiVersion, dataset, projectId } = await import("../sanity/lib/api");

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});

const requiredSlugs = Object.values(LEGAL_PAGES).map(({ href }) =>
  href.replace(/^\//, ""),
);

let publishedSlugs: string[];

try {
  publishedSlugs = await client.fetch<string[]>(
    `*[_type == "legalPage" && defined(slug.current)].slug.current`,
  );
} catch (error) {
  console.warn(
    "[check-legal-pages] Kon de dataset niet bereiken; controle overgeslagen.",
    error,
  );
  process.exit(0);
}

const missing = requiredSlugs.filter((slug) => !publishedSlugs.includes(slug));

if (missing.length > 0) {
  console.error(
    `[check-legal-pages] Ontbrekende juridische pagina's in dataset "${dataset}": ${missing.join(", ")}.\n` +
      `De footer en het inschrijfformulier linken hiernaar, dus zonder deze documenten staat er op elke pagina een dode link.\n` +
      `Importeer ze vanuit studio/: npx sanity documents create seed/<slug>.json --replace`,
  );
  process.exit(1);
}

console.log(
  `[check-legal-pages] OK -- ${requiredSlugs.length} juridische pagina's aanwezig in dataset "${dataset}".`,
);
