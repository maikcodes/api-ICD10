import { DiseaseController } from '../../../../controllers/disease.controller.js'
import { schemaValidation } from '../../../../schemas/middlewares/validate.request.js'
import diseaseValidator from '../../../../schemas/disease.schema.js'

export async function register (router) {
  router.get(
    '/chapter/:chapterId',
    schemaValidation(diseaseValidator.paramsAndQuery),
    DiseaseController.getByChapterId
  )
  router.get(
    '/four-digits-code/:fourDigitsCode',
    schemaValidation(diseaseValidator.paramsAndQuery),
    DiseaseController.getByFourDigitsCode
  )
  router.get(
    '/keyword/:keyword',
    schemaValidation(diseaseValidator.paramsAndQuery),
    DiseaseController.getByKeyword
  )
  router.get(
    '/interval/:attribute/:range',
    schemaValidation(diseaseValidator.paramsAndQuery),
    DiseaseController.getByRange
  )
  router.get(
    '/three-digits-code/:threeDigitsCode',
    schemaValidation(diseaseValidator.paramsAndQuery),
    DiseaseController.getByThreeDigitsCode
  )
}
