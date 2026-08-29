# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing/enrollment site for a Dutch dental practice (Tandartspraktijk Oehlers), built from the
`sanity-io/sanity-template-nextjs-clean` template. npm workspaces monorepo:

- `frontend/` — Next.js 16 App Router site (Turbopack, React 19, Tailwind v4)
- `studio/` — Sanity Studio v4 (schema + Presentation/visual-editing config)

UI copy and Studio field labels are largely Dutch; keep new user-facing text Dutch.

## Commands

Run from the repo root unless noted:

```bash
npm run dev              # both: Next.js on :3000 + Studio on :3333 (parallel)
npm run dev:next         # frontend only
npm run dev:studio       # studio only
npm run lint             # eslint (frontend workspace only; `next lint` no longer exists in Next 16)
npm run type-check       # tsc --noEmit in both workspaces
npm run format           # prettier --write .
npm run sanity-types     # extract schema.json + regenerate both sanity.types.ts
npm run import-sample-data
```

Builds: `npm run build --workspace=frontend` / `--workspace=studio`. `sanity deploy` (in `studio/`)
publishes the hosted Studio.

There is no test framework in this repo — no test runner, no test files. Verification is
`npm run type-check` + `npm run lint` + manually exercising the dev server.

## Sanity type generation

Types are generated, not hand-written, and both workspaces depend on them:

1. `studio`: `sanity schema extract --enforce-required-fields --force` → `studio/schema.json`
   (`--force` is required — the CLI refuses to overwrite an existing schema file without it)
