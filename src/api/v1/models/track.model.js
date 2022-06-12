const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    artists: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    like: {
      type: String,
      trim: true,
    },
    album_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
    playlist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
    genre_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
