const Track = require("../models/track.model");

// TODO: api track

module.exports = {
  createTrack: async (data) => {
    return await Track.create(data);
  },

  getTrackById: async (id) => {
    return await Track.findById(id);
  },

  getAllTrack: async () => {
    return await Track.find();
  },

  getFavoriteTracks: async () => {
    return await Track.find({ like: { $gt: 1 } })
      .sort({ like: "desc" })
      .limit(10);
  },

  updateLikeForTrack: async (id) => {
    const x = await Track.findById(id, { like: 8, _id: 0 });

    await Track.findByIdAndUpdate(id, {
      $set: {
        like: (
          parseInt(Object.values(Object.values(x)[2])[0]) +
          parseInt(req.body.like)
        ).toString(),
      },
    });

    console.log(error);
  },

  searchByKeywords: async () => {},
};
