import { Router } from 'express'
const router = Router()

import checkAuth from '../middleware/checkAuth'

// import { getTrackById, getAllTrack, getFavoriteTracks, createTrack, updateLikeForTrack, searchByKeywords } from '../controllers/track.controller'

router.use(checkAuth)

router.get('/:id', getTrackById)
router.get('/', getAllTrack)
router.get('/favoriteTracks', getFavoriteTracks)
router.post('/', createTrack)
router.patch('/updateLikeForTrack', updateLikeForTrack)
router.post('/searchByKeywords', searchByKeywords)

export default router
