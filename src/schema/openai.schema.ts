import z from 'zod'

export const generateNewsSchema = z.object({
  topic: z
    .string('topic is required')
    .min(10, 'minimum topic must be at least 10 characters')
    .max(150, 'maximum topic must have 150 character'),
})
export type GenerateNewsPayload = z.infer<typeof generateNewsSchema>
