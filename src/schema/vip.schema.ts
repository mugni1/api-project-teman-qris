import z from 'zod'

export const createPrepaidOrderSchema = z.object({
  service: z
    .string('Harap masukan service')
    .min(1, 'service minimal memiliki 1 karakter')
    .max(20, 'service maksimal memiliki 20 karakter'),
  data_no: z
    .string('Harap masukan data_no')
    .min(1, 'data_no minimal memiliki 1 karakter')
    .max(50, 'data_no maksimal memiliki 50 karakter'),
})
export type CreateCategoryPayload = z.infer<typeof createPrepaidOrderSchema>
