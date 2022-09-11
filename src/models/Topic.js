import mongooseConnection from '@root/config/mongo'
import mongoose from 'mongoose'

const Topic = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

Topic.index({ name: 1 })

export default mongooseConnection.model('Topic', Topic)
