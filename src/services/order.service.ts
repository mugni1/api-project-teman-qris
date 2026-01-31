import { prisma } from '../libs/prisma.js'
import { CreateOrderPayload } from '../types/order.type.js'

export const createOrderService = async (payload: CreateOrderPayload) => {
  return prisma.orderDetail.create({
    data: {
      transaction_id: payload.transaction_id,
      phone_number: payload.phone_number,
      amount: payload.amount,
      status: 'pending',
      qris_url: payload.qris_url,
      qris_string: payload.qris_string,
      expires_at: payload.expires_at,
      user_id: payload.user_id,
      item_id: payload.item_id,
    },
  })
}

export const getOrderByTransactionIdService = async (transaction_id: string) => {
  return await prisma.orderDetail.findUnique({
    where: {
      transaction_id,
    },
    include: {
      user: {
        omit: {
          password: true,
          provider: true,
          role: true,
          created_at: true,
          updated_at: true,
        },
      },
      item: {
        omit: {
          created_at: true,
          updated_at: true,
        },
      },
    },
  })
}

export const getOrderByIdService = async (id: string) => {
  return await prisma.orderDetail.findUnique({
    where: { id },
    include: {
      user: {
        omit: {
          password: true,
          provider: true,
          role: true,
          created_at: true,
          updated_at: true,
        },
      },
      item: {
        omit: {
          created_at: true,
          updated_at: true,
        },
      },
    },
  })
}

export const updateOrderByTransactionIdService = async (
  transaction_id: string,
  status: 'paid' | 'expired' | 'failed' | 'cancelled' | 'pending',
  paidAt?: string,
) => {
  return await prisma.orderDetail.update({
    where: {
      transaction_id,
    },
    data: {
      status,
      paid_at: paidAt,
    },
  })
}
