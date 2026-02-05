import z from 'zod'

export const createNewsSchema = z.object({
  image_url: z
    .string('image_url is required')
    .min(5, 'minimum image_url must be at least 5 characters')
    .max(500, 'maximum image_url must have 500 character'),
  title: z
    .string('title is required')
    .min(3, 'minimum title must be at least 3 characters')
    .max(150, 'maximum title must have 150 character'),
  content: z
    .string('content is required')
    .min(10, 'minimum content must be at least 10 characters')
    .max(5000, 'maximum content must have 5000 character'),
})
export type CreateNewsPayload = z.infer<typeof createNewsSchema>

export const updateNewsSchema = z.object({
  image_url: z
    .string('image_url is required')
    .min(5, 'minimum image_url must be at least 5 characters')
    .max(500, 'maximum image_url must have 500 character')
    .optional(),
  title: z
    .string('title is required')
    .min(3, 'minimum title must be at least 3 characters')
    .max(150, 'maximum title must have 150 character')
    .optional(),
  content: z
    .string('content is required')
    .min(10, 'minimum content must be at least 10 characters')
    .max(5000, 'maximum content must have 5000 character')
    .optional(),
})
export type UpdateNewsPayload = z.infer<typeof updateNewsSchema>
