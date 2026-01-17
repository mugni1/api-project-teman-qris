import { Request, Response } from "express"
import { response } from "../utils/response.js"
import { registerEmailExistService, registerService } from "../services/auth.service.js"
import { registerSchema } from "../schema/auth.schema.js"
import { hashedPassword } from "../utils/bcrypt.js"

export const registerController = async (req: Request, res: Response) => {
    const body = req.body
    if (!body) {
        return response({ res, status: 400, message: "Invalid input" })
    }
    const { data, success, error } = registerSchema.safeParse(body)
    if (!success) {
        const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
        return response({ res, status: 400, message: "Invalid input", errors })
    }
    try {
        data.password = hashedPassword(data.password)
        data.fullname = `${data.firstname} ${data?.lastname || ""}`.trim()

        // check email exist
        const isEmailExist = await registerEmailExistService(data.email)
        if (isEmailExist) {
            return response({ res, status: 400, message: "Failed register email is already exist" })
        }

        // store to db
        const result = await registerService(data)
        response({ res, status: 201, message: "Success register", data: result })
    } catch {
        response({ res, status: 500, message: "Internal server error" })
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        response({ res, status: 200, message: "Success login" })
    } catch {
        response({ res, status: 500, message: "Internal server error" })
    }
}