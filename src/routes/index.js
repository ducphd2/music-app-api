import { ERROR_CODE, ERROR_MESSAGE, HTTP_STATUS_CODE } from '@root/utils/constants'
import { Router } from 'express'

const authRouter = require('./auth')
const songRouter = require('./song')

const route = Router()

route.use('/auth', authRouter)
route.use('/song', songRouter)

route.use('*', (req, res) =>
  httpResponse.failed(res, HTTP_STATUS_CODE.NOT_FOUND, {
    code: ERROR_CODE.NOT_FOUND,
    message: ERROR_MESSAGE.NOT_FOUND,
  })
)

export default route
