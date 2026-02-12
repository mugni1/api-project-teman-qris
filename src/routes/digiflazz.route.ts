import e from 'express'
import { checkSaldo, priceList, transaction } from '../controllers/digiflazz.controller.js'

const router = e.Router()
router.get('/check-saldo', checkSaldo)
router.get('/price-list', priceList)
router.get('/transaction', transaction)

export default router
