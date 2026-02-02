import e from 'express'
import { createOrder, getOrderById, getOrders, updateOrderByTrxId } from '../controllers/order.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = e.Router()
router.post('/', authMiddleware, createOrder)
router.get('/:id', authMiddleware, getOrderById)
router.put('/:id', authMiddleware, updateOrderByTrxId)
router.get('/', authMiddleware, getOrders)

export default router
