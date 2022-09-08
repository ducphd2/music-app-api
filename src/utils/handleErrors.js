import { HTTP_REQUEST_CONSTANTS, HTTP_ERROR_MESSAGES } from '@root/utils/constants'
import { logger } from '@root/utils/handleLogger'

export const handleRouteError = (err, req, res) => {
  logger.error('Could not perform this task!', { context: { err } })
  return res.status(500).send('Could not perform this task!')
}

export const handlePageNotFoundError = (err, req, res) => {
  logger.error('Page not found!', { context: { err } })
  return res.status(404).send({
    code: HTTP_REQUEST_CONSTANTS.NOT_FOUND,
    message: HTTP_ERROR_MESSAGES.NOT_FOUND
  })
} 
