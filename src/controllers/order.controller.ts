import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { createOrderSchema } from '../schema/order.schema.js'
import {
  countOrderByUserLoginService,
  createOrderService,
  getOrderByIdService,
  getOrderByTransactionIdService,
  getOrderByUserLoginService,
  isExistOrderPendingService,
  updateOrderByTransactionIdService,
} from '../services/order.service.js'
import { getItemById } from '../services/item.service.js'
import { CreatePaymentQrisPWRespose, GetPaymentQrisPWResponse } from '../types/order.type.js'
import axios, { AxiosResponse } from 'axios'
import { Meta } from '../types/meta.type.js'

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.user_id as string
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Harap lengkapi semua data dengan benar.' })
  }
  const { success, error, data } = createOrderSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Harap lengkapi semua data dengan benar.', errors })
  }

  try {
    const isExistOrderPending = await isExistOrderPendingService(userId)
    if (isExistOrderPending) {
      return response({ res, status: 400, message: 'Harap selesaikan pembayaran ditransaksi sebelumnya.' })
    }

    const isExistItem = await getItemById(data.item_id)
    if (!isExistItem) {
      return response({
        res,
        status: 404,
        message: 'Gagal membuat transaksi, dikarenakan item yang di pilih tidak tersedia.',
      })
    }

    const resQrisPw: AxiosResponse<CreatePaymentQrisPWRespose> = await axios.post(
      'https://qris.pw/api/create-payment.php',
      {
        amount: isExistItem.price,
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
      return response({ res, status: 404, message: 'Gagal membuat transaksi, coba lagi nanti.' })
    }

    const result = await createOrderService({
      transaction_id: resQrisPw.data.transaction_id,
      destination: data.destination,
      destination_second: data.destination_second,
      qris_url: resQrisPw.data.qris_url,
      qris_string: resQrisPw.data.qris_string,
      created_at: resQrisPw.data.created_at,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      user_id: userId,
      amount: resQrisPw.data.amount,
      item_id: isExistItem.id,
    })
    if (!result) {
      return response({ res, status: 400, message: 'Gagal membuat transaksi, coba lagi nanti.' })
    }
    response({ res, status: 201, message: 'Berhasil membuat transaksi, silahkan lakukan pembayaran.', data: result })
  } catch (err: unknown) {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
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
        expired_time: new Date(orderDetail?.expires_at || '').getTime(),
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
    response({ res, status: 200, message: 'Berhasil memperbaharui transaksi.', data: updated })
  } catch {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
  }
}

export const getOrders = async (req: Request, res: Response) => {
  const user_id = req.user_id as string
  const search = req.query.search?.toString() || ''
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const offset = Number((page - 1) * limit)
  const order_by = req.query.order_by?.toString() || 'created_at'
  const sort_by = req.query.sort_by?.toString() || 'desc'
  const meta: Meta = { limit, offset, page, search, order_by, sort_by, total: 0 }

  try {
    const data = await getOrderByUserLoginService(meta, user_id)
    meta.total = await countOrderByUserLoginService(meta, user_id)
    response({ res, status: 200, message: 'Succes get orders', data, meta })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}
