import e from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { upload } from '../controllers/upload.controller.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'

const router = e.Router()
router.post('/', authMiddleware, superUserMiddleware, upload)

export default router
