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

export const getCategories = async (req: Request, res: Response) => {
  const search = req.query.search?.toString() || ''
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const offset = Number((page - 1) * limit)
  const order_by = req.query.order_by?.toString() || 'created_at'
  const sort_by = req.query.sort_by?.toString() || 'desc'

  const params: QueryParams = { search, limit, page, offset, order_by, sort_by }
  const meta: Meta = { search, limit, page, offset, order_by, sort_by, total: 0 }

  try {
    const data = await getCategoriesService(params)
    meta.total = await countCategoriesService(params)
    response({ res, status: 200, message: 'Success get categories', data, meta })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id is required' })
  }

  try {
    const result = await getCategoryByIdService(id)
    if (!result) {
      return response({ res, status: 404, message: 'Category not found' })
    }
    response({ res, status: 200, message: 'Success get category detail', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }

  const { success, error, data } = createCategorySchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }

  try {
    const result = await createCategoryService(data)
    if (!result) {
      return response({ res, status: 400, message: 'Failed create category' })
    }
    response({ res, status: 201, message: 'Success create category', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  const body = req.body
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id is required' })
  }
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }

  const { success, error, data } = updateCategorySchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }

  try {
    const isExistCategory = await getCategoryByIdService(id)
    if (!isExistCategory) {
      return response({ res, status: 404, message: 'Category not found' })
    }
    const result = await updateCategoryService(data, id)
    if (!result) {
      return response({ res, status: 400, message: 'Failed update category' })
    }
    response({ res, status: 200, message: 'Success update category', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id is required' })
  }

  try {
    const isExistCategory = await getCategoryByIdService(id)
    if (!isExistCategory) {
      return response({ res, status: 404, message: 'Category not found' })
    }
    const result = await deleteCategoryService(id)
    if (!result) {
      return response({ res, status: 400, message: 'Failed delete category' })
    }
    response({ res, status: 200, message: 'Success delete category', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}
