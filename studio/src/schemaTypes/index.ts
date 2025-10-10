import {homePage} from './singletons/homePage'
import {enrollPage} from './singletons/enrollpage'
import {settings} from './singletons/settings'
import {notification} from './singletons/notification'
import {hero} from './objects/hero'
import {team} from './objects/team'
import {services} from './objects/services'
import {logo} from './objects/logo'
import {teamMember} from './objects/teamMember'
import {enrollForm} from './objects/enrollForm'
import {link} from './objects/link'
import {accordion} from './objects/accordion'
import {accordionItem} from './objects/accordionItem'
import {customImage} from './objects/image'
import {restrictedLink} from './objects/restrictedLink'
import {contact} from './objects/contact'
import {contactDetail} from './objects/contactDetail'

const singletons = [settings, notification, homePage, enrollPage]

const objects = [
  accordion,
  accordionItem,
  contact,
  contactDetail,
  customImage,
  enrollForm,
  hero,
  link,
  logo,
  restrictedLink,
  services,
  team,
  teamMember,
]

export const schemaTypes = [...singletons, ...objects]
