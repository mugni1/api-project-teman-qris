import e from "express"
import { createItem } from "../controllers/item.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { superUserMiddleware } from "../middlewares/super-user-only.middleware.js"

const router = e.Router()
router.post("/", authMiddleware, superUserMiddleware, createItem)

export default router