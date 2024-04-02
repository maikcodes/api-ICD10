import { glob } from 'glob'
import path from 'path'
import { apiDocSetup } from '../../../doc/swagger.js'
import { fileURLToPath } from 'url'

const rawDirnamePath = fileURLToPath(new URL('.', import.meta.url))
const resolvedDirnamePath = path.resolve(rawDirnamePath)
const __dirname = path.dirname(resolvedDirnamePath)

const templatePath = path
  .join(__dirname, '*/*.doc.yaml')
  .split(path.sep)
  .join('/')

const routes = glob.sync(templatePath)

const { serve, setup } = apiDocSetup(routes)

export const register = async (router) => {
  router.use('/v1', serve)
  router.get('/v1', setup)
}
