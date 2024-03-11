import { register as QueryRoutesRegister } from './query.routes.js'
import { register as ManagementRoutesRegister } from './management.routes.js'

export function registerRoutes (router) {
  ManagementRoutesRegister(router)
  QueryRoutesRegister(router)
}
