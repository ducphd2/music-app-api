const { handleHTTPError } = require('../utils/handleErrors')
const { verifyToken } = require('../utils/handleJwt')

/**
 * Protect access to specified routes
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHTTPError(res, 'NEED_SESSION', 401)
      return
    }

    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (!dataToken) {
      handleHTTPError(res, 'NOT_PAYLOAD_DATA', 401)
      return
    }
    next()
  } catch (error) {
    handleHTTPError(res, error.message, 401) // 401: Unauthorized
  }
}

module.exports = authMiddleware
