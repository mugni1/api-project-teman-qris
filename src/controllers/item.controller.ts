import { createItemSchema, updateItemSchema } from '../schema/item.schema.js'
import { getCategoryByIdService } from '../services/category.service.js'
import {
  countItemsService,
  createItemService,
  deleteItemService,
  getItemById,
  getItemsService,
  updateItemService,
} from '../services/item.service.js'
import { Meta } from '../types/meta.type.js'
import { response } from '../utils/response.js'
import { Request, Response } from 'express'

export const getItems = async (req: Request, res: Response) => {
  const search = req.query.search?.toString() || ''
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const offset = Number((page - 1) * limit)
  const order_by = req.query.order_by?.toString() || 'sku_code'
  const sort_by = req.query.sort_by?.toString() || 'desc'
  const meta: Meta = { limit, offset, page, search, order_by, sort_by, total: 0 }
  try {
    const result = await getItemsService(meta)
    meta.total = await countItemsService(meta)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal mengambil data item.' })
    }
    response({ res, status: 200, message: 'Berhasil mengambil data item.', data: result, meta })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const createItem = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }
  const { success, error, data } = createItemSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid.', errors })
  }
  try {
    const isExistCategory = await getCategoryByIdService(data.category_id)
    if (!isExistCategory) {
      return response({ res, status: 404, message: 'Kategori tidak ditemukan.' })
    }
    const result = await createItemService(data)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal membuat item.' })
    }
    response({ res, status: 201, message: 'Berhasil membuat item.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const updateItem = async (req: Request, res: Response) => {
  const body = req.body
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }
  const { success, error, data } = updateItemSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid.', errors })
  }
  try {
    if (data.category_id) {
      const isExistCategory = await getCategoryByIdService(data.category_id)
      if (!isExistCategory) {
        return response({ res, status: 404, message: 'Kategori tidak ditemukan.' })
      }
    }
    const isExistItem = await getItemById(id)
    if (!isExistItem) {
      return response({ res, status: 404, message: 'Item tidak ditemukan.' })
    }
    const result = await updateItemService(data, id)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal memperbarui item.' })
    }
    response({ res, status: 200, message: 'Berhasil memperbarui item.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }
  try {
    const isExistItem = await getItemById(id)
    if (!isExistItem) {
      return response({ res, status: 404, message: 'Item tidak ditemukan.' })
    }
    const result = await deleteItemService(id)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal menghapus item.' })
    }
    response({ res, status: 200, message: 'Berhasil menghapus item.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}
