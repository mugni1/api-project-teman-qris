import { response } from "../utils/response.js"
import { Request, Response } from "express"

export const createItem = (req: Request, res: Response) => {
    response({ res, status: 201, message: "Success create item" })
}