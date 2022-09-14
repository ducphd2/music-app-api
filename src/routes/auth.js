import { createUser, login } from '@root/controllers/userController'
import { Router } from 'express'

const router = Router()

router.post('/register', createUser)
router.post('/login', login)

module.exports = router
