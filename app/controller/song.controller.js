const mongoose = require('mongoose')
const Song = require('../models/song.model')

module.exports = {
  createSong: async (req, res) => {
    const {
      name_song,
      album_id,
      title,
      artists,
      thumbnail,
      playlist_id,
      category_id,
      link,
      like,
    } = req.body

    try {
      const items = new Song({
        name_song,
        title,
        artists,
        thumbnail,
        link,
        album_id,
        playlist_id,
        category_id,
        like,
      })

      items.save()

      res.status(200).json({ msg: 'success', items })
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllSong: async (req, res) => {
    try {
      let songs = await Song.find()
      res.status(200).json(songs)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getMostLikeSong: async (req, res) => {
    try {
      let songsLike = await Song.find({ like: { $gt: 1 } }).limit(5)
      res.status(200).json(songsLike)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  updateLikeForSong: async (req, res) => {
    try {
      var x = await Song.findById({ _id: req.body._id }, { like: 8, _id: 0 })

      await Song.findByIdAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            like: (
              parseInt(Object.values(Object.values(x)[2])[0]) +
              parseInt(req.body.like)
            ).toString(),
          },
        }
      )
      res.status(200).json('Update like success')
    } catch (error) {
      res.status(500).json(error)
      console.log(error)
    }
  },

  searchByKeywords: async (req, res) => {
    try {
      // let text =  await Object.values(req.query)[0]
      await Song.createIndexes({ name_song: 'text' })

      let search = await Song.find({
        $text: { $search: req.body.name_song },
      })

      res.status(200).json(search)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  searchByKeywords: async (req, res) => {
    try {
      // let text =  await Object.values(req.query)[0]
      await Song.createIndexes({ name_song: 'text' })

      let search = await Song.find({
        $text: { $search: req.body.name_song },
      })

      res.status(200).json(search)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getSongByCategory: async (req, res) => {
    try {
      const objId = new mongoose.Types.ObjectId(req.params.id)
      const songs = await Song.find({ category_id: objId  })
      if (!songs) {
        console.log('Can not get song')
        return res.status(500).json(error)
      }

      return res.status(200).json(songs)
    } catch (error) {
      res.status(500).json(error)
    }
  },
}
