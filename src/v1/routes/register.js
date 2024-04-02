import { register as QueryRoutesRegister } from './query/query.routes.js'
import { register as ManagementRoutesRegister } from './management/management.routes.js'
import { register as DocRoutesRegister } from './doc/doc.routes.js'

export function registerRoutes (router) {
  ManagementRoutesRegister(router)
  QueryRoutesRegister(router)
}

export function registerDocRoutes (router) {
  DocRoutesRegister(router)
}
