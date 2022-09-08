import express from 'express'
import cors from 'cors'
import restRouter from 'express-rest-routerss'
import 'express-async-errors'
import 'dotenv/config'
import * as rTracer from 'cls-rtracer'
import { logger, middlewareLogger } from '@root/config/logger'
import { ERROR_CODE } from './utils/constants'

// Estalish new express app
const app = express()

// Enable CORS and body parser
app.use(cors(), express.json(), express.urlencoded({ extended: true }), rTracer.expressMiddleware())

// Global error handler
process.on('uncaughtException', (error) => {
  logger.error(error)
})

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  logger.error(error)
  return res.status(500).send({
    error: {
      message: 'Internal server error',
      code: ERROR_CODE.INTERNAL_SERVER_ERROR,
    },
  })
})

app.use(middlewareLogger)

// Use main routes
app.use(restRouter({ routeDir: '/routes' }))

const port = process.env.PORT || 5050
const host = process.env.HOST || 'localhost'
app.listen(port, () => {
  console.log(`Listening: http://${host}:${port}`)
})
