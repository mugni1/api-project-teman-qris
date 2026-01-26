import z from 'zod'

export const createOrderSchema = z.object({
  item_id: z.cuid('item_id is required and please input valid item_id'),
  customer_phone: z
    .string('customer_phone is required')
    .min(10, 'minimum customer_phone must be at least 10 characters')
    .max(14, 'maximum customer_phone must be at least 14 characters'),
  destination: z
    .string('destination is required')
    .min(10, 'minimum destination must be at least 10 characters')
    .max(14, 'maximum destination must be at least 14 characters'),
})
