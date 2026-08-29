# Seed content

## The legal pages

`privacyverklaring.json` and `algemene-voorwaarden.json` are the two
`legalPage` documents the site hard-links to. Both carry **placeholder** Dutch
copy -- the real wording is the practice's to write in the Studio.

They exist as a seed rather than as code because the frontend links to those two
slugs from the footer and from the enrollment form's terms checkbox, so a
dataset without them serves a 404 on both links.

Import them once per dataset, from the `studio/` directory. The CLI takes one
file per invocation:

```bash
npx sanity documents create seed/privacyverklaring.json --replace
npx sanity documents create seed/algemene-voorwaarden.json --replace
```

`--replace` makes the command idempotent. Use `--missing` instead if you would
rather leave copy someone has already edited untouched.

Forgetting this step is caught rather than shipped: the frontend's `prebuild`
runs `scripts/check-legal-pages.ts`, which fails the build when either slug is
missing from the dataset it is building against.
