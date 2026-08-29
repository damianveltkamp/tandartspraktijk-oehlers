/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// The site's fixed routes. Every singleton is rendered on one of these, so
// their locations are static -- only legalPage resolves a href from a slug.
const homeLocation = {
  title: 'Startpagina',
  href: '/',
} satisfies DocumentLocation

const enrollLocation = {
  title: 'Inschrijven',
  href: '/inschrijven',
} satisfies DocumentLocation

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'Tandartspraktijk Oehlers',

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "settings" && _id == "siteSettings"`,
          },
          {
            route: '/inschrijven',
            filter: `_type == "enrollPage" && _id == "enrollPage"`,
          },
          // Matched last: `/:slug` is the frontend's catch-all legal-page
          // route, so anything the routes above did not claim is a legalPage.
          {
            route: '/:slug',
            filter: `_type == "legalPage" && slug.current == $slug || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          homePage: defineLocations({
            locations: [homeLocation],
          }),
          enrollPage: defineLocations({
            locations: [enrollLocation],
          }),
          settings: defineLocations({
            locations: [homeLocation],
            message: "Dit document wordt op alle pagina's gebruikt",
            tone: 'positive',
          }),
          notification: defineLocations({
            locations: [homeLocation],
            message: "Dit document wordt op alle pagina's gebruikt",
            tone: 'positive',
          }),
          legalPage: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => {
              // A draft without a slug yet has nowhere to point at, and an
              // entry with an empty href renders as a dead link in the
              // "Used on" panel.
              if (!doc?.slug) return {locations: []}

              return {
                locations: [
                  {
                    title: doc.title || 'Zonder titel',
                    href: `/${doc.slug}`,
                  } satisfies DocumentLocation,
                ],
              }
            },
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
})
