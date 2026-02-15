import e from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/category.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { superUserMiddleware } from '../middlewares/super-user-only.middleware.js'

const router = e.Router()
router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', authMiddleware, superUserMiddleware, createCategory)
router.put('/:id', authMiddleware, superUserMiddleware, updateCategory)
router.delete('/:id', authMiddleware, superUserMiddleware, deleteCategory)

export default router
