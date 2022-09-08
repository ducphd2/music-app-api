const trackService = require('../services/songService')

// TODO: api song

module.exports = {
  async createTrack (req, res) {
    try {
      const track = await trackService.createTrack(req.body)
      res.status(201).json({ status: 201, message: 'success', track })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  async getTrackById (req, res) {
    try {
      const track = await trackService.getTrackById(req.params.id)
      res.status(201).json({ status: 201, message: 'success', track })
    } catch (error) {
      res.status(400).json(error)
    }
  },

  getAllTrack: async (req, res) => {
    try {
      const tracks = await trackService.getAllTrack()
      res.status(200).json({ status: 200, message: 'success', tracks })
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getFavoriteTracks: async (req, res) => {
    try {
      const tracks = await trackService.getFavoriteTracks()
      res.status(200).json({ status: 200, message: 'success', tracks })
    } catch (error) {
      res.status(500).json(error)
    }
  },

  updateLikeForTrack: async (req, res) => {
    try {
      const tracks = await trackService.updateLikeForTrack()
      res.status(200).json({ status: 200, message: 'success', tracks })
    } catch (error) {
      res.status(500).json(error)
      console.log(error)
    }
  },
}
