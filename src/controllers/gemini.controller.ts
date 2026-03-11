import { Request, Response } from 'express'
import { response } from '../utils/response.js'
import { generateNewsSchema } from '../schema/global.schema.js'
import { gemini } from '../libs/gemini.js'

const MODEL_V1 = 'gemini-3.1-flash-lite-preview'
const MODEL_V2 = 'gemini-2.5-flash-lite'
const MODEL_V3 = 'gemini-2.5-flash'

const models = [MODEL_V1, MODEL_V2, MODEL_V3]

async function generateWithFallback(prompt: string) {
  let lastError: unknown
  for (const model of models) {
    try {
      console.log(`Trying model: ${model}`)
      const result = await gemini.models.generateContent({
        model,
        contents: prompt,
      })
      console.log(`Success using model: ${model}`)
      return result.text
    } catch (err) {
      console.log(`Model failed: ${model}`)
      lastError = err
    }
  }
  throw lastError
}

export const generateNews = async (req: Request, res: Response) => {
  const body = req.body
  if (!body) {
    return response({ res, status: 400, message: 'Input tidak valid.' })
  }
  const { success, error, data } = generateNewsSchema.safeParse(body)
  if (!success) {
    const errors = error.issues.map((err) => ({
      message: err.message,
      path: err.path.join('_'),
    }))
    return response({ res, status: 400, message: 'Input tidak valid', errors })
  }

  const prompt = `
Buatkan berita berdasarkan topik berikut.

Topik: ${data.topic}

Aturan:
- Jangan gunakan markdown
- Jangan gunakan explanation
- Kembalikan HANYA JSON valid

Struktur JSON:
{
 "title": "",
 "summary": "",
 "content": "",
}

Ketentuan:
- content minimal 5000 kata.
- content maximal 100000 kata.
- content boleh menggunakan tag html, p, h1, h2, h3, undeline, bold, miring, link dan boleh menggunakan warna teks dan background warna teks karena digunakan di react-quill dan vue-quill.
`

  try {
    const text = await generateWithFallback(prompt)
    const cleaned = (text as string)
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()
    const value = JSON.parse(cleaned)
    return response({
      res,
      status: 201,
      message: 'Berita berhasil dibuat',
      data: value,
    })
  } catch (err) {
    console.log(err)
    return response({
      res,
      status: 500,
      message: 'Semua model AI gagal digunakan',
    })
  }
}
