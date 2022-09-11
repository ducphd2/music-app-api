import { Router } from 'express'

const authRouter = require('./auth')
const songRouter = require('./song')

const route = Router()

route.use('/auth', authRouter)
route.use('/song', songRouter)

export default route
