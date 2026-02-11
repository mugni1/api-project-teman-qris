import e from 'express'
import { checkSaldo, priceList } from '../controllers/digiflazz.controller.js'

const router = e.Router()
router.get('/check-saldo', checkSaldo)
router.get('/price-list', priceList)

export default router
