import * as userService from '@root/services/userService'
import { getUserByFilter } from '@root/services/userService'
import { ERROR_CODE, ERROR_MESSAGE, HTTP_STATUS_CODE, SUCCESS_CODE, SUCCESS_MESSAGE } from '@root/utils/constants'
import { getAccessToken } from '@root/utils/handleJwt'
import { logger } from '@root/utils/handleLogger'
import * as httpResponse from '@root/utils/httpResponse'
import { getHashedPassword, verifyPassword } from '@root/utils/passwordUtils'
import { isValidEmail, isValidPassword } from '@root/utils/validatorsUtils'

export const createUser = async (req, res) => {
  try {
    const { email, password, fullName } = req.body

    if (!isValidEmail(email)) {
      logger.error('Invalid email', { email })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: ERROR_CODE.INVALID_INPUT,
        message: ERROR_MESSAGE.INVALID_INPUT,
      })
    }

    if (!isValidPassword(password)) {
      logger.error('Invalid password', { password })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: ERROR_CODE.INVALID_INPUT,
        message: ERROR_MESSAGE.INVALID_INPUT,
      })
    }

    const isExistUser = await getUserByFilter({ email })
    if (isExistUser) {
      logger.error('User is already exists', { email })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: ERROR_CODE.EXIST_USER,
        message: ERROR_MESSAGE.EXIST_USER,
      })
    }

    // TODO: Check locked user / status of the user

    const hashedPassword = await getHashedPassword(password)
    const createData = { email, fullName, password: hashedPassword }

    const user = await userService.create(createData)

    if (!user) {
      logger.error('Could not create user')
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: ERROR_CODE.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.CREATED, {
      code: SUCCESS_CODE.CREATED,
      message: SUCCESS_MESSAGE.SUCCESS_CREATED_USER,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: ERROR_CODE.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!isValidEmail(email)) {
      logger.error('Invalid email', { email })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: ERROR_CODE.INVALID_INPUT,
        message: ERROR_MESSAGE.INVALID_INPUT,
      })
    }

    if (!isValidPassword(password)) {
      logger.error('Invalid password', { password })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: ERROR_CODE.INVALID_INPUT,
        message: ERROR_MESSAGE.INVALID_INPUT,
      })
    }

    const user = await getUserByFilter({ email })
    if (!user) {
      logger.error('User is not exists', { email })
      return httpResponse.failed(res, HTTP_STATUS_CODE.UNAUTHORIZED, {
        code: ERROR_CODE.UNAUTHORIZED,
        message: ERROR_MESSAGE.UNAUTHORIZED,
      })
    }

    const isSamePassword = await verifyPassword(user.password, password)
    if (!isSamePassword) {
      logger.error('Do not match password', { password })
      return httpResponse.failed(res, HTTP_STATUS_CODE.UNAUTHORIZED, {
        code: ERROR_CODE.UNAUTHORIZED,
        message: ERROR_MESSAGE.UNAUTHORIZED,
      })
    }
    const accessToken = await getAccessToken(email)
    if (!accessToken) {
      logger.error('Can not generate access token', { accessToken })
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: ERROR_CODE.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.OK, {
      code: SUCCESS_CODE.OK,
      message: SUCCESS_MESSAGE.LOGGED_IN,
      token: accessToken,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: ERROR_CODE.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}
