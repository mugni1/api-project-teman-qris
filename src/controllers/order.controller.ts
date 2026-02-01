import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { createOrderSchema } from '../schema/order.schema.js'
import {
  createOrderService,
  getOrderByIdService,
  getOrderByTransactionIdService,
  updateOrderByTransactionIdService,
} from '../services/order.service.js'
import { getItemById } from '../services/item.service.js'
import { CreatePaymentQrisPWRespose, GetPaymentQrisPWResponse } from '../types/order.type.js'
import axios, { AxiosResponse } from 'axios'

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.user_id as string
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }
  const { success, error, data } = createOrderSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }

  try {
    const isExistItem = await getItemById(data.item_id)
    if (!isExistItem) {
      return response({ res, status: 404, message: 'Failed create order item not found' })
    }

    const resQrisPw: AxiosResponse<CreatePaymentQrisPWRespose> = await axios.post(
      'https://qris.pw/api/create-payment.php',
      {
        amount: isExistItem.price,
        customer_phone: data.customer_phone,
        callback_url: 'https://api.v2.mugni.my.id/webhook',
      },
      {
        headers: {
          'x-api-key': process.env.QRIS_PW_API_KEY,
          'x-api-secret': process.env.QRIS_PW_SECRET_KEY,
        },
      },
    )
    if (!resQrisPw.data.success || !resQrisPw) {
      return response({ res, status: 404, message: 'Failed create order, try again later' })
    }

    const result = await createOrderService({
      transaction_id: resQrisPw.data.transaction_id,
      phone_number: data.customer_phone,
      qris_url: resQrisPw.data.qris_url,
      qris_string: resQrisPw.data.qris_string,
      created_at: resQrisPw.data.created_at,
      expires_at: resQrisPw.data.expires_at,
      user_id: userId,
      amount: resQrisPw.data.amount,
      item_id: isExistItem.id,
    })
    if (!result) {
      return response({ res, status: 400, message: 'Failed create order, try again later' })
    }
    response({ res, status: 201, message: 'Success create order', data: result })
  } catch (err: unknown) {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const getOrderById = async (req: Request, res: Response) => {
  const userId = req.user_id
  const id = req.params.id as string
  let orderDetail

  try {
    const isExistOrderById = await getOrderByIdService(id)
    if (!isExistOrderById) {
      const isExistOrderByTransactionId = await getOrderByTransactionIdService(id)
      if (!isExistOrderByTransactionId) {
        return response({ res, status: 404, message: 'Order detail not found' })
      } else {
        orderDetail = isExistOrderByTransactionId
      }
    } else {
      orderDetail = isExistOrderById
    }
    if (orderDetail.user_id != userId) {
      return response({ res, status: 403, message: 'Cannot access this order detail' })
    }
    response({
      res,
      status: 200,
      message: 'Success get order detail',
      data: {
        ...orderDetail,
        server_time: new Date().getTime(),
        expired_time: new Date(isExistOrderById?.expires_at || '').getTime(),
      },
    })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const updateOrderByTrxId = async (req: Request, res: Response) => {
  const id = req.params.id as string
  try {
    const resQrisPw: AxiosResponse<GetPaymentQrisPWResponse> = await axios.get(
      `https://qris.pw/api/check-payment.php?transaction_id=${id}`,
      {
        headers: {
          'x-api-key': process.env.QRIS_PW_API_KEY,
          'x-api-secret': process.env.QRIS_PW_SECRET_KEY,
        },
      },
    )
    const updated = await updateOrderByTransactionIdService(id, resQrisPw.data.status, resQrisPw.data.paid_at)
    response({ res, status: 200, message: 'Success update', data: updated })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}
