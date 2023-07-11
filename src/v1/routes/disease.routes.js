import diseaseController from '../../controllers/disease.controller.js'

import { Router } from 'express'

const router = Router()

router.get('/', diseaseController.getAll)
router.get('/chapter/:chapterId', diseaseController.getByChapterId)
router.get('/four-digits-code/:digitsCode', diseaseController.getByFourDigitsCode)
router.get('/keyword/:keyword', diseaseController.getByKeyword)
router.get('/range/:range', diseaseController.getByRange)
router.get('/three-digits-code/:digitsCode', diseaseController.getByThreeDigitsCode)
router.get('/:id', diseaseController.getById)
router.post('/', diseaseController.create)
router.put('/:id', diseaseController.update)
router.delete('/:id', diseaseController.remove)

export default router
