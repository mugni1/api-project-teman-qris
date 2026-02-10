import 'dotenv/config'
import axios, { AxiosResponse } from 'axios'
import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { createHash } from 'crypto'
import { ENDPOINT_EX } from '../endpoint/external.js'
import { DigiflazzCheckSaldoResponse } from '../types/digiflazz.js'

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
