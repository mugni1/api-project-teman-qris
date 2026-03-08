import { Request, Response } from 'express'
import { countUserServices, getUserServices } from '../services/user.service.js'
import { QueryParams } from '../types/query.type.js'
import { Meta } from '../types/meta.type.js'
import { response } from '../utils/response.js'

export const getUsers = async (req: Request, res: Response) => {
  const user_id = req.user_id as string
  const search = req.query.search?.toString() || ''
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const offset = Number((page - 1) * limit)
  const order_by = req.query.order_by?.toString() || 'created_at'
  const sort_by = req.query.sort_by?.toString() || 'desc'

  const params: QueryParams = { search, limit, page, offset, order_by, sort_by }
  const meta: Meta = { search, limit, page, offset, order_by, sort_by, total: 0 }

  try {
    const data = await getUserServices(user_id, params)
    meta.total = await countUserServices(user_id, params)
    response({ res, status: 200, message: 'Berhasil mengambil data carousel', data, meta })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server' })
  }
}
