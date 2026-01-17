import e from "express"
import { loginController, registerController } from "../controllers/auth.controller.js"

const router = e.Router()
router.post("/register", registerController)
router.post("/login", loginController)

export default router