import { create, get, getAllTopics, remove, update } from '@root/controllers/topicController'
import { auth } from '@root/middleware/auth'
import { Router } from 'express'

const router = Router()

router.use(auth)

router.get('/', getAllTopics)
router.get('/:id', get)
router.post('/', create)
router.delete('/:id', remove)
router.patch('/:id', update)

module.exports = router
