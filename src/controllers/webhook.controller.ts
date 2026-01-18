import "dotenv/config"
import crypto from 'crypto'
import { response } from "../utils/response.js"
import { Request, Response } from "express"
import { getOrderByTransactionIdService, updateOrderByTransactionIdService } from "../services/order.service.js"

export const handleWebhook = async (req: Request, res: Response) => {
    const body = req.body
    const receivedSignature = body.signature
    delete body.signature
    const payload = JSON.stringify(body)
    const expectedSignature = crypto.createHmac('sha256', process.env.QRIS_PW_SECRET_KEY as string).update(payload).digest('hex')

    if (expectedSignature !== receivedSignature) {
        return response({ res, status: 401, message: 'Invalid signature' })
    }

    const isExistOrder = await getOrderByTransactionIdService(body.transaction_id)
    if (!isExistOrder) {
        return response({ res, status: 404, message: 'Order not found' })
    }

    const updated = await updateOrderByTransactionIdService(body.transaction_id, body.status, body.paid_at)
    if (!updated) {
        return response({ res, status: 404, message: 'Failed updated' })
    }

    response({ res, status: 200, message: "Success handle webhooks", data: body })
}