import z from 'zod'

export const createCategorySchema = z.object({
  title: z
    .string('title is required')
    .min(3, 'minimum title must be at least 3 characters')
    .max(150, 'maximum title must have 150 character'),
  studio: z
    .string('studio is required')
    .min(3, 'minimum studio must be at least 3 characters')
    .max(50, 'maximum studio must have 50 character'),
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
  column_1: z.boolean('column_1 must be a boolean'),
  column_2: z.boolean('column_2 must be a boolean'),
  column_1_title: z
    .string('column_1_title is required')
    .min(1, 'minimum column_1_title must be at least 1 characters')
    .max(100, 'maximum column_1_title must have 100 character'),
  column_2_title: z
    .string('column_2_title is required')
    .min(1, 'minimum column_2_title must be at least 1 characters')
    .max(100, 'maximum column_2_title must have 100 character'),
})
export type CreateCategoryPayload = z.infer<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  title: z
    .string('title is required')
    .min(3, 'minimum title must be at least 3 characters')
    .max(150, 'maximum title must have 150 character')
    .optional(),
  studio: z
    .string('studio is required')
    .min(3, 'minimum studio must be at least 3 characters')
    .max(50, 'maximum studio must have 50 character')
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
  column_1: z.boolean('column_1 must be a boolean').optional(),
  column_2: z.boolean('column_2 must be a boolean').optional(),
  column_1_title: z
    .string('column_1_title is required')
    .min(1, 'minimum column_1_title must be at least 1 characters')
    .max(100, 'maximum column_1_title must have 100 character')
    .optional(),
  column_2_title: z
    .string('column_2_title is required')
    .min(1, 'minimum column_2_title must be at least 1 characters')
    .max(100, 'maximum column_2_title must have 100 character')
    .optional(),
})
export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>
