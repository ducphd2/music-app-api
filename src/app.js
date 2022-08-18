const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const logger = require('./api/v1/helpers/handleLogger')
require('dotenv').config()

const app = express()
const route = require('./api/v1/routes')

const isProduction = process.env.NODE_ENV === 'production'

app.use(isProduction ? morgan('combined') : morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(express.json(), express.urlencoded({ extended: true }))

app.use('/api/v1', route)

app.get('/', (req, res, next) => {
  res.json({
    message: 'Hello from Music API',
  })
})

// Capture 500 errors
app.use((err, req, res, next) => {
  res.status(500).send('Could not perform this task!')
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  )
})

// Capture 404 errors
app.use((req, res, next) => {
  res.status(404).send('PAGE NOT FOUND')
  logger.error(`${res.statusMessage} || 404 - ${req.originalUrl} - ${req.method} - ${req.ip}`)
})

module.exports = app
