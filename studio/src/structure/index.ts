import {CogIcon} from '@sanity/icons/Cog'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */
const DISABLED_TYPES = [
  'settings',
  'assist.instruction.context',
  'homePage',
  'enrollPage',
  'notification',
  // Listed explicitly further down so the Dutch plural reads correctly --
  // `pluralize-esm` only knows English.
  'legalPage',
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Startpagina')
        .child(S.document().schemaType('homePage').documentId('homePage'))
        .icon(DocumentIcon),
      S.listItem()
        .title('Inschrijfpagina')
        .child(S.document().schemaType('enrollPage').documentId('enrollPage'))
        .icon(DocumentIcon),
      S.listItem()
        .title("Juridische pagina's")
        .child(S.documentTypeList('legalPage').title("Juridische pagina's"))
        .icon(DocumentTextIcon),
      S.listItem()
        .title('Notification')
        .child(S.document().schemaType('notification').documentId('notification'))
        .icon(CogIcon),
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
