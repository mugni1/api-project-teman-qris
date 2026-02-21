import e from 'express'
import { checkNickname, getProfile } from '../controllers/vip.controller.js'

const router = e.Router()
router.get('/profile', getProfile)
router.post('/nickname', checkNickname)

export default router
