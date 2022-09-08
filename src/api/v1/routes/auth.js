import { Router } from 'express'
const router = Router()

import { createUser, login } from '../controllers/user.controller'
/**
 * TODO: /auth/register
 */
router.post('/register', createUser)

/**
 * TODO: /auth/login
 */
router.post('/login', login)
export default router
