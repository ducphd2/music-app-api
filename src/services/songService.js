const Track = require('../models/Song')

// TODO: api track

let result
module.exports = {
  createTrack: async (data) => {
    result = await Track.create(data)
    return result
  },

  getTrackById: async (id) => {
    return Track.findById(id)
  },

  getAllTrack: async () => {
    return Track.find()
  },

  getFavoriteTracks: async () => {
    return Track.find({ like: { $gt: 1 } })
      .sort({ like: 'desc' })
      .limit(10)
  },

  updateLikeForTrack: async (id) => {
    const x = await Track.findById(id, { like: 8, _id: 0 })
  },

  searchByKeywords: async () => {},
}
