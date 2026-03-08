import e from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'
import { getUsers } from '../controllers/user.controller.js'

const router = e.Router()
router.get('/', authMiddleware, superUserMiddleware, getUsers)

export default router
