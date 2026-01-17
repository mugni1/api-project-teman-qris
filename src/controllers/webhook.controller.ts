import { response } from "../utils/response.js"
import { Request, Response } from "express"

export const handleWebhook = (req: Request, res: Response) => {
    const body = req.body
    response({ res, status: 200, message: "Success handle webhooks", data: body })
}