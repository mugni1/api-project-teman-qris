import 'dotenv/config'
import { response } from '../utils/response.js'
import { Request, Response } from 'express'
import { getOrderByTransactionIdService, updateOrderByTransactionIdService } from '../services/order.service.js'
import axios from 'axios'
import { ENDPOINT_EX } from '../endpoint/external.js'

// const receivedSignature = body.signature
// delete body.signature
// const payload = JSON.stringify(body)
// const expectedSignature = crypto.createHmac('sha256', process.env.QRIS_PW_SECRET_KEY as string).update(payload).digest('hex')
// if (expectedSignature !== receivedSignature) {
//     return response({ res, status: 401, message: 'Invalid signature' })
// }

export const handleWebhook = async (req: Request, res: Response) => {
  const body = req.body
  const key = process.env.VIP_API_KEY
  const sign = process.env.VIP_API_SIGN

  try {
    const isExistOrder = await getOrderByTransactionIdService(body.transaction_id)
    if (!isExistOrder) {
      return response({ res, status: 404, message: 'Transaksi tidak ditemukan' })
    }

    if (body.status == 'paid') {
      if (isExistOrder.item.category.type == 'games') {
        const params = new URLSearchParams()
        params.append('key', key!)
        params.append('sign', sign!)
        params.append('type', 'order')
        params.append('service', isExistOrder.item.sku_code!)
        params.append('data_no', isExistOrder.destination!)
        if (isExistOrder.destination_second) {
          params.append('data_zone', isExistOrder.destination_second!)
        }
        await axios.post(`${ENDPOINT_EX.vip}/game-feature`, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      }
      if (isExistOrder.item.category.type == 'credit' || isExistOrder.item.category.type == 'quota') {
        const params = new URLSearchParams()
        params.append('key', key!)
        params.append('sign', sign!)
        params.append('type', 'order')
        params.append('service', isExistOrder.item.sku_code!)
        params.append('data_no', isExistOrder.destination!)
        await axios.post(`${ENDPOINT_EX.vip}/prepaid`, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      }
      await updateOrderByTransactionIdService(body.transaction_id, 'waiting', body.paid_at)
    } else {
      await updateOrderByTransactionIdService(body.transaction_id, body.status, body.paid_at)
    }
    response({ res, status: 200, message: 'OK' })
  } catch {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
  }
}
