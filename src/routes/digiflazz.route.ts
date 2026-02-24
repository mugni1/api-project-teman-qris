import e from 'express'
import { checkSaldo, priceList, transaction } from '../controllers/digiflazz.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'

const router = e.Router()
router.get('/check-saldo', authMiddleware, superUserMiddleware, checkSaldo)
router.get('/price-list', authMiddleware, superUserMiddleware, priceList)
router.get('/transaction', authMiddleware, superUserMiddleware, transaction)

export default router
