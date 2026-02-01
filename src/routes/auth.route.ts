import e from 'express'
import { googleCallback, googleRedirect, loginController, registerController } from '../controllers/auth.controller.js'

const router = e.Router()
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/google', googleRedirect)
router.get('/google/callback', googleCallback)

export default router
