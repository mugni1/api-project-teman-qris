import { Request, Response } from 'express'
import { createCategorySchema, updateCategorySchema } from '../schema/category.schema.js'
import {
  countCategoriesService,
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from '../services/category.service.js'
import { Meta } from '../types/meta.type.js'
import { QueryParams } from '../types/query.type.js'
import { response } from '../utils/response.js'
import { categoryType } from '../types/category.js'

export const getCategories = async (req: Request, res: Response) => {
  const search = req.query.search?.toString() || ''
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const offset = Number((page - 1) * limit)
  const order_by = req.query.order_by?.toString() || 'created_at'
  const sort_by = req.query.sort_by?.toString() || 'desc'
  const type = req.query?.type as categoryType

  const params: QueryParams = { search, limit, page, offset, order_by, sort_by }
  const meta: Meta = { search, limit, page, offset, order_by, sort_by, total: 0 }

  try {
    const data = await getCategoriesService(params, type)
    meta.total = await countCategoriesService(params, type)
    response({ res, status: 200, message: 'Berhasil mengambil data kategori.', data, meta })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }

  try {
    const result = await getCategoryByIdService(id)
    if (!result) {
      return response({ res, status: 404, message: 'Kategori tidak ditemukan.' })
    }
    response({ res, status: 200, message: 'Berhasil mengambil detail kategori.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }

  const { success, error, data } = createCategorySchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid.', errors })
  }

  try {
    const result = await createCategoryService(data)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal membuat kategori.' })
    }
    response({ res, status: 201, message: 'Berhasil membuat kategori.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  const body = req.body
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }

  const { success, error, data } = updateCategorySchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid.', errors })
  }

  try {
    const isExistCategory = await getCategoryByIdService(id)
    if (!isExistCategory) {
      return response({ res, status: 404, message: 'Kategori tidak ditemukan.' })
    }
    const result = await updateCategoryService(data, id)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal memperbarui kategori.' })
    }
    response({ res, status: 200, message: 'Berhasil memperbarui kategori.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id wajib diisi.' })
  }

  try {
    const isExistCategory = await getCategoryByIdService(id)
    if (!isExistCategory) {
      return response({ res, status: 404, message: 'Kategori tidak ditemukan.' })
    }
    const result = await deleteCategoryService(id)
    if (!result) {
      return response({ res, status: 400, message: 'Gagal menghapus kategori.' })
    }
    response({ res, status: 200, message: 'Berhasil menghapus kategori.', data: result })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server.' })
  }
}
