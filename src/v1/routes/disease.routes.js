import diseaseController from '../../controllers/disease.controller.js'

import { Router } from 'express'

const router = Router()

router.get('/', diseaseController.getAll)
router.get('/chapter/:chapterId', diseaseController.getByChapterId)
router.get('/:id', diseaseController.getById)
router.post('/', diseaseController.create)
router.put('/:id', diseaseController.update)
router.delete('/:id', diseaseController.remove)

export default router
