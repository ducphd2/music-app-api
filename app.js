import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import 'dotenv/config'

import { logger } from '@root/api/v1/utils/handleLogger'
import route from '@root/api/v1/routes'

const app = express()

const isProduction = process.env.NODE_ENV === 'production'

app.use(isProduction ? morgan('combined') : morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(json(), urlencoded({ extended: true }))

app.use('/api/v1', route)

app.get('/', (req, res, next) => {
  res.json({
    message: 'Hello from Music API',
  })
})

// Capture 500 errors
app.use((err, req, res, next) => {
  res.status(500).send('Could not perform this task!')
  logger.error('Could not perform this task!', { context: { err } })
})

// Capture 404 errors
app.use((req, res, next) => {
  res.status(404).send('PAGE NOT FOUND')
  logger.error('Page not found!', { context: { err } })
})
