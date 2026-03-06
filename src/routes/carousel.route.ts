import e from 'express'
import { createCarousel, deleteCarousel, getCarousels, updateCarousel } from '../controllers/carousel.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'

const router = e.Router()
router.get('/', getCarousels)
router.post('/', authMiddleware, superUserMiddleware, createCarousel)
router.put('/:id', authMiddleware, superUserMiddleware, updateCarousel)
router.delete('/:id', authMiddleware, superUserMiddleware, deleteCarousel)

export default router
