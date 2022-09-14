import { RESPONSE_CODE, RESPONSE_MESSAGE, HTTP_STATUS_CODE } from '@root/utils/constants'
import { verifyToken } from '@root/utils/handleJwt'
import { logger } from '@root/utils/handleLogger'
import * as httpResponse from '@root/utils/httpResponse'

// eslint-disable-next-line consistent-return
const verifySession = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      logger.error('Empty access token', { token })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: RESPONSE_CODE.UNAUTHORIZED,
        message: RESPONSE_MESSAGE.UNAUTHORIZED,
      })
    }

    const isValidAccessToken = await verifyToken(token)
    if (!isValidAccessToken) {
      logger.error('Invalid access token', { token })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: RESPONSE_CODE.UNAUTHORIZED,
        message: RESPONSE_MESSAGE.UNAUTHORIZED,
      })
    }
    return next()
  } catch (error) {
    logger.error(error)
  }
}

export const auth = (req, res, next) => verifySession(req, res, next)
