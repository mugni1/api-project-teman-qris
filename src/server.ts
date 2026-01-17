import expess, { Response } from "express"
import { response } from "./utils/response.js"
import cors from "cors"
import IndexRoute from "./routes/index.route.js"

// init
const app = expess()
app.use(cors())

// routes
app.use(IndexRoute)
app.use((_, res: Response) => response({ res, status: 404, message: "Route not found" }));

// listen
const HOST = "0.0.0.0"
const PORT = 5051
app.listen(PORT, HOST, () => console.log("Server up and running on "))

export default app

