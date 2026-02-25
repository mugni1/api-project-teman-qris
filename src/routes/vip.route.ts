import e from 'express'
import { checkNickname, getPrepaidService, getPrepaidTransaction, getProfile } from '../controllers/vip.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'

const router = e.Router()
router.get('/profile', authMiddleware, superUserMiddleware, getProfile)
router.get('/prepaid/service', authMiddleware, superUserMiddleware, getPrepaidService)
router.get('/prepaid/transaction', authMiddleware, superUserMiddleware, getPrepaidTransaction)
router.post('/nickname', checkNickname)

export default router
