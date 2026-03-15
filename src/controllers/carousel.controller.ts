import { Request, Response } from 'express'
import { createCarouselSchema, updateCarouselSchema } from '../schema/carousel.schema.js'
import {
  countCarouselService,
  createCarouselService,
  deleteCarouselService,
  getCarouselByIdService,
  getCarouselsService,
  updateCarouselService,
} from '../services/carousel.service.js'
import { Meta } from '../types/meta.type.js'
import { QueryParams } from '../types/query.type.js'
import { response } from '../utils/response.js'

export const getCarousels = async (req: Request, res: Response) => {
  const search = req.query.search?.toString() || ''
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const offset = Number((page - 1) * limit)
  const order_by = req.query.order_by?.toString() || 'created_at'
  const sort_by = req.query.sort_by?.toString() || 'desc'

  const params: QueryParams = { search, limit, page, offset, order_by, sort_by }
  const meta: Meta = { search, limit, page, offset, order_by, sort_by, total: 0 }

  try {
    const data = await getCarouselsService(params)
    meta.total = await countCarouselService(params)
    response({ res, status: 200, message: 'Berhasil mengambil data carousel.', data, meta })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const createCarousel = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }

  const { success, error, data } = createCarouselSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid.', errors })
  }

  try {
    const result = await createCarouselService(data)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal membuat carousel.' })
    }
    response({ res, status: 201, message: 'Berhasil membuat carousel.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const updateCarousel = async (req: Request, res: Response) => {
  const body = req.body
  const id = req.params.id as string

  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }

  const { success, error, data } = updateCarouselSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid.', errors })
  }

  try {
    const isExistCarousel = await getCarouselByIdService(id)
    if (!isExistCarousel) {
      return response({ res, status: 404, message: 'Carousel tidak ditemukan.' })
    }

    const result = await updateCarouselService(id, data)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal memperbarui carousel.' })
    }
    response({ res, status: 200, message: 'Berhasil memperbarui carousel.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const deleteCarousel = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }

  try {
    const isExistCarousel = await getCarouselByIdService(id)
    if (!isExistCarousel) {
      return response({ res, status: 404, message: 'Carousel tidak ditemukan.' })
    }

    const result = await deleteCarouselService(id)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal menghapus carousel.' })
    }
    response({ res, status: 200, message: 'Berhasil menghapus carousel.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}
