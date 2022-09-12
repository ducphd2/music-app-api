import * as songService from '@root/services/songService'
import { ERROR_CODE, ERROR_MESSAGE, HTTP_STATUS_CODE, SUCCESS_CODE, SUCCESS_MESSAGE } from '@root/utils/constants'
import { logger } from '@root/utils/handleLogger'
import * as httpResponse from '@root/utils/httpResponse'

export const createSong = async (req, res) => {
  try {
    // TODO: Validate inputs
    const song = await songService.create(req.body)
    if (!song) {
      logger.error('Could not create song')
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: ERROR_CODE.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.CREATED, {
      code: SUCCESS_CODE.CREATED,
      message: SUCCESS_MESSAGE.SUCCESS_CREATED_SONG,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: ERROR_CODE.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}

export const getAllSong = async (req, res) => {
  try {
    const songs = await songService.getAllSong()
    if (!songs.length) {
      logger.error('Empty song')
      return httpResponse.failed(res, HTTP_STATUS_CODE.NOT_FOUND, {
        code: ERROR_CODE.EMPTY,
        message: ERROR_MESSAGE.EMPTY,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.OK, {
      code: SUCCESS_CODE.OK,
      message: SUCCESS_MESSAGE.SUCCESS,
      songs,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: ERROR_CODE.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}
