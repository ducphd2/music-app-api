import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import route from '@root/routes'
import { logger } from '@root/utils/handleLogger'

const app = express()

const isProduction = process.env.NODE_ENV === 'production'

app.use(helmet(), cors(), express.json(), express.urlencoded({ extended: true }))
app.use(isProduction ? morgan('combined') : morgan('dev'))

app.use('/api', route)

// Global error handler
process.on('uncaughtException', (error) => {
  logger.error(error)
})

const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'
app.listen(port, () => {
  console.log(`Listening: http://${host}:${port}`)
})
