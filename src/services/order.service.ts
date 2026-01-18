import { prisma } from "../libs/prisma.js"
import { CreateOrderPayload } from "../schema/order.schema.js"

export const createOrderService = async (payload: CreateOrderPayload, userId: string) => {
    return prisma.orderDetail.create({
        data: {
            transaction_id: payload.transaction_id,
            amount: payload.amount,
            status: "pending",
            qris_url: payload.qris_url,
            qris_string: payload.qris_string,
            expires_at: payload.expires_at,
            user_id: userId,
            item_id: payload.item_id
        }
    })
}

export const getOrderByTransactionIdService = async (transaction_id: string) => {
    return await prisma.orderDetail.findUnique({
        where: {
            transaction_id
        }
    })
}

export const updateOrderByTransactionIdService = async (
    transaction_id: string,
    status: "paid" | "expired" | "failed" | "cancelled" | "pending",
    paidAt?: string
) => {
    return await prisma.orderDetail.update({
        where: {
            transaction_id
        },
        data: {
            status,
            paid_at: paidAt
        }
    })
}