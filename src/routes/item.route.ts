import e from "express"
import { createItem, deleteItem, updateItem } from "../controllers/item.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { superUserMiddleware } from "../middlewares/super-user-only.middleware.js"

const router = e.Router()
router.post("/", authMiddleware, superUserMiddleware, createItem)
router.put("/:id", authMiddleware, superUserMiddleware, updateItem)
router.delete("/:id", authMiddleware, superUserMiddleware, deleteItem)

export default router