import { HTTP_STATUS_CODE, RESPONSE_CODE, RESPONSE_MESSAGE } from '@root/utils/constants'
import { Router } from 'express'

const authRouter = require('./auth')
const songRouter = require('./song')

const route = Router()

route.use('/auth', authRouter)
route.use('/song', songRouter)

// Capture 404 errors
app.use((req, res) => {
  logger.error('Page not found')
  res.status(404).send('Page not found')
})

route.use('*', (req, res) =>
  httpResponse.failed(res, HTTP_STATUS_CODE.NOT_FOUND, {
    code: RESPONSE_CODE.NOT_FOUND,
    message: RESPONSE_MESSAGE.NOT_FOUND,
  })
)

export default route
