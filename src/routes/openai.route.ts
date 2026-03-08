import e from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'
import { generateNews } from '../controllers/openai.controller.js'

const router = e.Router()
router.post('/news', authMiddleware, superUserMiddleware, generateNews)

export default router
