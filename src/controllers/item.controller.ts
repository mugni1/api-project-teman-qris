import { createItemSchema, updateItemSchema } from '../schema/item.schema.js'
import {
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
  const orderBy = req.query.order_by?.toString() || 'created_at'
  const sortBy = req.query.sort_by?.toString() || 'desc'
  const filterByStatus = req.query.filter_by_status?.toString() || undefined
  const filterByCredit = req.query.filter_by_credit?.toString() || undefined
  const filterByProvider = req.query.filter_by_provider?.toString() || undefined
  const meta: Meta = {
    limit,
    offset,
    page,
    search,
    filter_by_provider: filterByProvider,
    filter_by_credit: filterByCredit,
    filter_by_status: filterByStatus,
    order_by: orderBy,
    sort_by: sortBy,
    total: 0,
  }
  try {
    const result = await getItemsService(meta)
    if (!result) {
      return response({ res, status: 400, message: 'Failed get item' })
    }
    response({ res, status: 200, message: 'Success get items', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const createItem = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }
  const { success, error, data } = createItemSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }
  try {
    const result = await createItemService(data)
    if (!result) {
      return response({ res, status: 400, message: 'Failed create item' })
    }
    response({ res, status: 201, message: 'Success create item', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const updateItem = async (req: Request, res: Response) => {
  const body = req.body
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id is required' })
  }
  if (!body) {
    return response({ res, status: 400, message: 'Invalid input' })
  }
  const { success, error, data } = updateItemSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Invalid input', errors })
  }
  try {
    const isExistItem = await getItemById(id)
    if (!isExistItem) {
      return response({ res, status: 404, message: 'Item not found' })
    }
    const result = await updateItemService(data, id)
    if (!result) {
      return response({ res, status: 400, message: 'Failed update item' })
    }
    response({ res, status: 200, message: 'Success update item', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  const id = req.params.id as string
  if (!id) {
    return response({ res, status: 400, message: 'Parameter id is required' })
  }
  try {
    const isExistItem = await getItemById(id)
    if (!isExistItem) {
      return response({ res, status: 404, message: 'Item not found' })
    }
    const result = await deleteItemService(id)
    if (!result) {
      return response({ res, status: 400, message: 'Failed delete item' })
    }
    response({ res, status: 200, message: 'Success delete item', data: result })
  } catch {
    response({ res, status: 500, message: 'Internal server error' })
  }
}
