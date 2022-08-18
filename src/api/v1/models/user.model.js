const mongoose = require('mongoose')
const db = require('../../../config/database.config')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim: true,
    },
    bio: {
      type: String,
      default: '',
      trim: true,
      maxLength: 250,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxLength: 40,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    profilePicture: {
      type: String,
      default: 'person.png',
    },
    activityStatus: {
      type: String,
      default: 'offline',
    },
    activated: {
      type: Boolean,
    },
    role: { type: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
)

userSchema.index({ email: 1 }, { partialFilterExpression: { email: { $exists: true } } })

module.exports = db.model('User', userSchema)
