const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to DB')
  } catch (error) {
    console.error('Can not connect to DB', { error })
    process.exit(1)
  }
}

module.exports = connectDB
