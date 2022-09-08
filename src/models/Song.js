import mongoose from 'mongoose'
import mongooseConnection from '@root/config/mongo'

const Song = new mongoose.Schema(
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
      ref: 'Artist',
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },
    playlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
    },
  },
  {timestamps: true}
)

Song.index({name: 1, genreId: 1, playlistId: 1, albumId: 1})

export default mongooseConnection.model('Song', Song)

