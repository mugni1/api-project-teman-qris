import e from 'express'
import {
  googleCallback,
  googleRedirect,
  loginController,
  me,
  registerController,
} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = e.Router()
router.get('/me', authMiddleware, me)
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/google', googleRedirect)
router.get('/google/callback', googleCallback)

export default router
