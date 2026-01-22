import z from 'zod'

export const createItemSchema = z.object({
  title: z.string('title is required').max(50, 'maximum title must have 50 character'),
  price: z.coerce.number('price must be a number').min(0, 'price must be at least 0'),
  stock: z.coerce.number('stock must be a number').min(0, 'stock must be at least 0'),
  provider: z.enum(['xl', 'axis', 'telkomsel', 'byu', 'indosat', 'smartfren', 'three'], {
    error: 'provider must be one of: axis, xl, indosat, smartfren, telkomsel, byu, three',
  }),
  type_status: z.enum(['promo', 'regular'], {
    error: 'type_status must be one of: promo or regular',
  }),
  type_credit: z.enum(['credit', 'quota'], {
    error: 'type_credit must be one of: credit or quota',
  }),
})
export type CreateItemPayload = z.infer<typeof createItemSchema>

export const updateItemSchema = z.object({
  title: z.string('title is required').max(50, 'maximum title must have 50 character').optional(),
  price: z.coerce.number('price must be a number').min(0, 'price must be at least 0').optional(),
  stock: z.coerce.number('stock must be a number').min(0, 'stock must be at least 0').optional(),
  provider: z
    .enum(['xl', 'axis', 'telkomsel', 'byu', 'indosat', 'smartfren', 'three'], {
      error: 'provider must be one of: axis, xl, indosat, smartfren, telkomsel, byu, three',
    })
    .optional(),
  type_status: z
    .enum(['promo', 'regular'], {
      error: 'type_status must be one of: promo or regular',
    })
    .optional(),
  type_credit: z
    .enum(['credit', 'quota'], {
      error: 'type_credit must be one of: credit or quota',
    })
    .optional(),
})
export type UpdateItemPayload = z.infer<typeof updateItemSchema>
