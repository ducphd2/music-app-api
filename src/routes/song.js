import { Router } from 'express'
import {
  createTrack,
  getAllTrack,
  getFavoriteTracks,
  getTrackById,
  updateLikeForTrack,
} from '@root/controllers/songController'
// import { authMiddleware } from '@root/middleware/checkAuth'

const router = Router()

// router.use(authMiddleware)

router.get('/:id', getTrackById)
router.get('/', getAllTrack)
router.get('/favoriteTracks', getFavoriteTracks)
router.post('/', createTrack)
router.patch('/updateLikeForTrack', updateLikeForTrack)

module.exports = router
