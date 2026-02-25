import 'dotenv/config'
import axios, { AxiosResponse } from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { ENDPOINT_EX } from '../endpoint/external.js'
import { VipProfileResponse } from '../types/vip.js'

export const getProfile = async (req: Request, res: Response) => {
  const key = process.env.VIP_API_KEY
  const sign = process.env.VIP_API_SIGN
  try {
    const params = new URLSearchParams()
    params.append('key', key!)
    params.append('sign', sign!)
    const results: AxiosResponse<VipProfileResponse> = await axios.post(`${ENDPOINT_EX.vip}/profile`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (results.data.result) {
      response({ res, status: 200, message: 'Berhasil mengablil data profile', data: results.data.data })
    } else {
      response({ res, status: 500, message: results?.data?.message.toString() ?? '', data: results.data.data })
    }
  } catch {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
  }
}

export const checkNickname = async (req: Request, res: Response) => {
  const key = process.env.VIP_API_KEY
  const sign = process.env.VIP_API_SIGN
  const type = 'get-nickname'
  const body = req.body
  const code = body.code
  const target = body.target
  const additional_target = body.additional_target
  try {
    const params = new URLSearchParams()
    params.append('key', key!)
    params.append('sign', sign!)
    params.append('type', type!)
    params.append('code', code!)
    params.append('target', target!)
    params.append('additional_target', additional_target)
    const results: AxiosResponse<VipProfileResponse> = await axios.post(`${ENDPOINT_EX.vip}/game-feature`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    console.log(results.data)
    if (results.data.result) {
      response({
        res,
        status: 200,
        message: 'Berhasil cek nickname',
        data: { nickname: results.data.data },
      })
    } else {
      response({
        res,
        status: 500,
        message: results?.data?.message.toString() ?? 'Tidak di temukan',
      })
    }
  } catch {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
  }
}

export const getPrepaidService = async (req: Request, res: Response) => {
  const sq = req.query
  const filter_type = sq.filter_type?.toString() || ''
  const filter_value = sq.filter_value?.toString() || ''
  const key = process.env.VIP_API_KEY
  const sign = process.env.VIP_API_SIGN
  const type = 'services'
  try {
    const params = new URLSearchParams()
    params.append('key', key!)
    params.append('sign', sign!)
    params.append('type', type!)
    params.append('filter_type', filter_type!)
    params.append('filter_value', filter_value!)
    const results: AxiosResponse = await axios.post(`${ENDPOINT_EX.vip}/prepaid`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (results.data.result) {
      response({ res, status: 200, message: 'Berhasil mengambil data layanan prepaid', data: results.data.data })
    } else {
      response({ res, status: 500, message: results?.data?.message.toString() ?? '', data: results.data.data })
    }
  } catch {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
  }
}

export const getPrepaidTransaction = async (req: Request, res: Response) => {
  const sq = req.query
  const key = process.env.VIP_API_KEY
  const sign = process.env.VIP_API_SIGN
  const trxid = sq.trxid?.toString() || ''
  const limit = sq.limit?.toString() || ''
  const type = 'status'

  try {
    const params = new URLSearchParams()
    params.append('key', key!)
    params.append('sign', sign!)
    params.append('type', type!)
    if (trxid) {
      params.append('trxid', trxid!)
    }
    if (limit) {
      params.append('limit', limit!)
    }
    const results: AxiosResponse = await axios.post(`${ENDPOINT_EX.vip}/prepaid`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (results.data.result) {
      response({ res, status: 200, message: 'Berhasil mengambil list transaksi', data: results.data.data })
    } else {
      response({ res, status: 500, message: results?.data?.message.toString() ?? '', data: results.data.data })
    }
  } catch {
    response({ res, status: 500, message: 'Server sedang sibuk, coba lagi nanti.' })
  }
}