2. `frontend`/`studio`: `sanity typegen generate` → `sanity.types.ts` (reads the `typegen` key in
   each workspace's `sanity.cli.ts`; the standalone `sanity-typegen.json` file is deprecated)

`frontend`'s `predev`/`prebuild` run `typegen` automatically, but they only re-read
`studio/schema.json` — **after editing any Studio schema you must run `npm run sanity-types` from
the root**, otherwise frontend types silently lag behind the schema. GROQ queries wrapped in
`defineQuery` get typed result aliases, and `overloadClientMethods: true` means the client returns
those types directly.

`frontend/sanity.cli.ts` exists only to give the CLI a project root: since v8 the CLI walks upwards
looking for a `sanity.config.*` or `sanity.cli.*` file and refuses to run without one, and the
frontend has no Studio config of its own. `frontend/sanity.types.ts` is generated and excluded from
linting.

## Frontend architecture

Data flows in one direction, with an explicit translation layer:

```
GROQ query (sanity/lib/queries.ts)
  → sanityFetch (sanity/lib/live.ts, defineLive)
  → adapter (adapters/objects/*.ts)   ← maps Sanity types to component props
  → feature component (features/*)    ← composed of primitives from components/*
```

- **`adapters/objects/*.ts`** — one adapter per Sanity object type. Each takes
  `Type | null | undefined` from `@/sanity.types`, returns `null` when absent, and returns the
  feature's `*Props` type. Image URLs are resolved here via `urlForImage`. Pages null-check the
  adapter result and conditionally render. When adding a CMS-driven section, add the schema object,
  regenerate types, write an adapter, then render it — do not consume raw Sanity types in components.
  Because the client has stega enabled, `sanityFetch` results come back with their strings branded as
  `StegaString`. Plain `string` fields need nothing, but a field typed as a **string-literal union**
  will not be assignable, and comparing it with `===` is unsafe at runtime — accept
  `StegaBranded<Type>` and pass the value through `stegaClean()` from `@sanity/client/stega`
  (see `adapters/objects/contact.ts`).
- **`components/`** — presentational primitives (Button, Input, Dialog, Accordion, …), mostly Radix
  wrappers. Convention: `Name/Name.tsx` plus `Name/Name.types.ts` when props are non-trivial.
- **`features/`** — page sections that own layout and compose primitives; same file convention.
- **`app/`** — only two routes: `/` (`homePage` singleton) and `/inschrijven` (`enrollPage`
  singleton). Both are Server Components that fetch, adapt, and compose.
- **Server actions** — `actions/sendEnrollmentEmail.ts` re-validates the enrollment payload with the
  same zod schema the client uses (`features/EnrollForm/validation.ts`) and sends HTML mail via
  Resend. `app/actions.ts` holds the draft-mode toggle.
- **Enrollment anti-abuse** — `sendEnrollmentEmail` takes a second `guard` argument
  (`features/EnrollForm/guard.ts`) alongside the patient payload: a honeypot field that must be
  empty, and an HMAC-signed token minted by `actions/issueFormToken.ts` when the form mounts.
  `utils/formToken.ts` verifies the signature and that the form was on screen between 3 seconds and
  an hour. All four refusal modes return the same Dutch message so a bot learns nothing, and the
  real reason goes to the log under `[enroll-abuse]`. A refusal returns `reason: "rejected"` and is
  rendered inline so the visitor keeps their form; only `reason: "failed"` replaces it. The token is
  minted on mount rather than during render because `/inschrijven` is statically prerendered.
  Note this is *not* a rate limit — see issue #10 for what is deliberately not covered.

### Visual editing / draft mode

`sanity/lib/live.ts` (`defineLive`) provides `sanityFetch` + `<SanityLive />`; the root layout mounts
`<VisualEditing />` and a draft-mode toast when `draftMode()` is enabled. Draft mode is turned on via
`app/api/draft-mode/enable/route.ts`, which the Studio's `presentationTool` points at. The client in
`sanity/lib/client.ts` has stega enabled, so fetched strings may carry encoded metadata — use
`stega: false` for values fed into metadata/`generateMetadata` (see `app/layout.tsx`).

Note the Studio's `presentationTool` `resolve` config still references template document types
(`page`, `post`) that don't exist in this project's schema — the real types are the singletons.

## Styling

Tailwind v4 with `@config "../tailwind.config.ts"` in `app/globals.css`. Design tokens
(colors, `--spacing-*`, `--text-*`, radii, keyframes) live in the `@theme inline` block in
`globals.css`; the JS config only registers a plugin adding custom utilities:

- Layout: `main-grid` / `subgrid` / `content-section` / `full-width-section` — a named-line grid
  where `content-section` centres content in a max 1220px track and `full-width-section` bleeds to
  the viewport. Page-level layout should use these rather than ad-hoc containers.
- Typography: `typography-hero-large`, `typography-headline-1..3`, `typography-body`,
  `typography-body-emphasized`, `typography-body-small`.
- Variants: `hocus:` (hover+focus), `not-last:`; plus `elevation-shadow`.

## Conventions

- ESLint (`frontend/eslint.config.mjs`) runs type-aware rules that are stricter than defaults and
  will fail the lint: `no-unnecessary-condition`, `no-non-null-assertion`,
  `consistent-type-imports` (use `import type`), `array-simple` array types. `eslint-plugin-perfectionist`
  warns on unsorted imports/exports/interfaces/object types — keep members alphabetical.
- Prettier config differs per workspace: root/`studio` use `@sanity/prettier-config` (no semicolons,
  single quotes); `frontend/prettier.config.js` uses Prettier defaults plus
  `prettier-plugin-tailwindcss`. Match the file you're in — some `frontend/sanity/lib/*` files are
  unformatted template leftovers in the studio style.
- `@/*` path alias maps to the `frontend/` root.
- `@sanity/icons` (v5+) no longer exports individual icons from the package root — import each from
  its own subpath (`import {CogIcon} from '@sanity/icons/Cog'`). The root still declares them as
  `never` for a deprecation message, so a root import type-checks and then fails at runtime.
- Studio schema files: one `defineType` export per file, registered in
  `studio/src/schemaTypes/index.ts` (`singletons` vs `objects` arrays). Singletons must also be wired
  into `studio/src/structure/index.ts` — add the type to `DISABLED_TYPES` so it doesn't appear as a
  regular list, then add an explicit `S.listItem()` with a fixed `documentId`.

## Dependency pins

`package.json` (root) pins `@sanity/sdk-react` to `2.19.0` via `overrides`. `sanity@6` depends on
`^2.19.0`, but `2.20.0` ships un-transpiled JSX in `dist/index.js`, which Vite 8's dependency
optimizer rejects — it breaks both `sanity dev` and `sanity schema extract`. Re-check whether a later
release fixes this before removing the pin, and note that npm may need `rm -rf node_modules
package-lock.json && npm install` to actually apply a changed override.

Sanity 6 requires Node `>=22.12`. Studio v6 also enables React strict mode in dev by default
(`reactStrictMode: false` in `sanity.cli.ts` opts out).

## Environment variables

`frontend/.env.local` (see `.env.example`): `NEXT_PUBLIC_SANITY_PROJECT_ID`,
`NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SANITY_STUDIO_URL`,
`SANITY_API_READ_TOKEN` (required — `sanity/lib/token.ts` throws without it). The enrollment form
additionally needs `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL`
(`actions/sendEnrollmentEmail.ts` throws without the latter two), plus `ENROLL_FORM_SECRET`
(`utils/formToken.ts` throws without it, so the enrollment form is unusable until it is set —
generate one with `openssl rand -hex 32`). `RESEND_TO_EMAIL` is
comma-separated — the action splits/trims it into Resend's `to` array, so multiple practice
mailboxes need no code change. And `app/sitemap.ts` reads
`NEXT_PUBLIC_BASE_URL` — with no fallback, so the generated sitemap URLs are relative without it.

`studio/.env.local`: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`,
`SANITY_STUDIO_PREVIEW_URL`, `SANITY_STUDIO_STUDIO_HOST`.
