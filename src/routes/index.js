import { logger } from '@root/utils/handleLogger'
import { Router } from 'express'
import { readdir } from 'fs'

const route = Router()

const PATH_ROUTES = __dirname

readdir(PATH_ROUTES, (err, files) => {
  if (err) logger.error('An error has occurred, can not read these file: ', { err })
  files
    .filter((file) => file !== 'index.js')
    .forEach((file) => {
      const fileName = file.split('.')[0]
      // eslint-disable-next-line import/no-dynamic-require, global-require
      route.use(`/${fileName}`, require(`./${fileName}`))
    })
})

export default route
