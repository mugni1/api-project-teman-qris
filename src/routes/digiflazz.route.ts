import e from 'express'
import { checkSaldo } from '../controllers/digiflazz.controller.js'

const router = e.Router()
router.get('/check-saldo', checkSaldo)

export default router
