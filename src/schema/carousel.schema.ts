import z from 'zod'

export const createCarouselSchema = z.object({
  title: z
    .string('title is required')
    .min(1, 'minimum title must be at least 1 characters')
    .max(150, 'maximum title must have 150 character'),
  description: z
    .string('description is required')
    .min(10, 'minimum description must be at least 10 characters')
    .max(150, 'maximum description must have 150 character'),
  image_url: z
    .string('image_url is required')
    .min(1, 'minimum image_url must be at least 1 characters')
    .max(500, 'maximum image_url must have 500 character'),
  link: z
    .string('link is required')
    .min(1, 'minimum link must be at least 1 characters')
    .max(500, 'maximum link must have 500 character'),
  is_active: z.boolean('is_active must be a boolean'),
})
export type CreateCarouselPayload = z.infer<typeof createCarouselSchema>

export const updateCarouselSchema = z.object({
  title: z
    .string('title is required')
    .min(1, 'minimum title must be at least 1 characters')
    .max(150, 'maximum title must have 150 character')
    .optional(),
  description: z
    .string('description is required')
    .min(10, 'minimum description must be at least 10 characters')
    .max(150, 'maximum description must have 150 character')
    .optional(),
  image_url: z
    .string('image_url is required')
    .min(1, 'minimum image_url must be at least 1 characters')
    .max(500, 'maximum image_url must have 500 character')
    .optional(),
  link: z
    .string('link is required')
    .min(1, 'minimum link must be at least 1 characters')
    .max(500, 'maximum link must have 500 character')
    .optional(),
  is_active: z.boolean('is_active must be a boolean').optional(),
})
export type UpdateCarouselPayload = z.infer<typeof updateCarouselSchema>
