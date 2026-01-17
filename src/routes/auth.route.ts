import e from "express"
import { registerController } from "../controllers/auth.controller.js"

const router = e.Router()
router.post("/register", registerController)

export default router