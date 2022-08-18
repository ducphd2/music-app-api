const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection

db.on('connected', function () {
  console.log(`Successfully connected to the database ${this.name}`)
})

db.on('disconnected', function () {
  console.log(`Disconnect from the database:: ${this.name}`)
})

db.on('error', (error) => {
  console.log(`Error when trying to connect to the database:: ${JSON.stringify(error)}`)
})

process.on('SIGINT', async () => {
  await db.close()
  process.exit(0)
})

module.exports = db
