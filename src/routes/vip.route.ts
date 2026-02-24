import e from 'express'
import { checkNickname, getPrepaidService, getProfile } from '../controllers/vip.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'

const router = e.Router()
router.get('/profile', authMiddleware, superUserMiddleware, getProfile)
router.get('/prepaid', authMiddleware, superUserMiddleware, getPrepaidService)
router.post('/nickname', checkNickname)

export default router
