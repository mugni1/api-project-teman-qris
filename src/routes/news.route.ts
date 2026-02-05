import e from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'
import { createNews, deleteNews, getNews, getNewsById, updateNews } from '../controllers/news.controller.js'

const router = e.Router()
router.get('/', getNews)
router.get('/:id', getNewsById)
router.post('/', authMiddleware, superUserMiddleware, createNews)
router.put('/:id', authMiddleware, superUserMiddleware, updateNews)
router.delete('/:id', authMiddleware, superUserMiddleware, deleteNews)

export default router
