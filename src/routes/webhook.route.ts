import e from "express"
import { handleWebhook } from "../controllers/webhook.controller.js"

const router = e.Router()
router.post("/", handleWebhook)

export default router