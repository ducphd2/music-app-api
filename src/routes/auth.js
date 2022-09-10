import { Router } from 'express'
import { createUser, login } from '@root/controllers/userController'

const router = Router()

router.post('/register', createUser)
router.post('/login', login)

module.exports = router
