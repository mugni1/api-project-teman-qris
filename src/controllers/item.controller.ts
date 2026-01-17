import { createItemSchema, updateItemSchema } from "../schema/item.schema.js"
import { createItemService, getItemById, updateItemService } from "../services/item.service.js"
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

export const updateItem = async (req: Request, res: Response) => {
    const body = req.body
    const id = req.params.id as string
    if (!id) {
        return response({ res, status: 400, message: "Parameter id is required" })
    }
    if (!body) {
        return response({ res, status: 400, message: "Invalid input" })
    }
    const { success, error, data } = updateItemSchema.safeParse(body)
    if (!success) {
        const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
        return response({ res, status: 400, message: "Invalid input", errors })
    }
    try {
        const isExistItem = await getItemById(id)
        if (!isExistItem) {
            return response({ res, status: 404, message: "Item not found" })
        }
        const result = await updateItemService(data, id)
        if (!result) {
            return response({ res, status: 400, message: "Failed update item" })
        }
        response({ res, status: 200, message: "Success update item", data: result })
    } catch {
        response({ res, status: 500, message: "Internal server error" })
    }
}