import mongoose from 'mongoose'
import mongooseConnection from '@root/config/mongo'
import { USER_STATUS } from '@root/utils/constants'

const User = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    activityStatus: {
      type: Number,
      default: USER_STATUS.OFFLINE,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    role: { type: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
)

User.index({ email: 1 })

export default mongooseConnection.model('User', User)
