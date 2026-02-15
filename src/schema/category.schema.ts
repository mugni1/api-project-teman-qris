import z from 'zod'

export const createCategorySchema = z.object({
  title: z
    .string('title is required')
    .min(3, 'minimum title must be at least 3 characters')
    .max(150, 'maximum title must have 150 character'),
  image_url: z
    .string('image_url is required')
    .min(5, 'minimum image_url must be at least 5 characters')
    .max(500, 'maximum image_url must have 500 character'),
  cover_url: z
    .string('cover_url is required')
    .min(5, 'minimum cover_url must be at least 5 characters')
    .max(500, 'maximum cover_url must have 500 character'),
  type: z.enum(['credit', 'quota', 'games', 'bill'], {
    error: 'type must be one of: credit, quota, games, bill',
  }),
})
export type CreateCategoryPayload = z.infer<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  title: z
    .string('title is required')
    .min(3, 'minimum title must be at least 3 characters')
    .max(150, 'maximum title must have 150 character')
    .optional(),
  image_url: z
    .string('image_url is required')
    .min(5, 'minimum image_url must be at least 5 characters')
    .max(500, 'maximum image_url must have 500 character')
    .optional(),
  cover_url: z
    .string('cover_url is required')
    .min(5, 'minimum cover_url must be at least 5 characters')
    .max(500, 'maximum cover_url must have 500 character')
    .optional(),
  type: z
    .enum(['credit', 'quota', 'games', 'bill'], {
      error: 'type must be one of: credit, quota, games, bill',
    })
    .optional(),
})
export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>
