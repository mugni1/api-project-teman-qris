import z from 'zod'

export const createItemSchema = z.object({
  title: z.string('title is required').max(50, 'maximum title must have 50 character'),
  image_url: z
    .string('image_url is required')
    .min(5, 'minimum image_url must be at least 5 characters')
    .max(500, 'maximum image_url must have 500 character'),
  price: z.coerce.number('price must be a number').min(0, 'price must be at least 0'),
  stock: z.coerce.number('stock must be a number').min(0, 'stock must be at least 0'),
  unlimited_stock: z.boolean('unlimited_stock must be a boolean'),
  seller_name: z.string('seller_name is required').max(50, 'maximum seller_name must have 50 character'),
  sku_code: z.string('sku_code is required').max(10, 'maximum sku_code must have 10 character'),
  category_id: z.string('category_id is required'),
})
export type CreateItemPayload = z.infer<typeof createItemSchema>

export const updateItemSchema = z.object({
  title: z.string('title is required').max(50, 'maximum title must have 50 character').optional(),
  image_url: z
    .string('image_url is required')
    .min(5, 'minimum image_url must be at least 5 characters')
    .max(500, 'maximum image_url must have 500 character')
    .optional(),
  price: z.coerce.number('price must be a number').min(0, 'price must be at least 0').optional(),
  stock: z.coerce.number('stock must be a number').min(0, 'stock must be at least 0').optional(),
  unlimited_stock: z.boolean('unlimited_stock must be a boolean').optional(),
  seller_name: z.string('seller_name is required').max(50, 'maximum seller_name must have 50 character').optional(),
  sku_code: z.string('sku_code is required').max(10, 'maximum sku_code must have 10 character').optional(),
  category_id: z.string('category_id is required').optional(),
})
export type UpdateItemPayload = z.infer<typeof updateItemSchema>
