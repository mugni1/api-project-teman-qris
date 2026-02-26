import 'dotenv/config'
import crypto from 'crypto'
import { response } from '../utils/response.js'
import { Request, Response } from 'express'
import {
  getOrderByTransactionIdService,
  getOrderByTransactionInvoiceService,
  updateOrderByTransactionIdService,
  updateOrderByTransactionInvoiceService,
} from '../services/order.service.js'
import axios, { AxiosResponse } from 'axios'
import { ENDPOINT_EX } from '../endpoint/external.js'

export const handleWebhook = async (req: Request, res: Response) => {
  const body = req.body
  const key = process.env.VIP_API_KEY
  const sign = process.env.VIP_API_SIGN

  try {
    const isExistOrder = await getOrderByTransactionIdService(body.transaction_id)
    if (!isExistOrder) {
      return response({ res, status: 404, message: 'Transaksi tidak ditemukan' })
    }

    let transaction_invoice = undefined
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
        const results: AxiosResponse = await axios.post(`${ENDPOINT_EX.vip}/game-feature`, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        if (results.data.result) {
          transaction_invoice = results.data.data.trxid
        }
      }
      if (isExistOrder.item.category.type == 'credit' || isExistOrder.item.category.type == 'quota') {
        const params = new URLSearchParams()
        params.append('key', key!)
        params.append('sign', sign!)
        params.append('type', 'order')
        params.append('service', isExistOrder.item.sku_code!)
        params.append('data_no', isExistOrder.destination!)
        const results: AxiosResponse = await axios.post(`${ENDPOINT_EX.vip}/prepaid`, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        if (results.data.result) {
          transaction_invoice = results.data.data.trxid
        }
      }
      await updateOrderByTransactionIdService(body.transaction_id, 'waiting', body.paid_at, transaction_invoice)
    } else {
      await updateOrderByTransactionIdService(body.transaction_id, body.status, body.paid_at)
    }
    response({ res, status: 200, message: 'OK' })
  } catch {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
  }
}

export const handleWebhookVip = async (req: Request, res: Response) => {
  const body = req.body
  const sign = process.env.VIP_API_SIGN

  const signature = req.headers['x-client-signature'] as string
  const expectedSignature = crypto.createHash('md5').update(sign!).digest('hex')
  if (signature !== expectedSignature) {
    return response({ res, status: 400, message: 'Signature tidak benar' })
  }

  try {
    const isExistOrder = await getOrderByTransactionInvoiceService(body.trxid)
    if (!isExistOrder) {
      return response({ res, status: 404, message: 'Transaksi tidak di temukan' })
    }
    await updateOrderByTransactionInvoiceService(body.status, body.trxid)
    response({ res, status: 200, message: 'OK' })
  } catch {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
  }
}
