import { prisma } from '../libs/prisma.js'
import { CreateOrderPayload } from '../types/order.type.js'
import { QueryParams } from '../types/query.type.js'

export const createOrderService = async (payload: CreateOrderPayload) => {
  return prisma.orderDetail.create({
    data: {
      transaction_id: payload.transaction_id,
      destination: payload.destination,
      destination_second: payload.destination_second,
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

export const isExistOrderPendingService = async (userId: string) => {
  return prisma.orderDetail.findFirst({
    where: { AND: { user_id: userId, status: 'pending' } },
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
        include: {
          category: {
            select: {
              column_1_title: true,
              image_url: true,
              title: true,
              studio: true,
            },
          },
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
        include: {
          category: {
            select: {
              column_1_title: true,
              image_url: true,
              title: true,
              studio: true,
            },
          },
        },
      },
    },
  })
}

export const updateOrderByTransactionIdService = async (
  transaction_id: string,
  status: 'paid' | 'expired' | 'failed' | 'cancelled' | 'pending',
  paidAt?: string | null,
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

export const getOrderByUserLoginService = async (params: QueryParams, id: string) => {
  return await prisma.orderDetail.findMany({
    where: {
      AND: [{ user_id: id }, { transaction_id: { mode: 'insensitive', contains: params.search } }],
    },
    orderBy: {
      [params.order_by]: params.sort_by,
    },
    skip: params.offset,
    take: params.limit,
    include: {
      item: {
        omit: {
          stock: true,
          image_url: true,
          seller_name: true,
          price: true,
          sku_code: true,
          created_at: true,
          updated_at: true,
          unlimited_stock: true,
        },
        include: {
          category: {
            select: {
              image_url: true,
              title: true,
            },
          },
        },
      },
    },
    omit: { qris_string: true, qris_url: true, updated_at: true, user_id: true },
  })
}

export const countOrderByUserLoginService = async (params: QueryParams, id: string) => {
  return await prisma.orderDetail.count({
    where: {
      AND: [{ user_id: id }, { transaction_id: { mode: 'insensitive', contains: params.search } }],
    },
  })
}
