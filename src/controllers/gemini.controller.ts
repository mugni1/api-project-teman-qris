import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { generateNewsSchema } from '../schema/global.schema.js'
import { gemini } from '../libs/gemini.js'

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

Jangan gunakan markdown.
Jangan gunakan explanation.
Kembalikan HANYA JSON valid:
{
 "title": "",
 "summary": "",
 "content": "",
 "tags": []
}
`
  try {
    const results = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })
    const text = results.text as string
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '')
    const value = JSON.parse(cleaned.trim())
    response({ res, status: 201, message: 'Berita berhasil dibuat', data: value })
  } catch {
    response({ res, status: 500, message: 'Terjadi kesalahan pada server' })
  }
}
