import { createItemSchema } from "../schema/item.schema.js"
import { createItemService } from "../services/item.service.js"
import { response } from "../utils/response.js"
import { Request, Response } from "express"

export const createItem = async (req: Request, res: Response) => {
    const body = req.body
    if (!body) {
        return response({ res, status: 400, message: "Invalid input" })
    }
    const { success, error, data } = createItemSchema.safeParse(body)
    if (!success) {
        const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
        return response({ res, status: 400, message: "Invalid input", errors })
    }
    try {
        const result = await createItemService(data)
        if (!result) {
            return response({ res, status: 400, message: "Failed create item" })
        }
        response({ res, status: 201, message: "Success create item", data: result })
    } catch {
        response({ res, status: 500, message: "Internal server error" })
    }
}