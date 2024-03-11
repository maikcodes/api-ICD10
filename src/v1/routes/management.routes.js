import { DiseaseController } from '../../controllers/disease.controller.js'
import { schemaValidation } from '../../schemas/middlewares/validate.request.js'
import diseaseValidator from '../../schemas/disease.schema.js'

export async function register (router) {
  router.get(
    '/',
    schemaValidation(diseaseValidator.query),
    DiseaseController.getAll
  )
  router.get(
    '/:id',
    schemaValidation(diseaseValidator.params),
    DiseaseController.getById
  )
  router.post(
    '/',
    schemaValidation(diseaseValidator.strictBody),
    DiseaseController.create
  )
  router.put(
    '/:id',
    schemaValidation(diseaseValidator.paramsAndBody),
    DiseaseController.update
  )
  router.delete(
    '/:id',
    schemaValidation(diseaseValidator.params),
    DiseaseController.remove
  )
}
