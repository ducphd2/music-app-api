import * as userService from '@root/services/userService'
import { getUserByFilter } from '@root/services/userService'
import { RESPONSE_CODE, RESPONSE_MESSAGE, HTTP_STATUS_CODE } from '@root/utils/constants'
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
        code: RESPONSE_CODE.INVALID_INPUT,
        message: RESPONSE_MESSAGE.INVALID_INPUT,
      })
    }

    if (!isValidPassword(password)) {
      logger.error('Invalid password', { password })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: RESPONSE_CODE.INVALID_INPUT,
        message: RESPONSE_MESSAGE.INVALID_INPUT,
      })
    }

    const isExistUser = await getUserByFilter({ email })
    if (isExistUser) {
      logger.error('User is already exists', { email })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: RESPONSE_CODE.USER_ALREADY_EXIST,
        message: RESPONSE_MESSAGE.USER_ALREADY_EXIST,
      })
    }

    // TODO: Check locked user / status of the user

    const hashedPassword = await getHashedPassword(password)
    const createData = { email, fullName, password: hashedPassword }

    const user = await userService.create(createData)

    if (!user) {
      logger.error('Could not create user')
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.CREATED, {
      code: RESPONSE_CODE.CREATED,
      message: RESPONSE_MESSAGE.SUCCESS,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!isValidEmail(email)) {
      logger.error('Invalid email', { email })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: RESPONSE_CODE.INVALID_INPUT,
        message: RESPONSE_MESSAGE.INVALID_INPUT,
      })
    }

    if (!isValidPassword(password)) {
      logger.error('Invalid password', { password })
      return httpResponse.failed(res, HTTP_STATUS_CODE.BAD_REQUEST, {
        code: RESPONSE_CODE.INVALID_INPUT,
        message: RESPONSE_MESSAGE.INVALID_INPUT,
      })
    }

    const user = await getUserByFilter({ email })
    if (!user) {
      logger.error('User is not exists', { email })
      return httpResponse.failed(res, HTTP_STATUS_CODE.UNAUTHORIZED, {
        code: RESPONSE_CODE.UNAUTHORIZED,
        message: RESPONSE_MESSAGE.UNAUTHORIZED,
      })
    }

    const isSamePassword = await verifyPassword(user.password, password)
    if (!isSamePassword) {
      logger.error('Do not match password', { password })
      return httpResponse.failed(res, HTTP_STATUS_CODE.UNAUTHORIZED, {
        code: RESPONSE_CODE.UNAUTHORIZED,
        message: RESPONSE_MESSAGE.UNAUTHORIZED,
      })
    }

    const accessToken = await getAccessToken(email)
    if (!accessToken) {
      logger.error('Can not generate access token', { accessToken })
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.OK, {
      code: RESPONSE_CODE.OK,
      message: RESPONSE_MESSAGE.LOGGED_IN,
      token: accessToken,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}
