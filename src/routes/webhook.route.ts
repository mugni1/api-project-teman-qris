import e from 'express'
import { handleWebhook, handleWebhookVip } from '../controllers/webhook.controller.js'

const router = e.Router()
router.post('/', handleWebhook)
router.post('/vip', handleWebhookVip)

export default router
