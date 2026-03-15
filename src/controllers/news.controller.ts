import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { createNewsSchema, updateNewsSchema } from '../schema/news.schema.js'
import {
  countNewsService,
  createNewsService,
  deleteNewsService,
  getNewsByIdService,
  getNewsService,
  updateNewsService,
} from '../services/news.service.js'
import { Meta } from '../types/meta.type.js'
import { QueryParams } from '../types/query.type.js'

export const getNews = async (req: Request, res: Response) => {
  const search = req.query.search?.toString() || ''
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const offset = Number((page - 1) * limit)
  const order_by = req.query.order_by?.toString() || 'created_at'
  const sort_by = req.query.sort_by?.toString() || 'desc'

  const params: QueryParams = { search, limit, page, offset, order_by, sort_by }
  const meta: Meta = { search, limit, page, offset, order_by, sort_by, total: 0 }

  try {
    const data = await getNewsService(params)
    meta.total = await countNewsService(params)
    response({ res, status: 200, message: 'Berhasil mengambil data berita.', data, meta })
  } catch (err: unknown) {
    console.log(err)
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const getNewsById = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }

  try {
    const result = await getNewsByIdService(id)
    if (!result) {
      return response({ res, status: 404, message: 'Berita tidak ditemukan.' })
    }
    response({ res, status: 200, message: 'Berhasil mengambil detail berita.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const createNews = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }

  const { success, error, data } = createNewsSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid.', errors })
  }

  try {
    const result = await createNewsService(data)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal membuat berita.' })
    }
    response({ res, status: 201, message: 'Berhasil membuat berita.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const updateNews = async (req: Request, res: Response) => {
  const body = req.body
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }

  const { success, error, data } = updateNewsSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid.', errors })
  }

  try {
    const isExistNews = await getNewsByIdService(id)
    if (!isExistNews) {
      return response({ res, status: 404, message: 'Berita tidak ditemukan.' })
    }
    const result = await updateNewsService(data, id)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal memperbarui berita.' })
    }
    response({ res, status: 200, message: 'Berhasil memperbarui berita.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const deleteNews = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }

  try {
    const isExistNews = await getNewsByIdService(id)
    if (!isExistNews) {
      return response({ res, status: 404, message: 'Berita tidak ditemukan.' })
    }
    const result = await deleteNewsService(id)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal menghapus berita.' })
    }
    response({ res, status: 200, message: 'Berhasil menghapus berita.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}
