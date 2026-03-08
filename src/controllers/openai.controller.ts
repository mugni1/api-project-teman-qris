import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { generateNewsSchema } from '../schema/openai.schema.js'
import { openai } from '../libs/openapi.js'

export const generateNews = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }
  const { success, error, data } = generateNewsSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({ message: err.message, path: err.path.join('_') }))
    return response({ res, status: 400, message: 'Input tidak valid', errors })
  }

  const prompt = `
Buatkan berita berdasarkan topik berikut:

Topik: ${data.topic}

Format JSON:
{
 "title": "",
 "summary": "",
 "content": "",
 "tags": []
}
`
  try {
    const results = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
    })
    response({ res, status: 201, message: 'Berita berhasil dibuat', data: results.output_text })
  } catch (err: unknown) {
    console.log(err)
    response({ res, status: 500, message: 'Terjadi kesalahan pada server' })
  }
}
