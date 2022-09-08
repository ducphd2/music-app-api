import { ERROR_CODE, ERROR_MESSAGE, HTTP_STATUS_CODE, SECRET_KEY } from '@root/utils/constants'
import { logger } from '@root/utils/handleLogger'
import * as httpResponse from '@root/utils/httpResponse'
import jwt from 'jsonwebtoken'

export const getAccessToken = async (email) => {
  try {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })
  } catch (error) {
    logger.error(error)
  }
}

export const verifyToken = async (token) => {
  try {
    const email = verify(token, SECRET_KEY, (error, decoded) => (error ? error.message : decoded.email))
    if (email.error) {
      return httpResponse.failed(res, HTTP_STATUS_CODE.UNAUTHORIZED, {
        code: ERROR_CODE.UNAUTHORIZED,
        message: ERROR_MESSAGE.UNAUTHORIZED,
      })
    }
    return true
  } catch (error) {
    logger.error(error)
    throw error
  }
}
