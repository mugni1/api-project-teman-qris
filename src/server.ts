import expess, { Response } from 'express'
import fileUpload from 'express-fileupload'
import { response } from './utils/response.js'
import cors from 'cors'
import IndexRoute from './routes/index.route.js'
import AuthRoute from './routes/auth.route.js'
import ItemRoute from './routes/item.route.js'
import WebhookRoute from './routes/webhook.route.js'
import OrderRoute from './routes/order.route.js'
import NewsRoute from './routes/news.route.js'
import StorageRoute from './routes/upload.route.js'
import DigiflazzRoute from './routes/digiflazz.route.js'
import VipRoute from './routes/vip.route.js'
import CategoryRoute from './routes/category.route.js'

// init
const app = expess()
app.use(expess.json())
app.use(
  fileUpload({
    limits: { fileSize: 4 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
  }),
)
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://pos.v2.mugni.my.id',
      'https://app.v2.mugni.my.id',
      'http://192.168.43.161:5173',
      'http://192.168.43.160:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)

// routes
app.use(IndexRoute)
app.use('/auth', AuthRoute)
app.use('/item', ItemRoute)
app.use('/order', OrderRoute)
app.use('/webhook', WebhookRoute)
app.use('/news', NewsRoute)
app.use('/upload', StorageRoute)
app.use('/digiflazz', DigiflazzRoute)
app.use('/vip', VipRoute)
app.use('/category', CategoryRoute)
app.use((_, res: Response) => response({ res, status: 404, message: 'Route not found' }))

// listen
const HOST = '0.0.0.0'
const PORT = 5051
app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`))

export default app
