import e from "express"
import { sayHello } from "../controllers/index.controller.js"

const router = e.Router()
router.get("/", sayHello)

export default router