import { createSong, getAllSong } from '@root/controllers/songController'
import { auth } from '@root/middleware/auth'
import { Router } from 'express'

const router = Router()

router.use(auth)

router.get('/', getAllSong)
router.post('/', createSong)

module.exports = router
