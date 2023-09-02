import diseaseController from '../../controllers/disease.controller.js'
import { schemaValidation } from '../../schemas/middlewares/validate.request.js'
import diseaseValidator from '../../schemas/disease.schema.js'

import { Router } from 'express'

const router = Router()

router.get('/', schemaValidation(diseaseValidator.query), diseaseController.getAll)
router.get('/chapter/:chapterId', schemaValidation(diseaseValidator.paramsAndQuery), diseaseController.getByChapterId)
router.get('/four-digits-code/:fourDigitsCode', schemaValidation(diseaseValidator.paramsAndQuery), diseaseController.getByFourDigitsCode)
router.get('/keyword/:keyword', schemaValidation(diseaseValidator.paramsAndQuery), diseaseController.getByKeyword)
router.get('/interval/:attribute/:range', schemaValidation(diseaseValidator.paramsAndQuery), diseaseController.getByRange)
router.get('/three-digits-code/:threeDigitsCode', schemaValidation(diseaseValidator.paramsAndQuery), diseaseController.getByThreeDigitsCode)
router.get('/:id', schemaValidation(diseaseValidator.params), diseaseController.getById)
router.post('/', schemaValidation(diseaseValidator.strictBody), diseaseController.create)
router.put('/:id', schemaValidation(diseaseValidator.paramsAndBody), diseaseController.update)
router.delete('/:id', schemaValidation(diseaseValidator.params), diseaseController.remove)

export default router
