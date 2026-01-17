import { Request, Response } from "express";
import { response } from "../utils/response.js";
import { createOrderSchema } from "../schema/order.schema.js";
import { createOrderService } from "../services/order.service.js";
import { getItemById } from "../services/item.service.js";

export const createOrder = async (req: Request, res: Response) => {
    const userId = req.user_id as string
    const body = req.body
    if (!body) {
        return response({ res, status: 400, message: "Invalid input" })
    }
    const { success, error, data } = createOrderSchema.safeParse(body)
    if (!success) {
        const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
        return response({ res, status: 400, message: "Invalid input", errors })
    }
    try {
        const isExistItem = await getItemById(data.item_id)
        if (!isExistItem) {
            return response({ res, status: 404, message: "Failed create order item not found" })
        }
        const result = await createOrderService(data, userId)
        if (!result) {
            return response({ res, status: 400, message: "Failed create order" })
        }
        response({ res, status: 201, message: "Success create order", data: result })
    } catch {
        response({ res, status: 500, message: "Internal server error" })
    }
}