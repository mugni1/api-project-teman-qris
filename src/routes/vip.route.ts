import e from 'express'
import { checkNickname, getPrepaidService, getProfile } from '../controllers/vip.controller.js'

const router = e.Router()
router.get('/profile', getProfile)
router.get('/prepaid', getPrepaidService)
router.post('/nickname', checkNickname)

export default router
