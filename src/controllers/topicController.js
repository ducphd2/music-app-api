import * as topicService from '@root/services/topicService'
import { RESPONSE_CODE, RESPONSE_MESSAGE, HTTP_STATUS_CODE, SUCCESS_CODE, SUCCESS_MESSAGE } from '@root/utils/constants'
import { logger } from '@root/utils/handleLogger'
import * as httpResponse from '@root/utils/httpResponse'

export const create = async (req, res) => {
  try {
    // TODO: Validate inputs
    const topic = await topicService.create(req.body)
    if (!topic) {
      logger.error('Could not create topic')
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.CREATED, {
      code: SUCCESS_CODE.CREATED,
      message: SUCCESS_MESSAGE.SUCCESS,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}

export const get = async (req, res) => {
  try {
    const topic = await topicService.getTopic()
    if (!topic) {
      logger.error('Could not get topic')
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.OK, {
      code: SUCCESS_CODE.OK,
      message: SUCCESS_MESSAGE.SUCCESS,
      topic,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}

export const getAllTopics = async (req, res) => {
  try {
    const topics = await topicService.getAllTopic()
    if (!topics) {
      logger.error('Could not get topics')
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.OK, {
      code: SUCCESS_CODE.OK,
      message: SUCCESS_MESSAGE.SUCCESS,
      topics,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}

export const update = async (req, res) => {
  try {
    const { id, dataUpdate } = req.body
    const topic = await topicService.updateTopic(id, dataUpdate)
    if (!topic) {
      logger.error('Could not update topic')
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.OK, {
      code: SUCCESS_CODE.OK,
      message: SUCCESS_MESSAGE.SUCCESS,
      topic,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.body
    const topic = await topicService.deleteTopic(id)
    if (!topic) {
      logger.error('Could not remove topic', { topic })
      return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
        code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      })
    }

    return httpResponse.ok(res, HTTP_STATUS_CODE.OK, {
      code: SUCCESS_CODE.OK,
      message: SUCCESS_MESSAGE.SUCCESS,
      topic,
    })
  } catch (error) {
    logger.error('Has error: ', { error })
    return httpResponse.failed(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}
