import z from 'zod'

export const createOrderSchema = z.object({
  item_id: z.cuid('item_id is required and please input valid item_id'),
  destination: z
    .string('destination is required')
    .min(6, 'minimum destination must be at least 6 characters')
    .max(100, 'maximum destination must be at least 100 characters'),
})
