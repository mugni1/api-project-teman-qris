import 'dotenv/config'
import axios, { AxiosResponse } from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { createHash } from 'crypto'
import { ENDPOINT_EX } from '../endpoint/external.js'
import { DigiflazzCheckSaldoResponse, DigiflazzPriceListResponse } from '../types/digiflazz.js'

export const checkSaldo = async (req: Request, res: Response) => {
  const apikey = process.env.DIGI_FLAZZ_API_KEY
  const username = process.env.DIGI_FLAZZ_USERNAME
  const sign = createHash('md5').update(`${username}${apikey}depo`).digest('hex')

  try {
    const results: AxiosResponse<DigiflazzCheckSaldoResponse> = await axios.post(
      `${ENDPOINT_EX.digiflazz}/v1/cek-saldo`,
      {
        cmd: 'deposit',
        username,
        sign,
      },
    )
    response({ res, status: 200, message: 'Success check saldo', data: results.data.data })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const priceList = async (req: Request, res: Response) => {
  // !!!!!!!!!
  // Terdapat limitasi pengecekan daftar harga, jadi gunakanlah secara bijak.
  // Kami sarankan simpan daftar harga pada database milik Anda dan update harga pada database Anda secara berkala.
  // Tampilkan harga ke user Anda sesuai harga pada database Anda.
  const cmd = req.query.cmd?.toString() || 'prepaid'
  const code = req.query.code?.toString() || ''
  const category = req.query.category?.toString() || ''
  const brand = req.query.brand?.toString() || ''
  const type = req.query.type?.toString() || ''
  const apikey = process.env.DIGI_FLAZZ_API_KEY
  const username = process.env.DIGI_FLAZZ_USERNAME
  const sign = createHash('md5').update(`${username}${apikey}pricelist`).digest('hex')

  try {
    const results: AxiosResponse<DigiflazzPriceListResponse> = await axios.post(
      `${ENDPOINT_EX.digiflazz}/v1/price-list`,
      { cmd, username, sign, code, category, brand, type },
    )
    response({ res, status: 200, message: 'Success get price list', data: results.data.data })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const transaction = async (req: Request, res: Response) => {
  const ref_id = req.query.ref_id?.toString() || ''
  if (ref_id == '') {
    return response({ res, status: 400, message: 'ref_id is required' })
  }
  const customer_no = req.query.customer_no?.toString() || ''
  if (customer_no == '') {
    return response({ res, status: 400, message: 'customer_no is required' })
  }
  const buyer_sku_code = req.query.buyer_sku_code?.toString() || ''
  if (buyer_sku_code == '') {
    return response({ res, status: 400, message: 'buyer_sku_code is required' })
  }
  const testing = ['true', '1'].includes(String(req.query.testing).toLowerCase())
  const cb_url = req.query.cb_url?.toString() || ''
  const apikey = process.env.DIGI_FLAZZ_API_KEY
  const username = process.env.DIGI_FLAZZ_USERNAME
  const sign = createHash('md5').update(`${username}${apikey}${ref_id}`).digest('hex')
  try {
    const results: AxiosResponse<DigiflazzPriceListResponse> = await axios.post(
      `${ENDPOINT_EX.digiflazz}/v1/transaction`,
      { cmd: 'transaction', username, sign, ref_id, buyer_sku_code, customer_no, testing, cb_url },
    )
    response({ res, status: 201, message: 'Success create transaction', data: results.data })
  } catch (err: any) {
    console.log('DIGIFLAZZ ERROR:', err.response?.data || '')
    response({ res, status: 500, message: 'Internal server error' })
  }
}
