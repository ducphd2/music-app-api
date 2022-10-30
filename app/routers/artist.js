const express = require('express')
const router = express.Router()

router.get('/', getAllSong)
router.post('/createSong', createSong)
router.get('/getMostLikeSong', getMostLikeSong)
router.patch('/updateLikeForSong', updateLikeForSong)
router.post('/searchByKeywords', searchByKeywords)
router.get('/getSongByCategory/:id', getSongByCategory)

module.exports = router
