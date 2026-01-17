import e from "express"
import { createItem } from "../controllers/item.controller.js"

const router = e.Router()
router.post("/", createItem)

export default router