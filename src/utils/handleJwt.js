import { SECRET_KEY } from '@root/utils/constants'
import { logger } from '@root/utils/handleLogger'
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
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    logger.error('Could not verify access token', { error })
    return false
  }
}
