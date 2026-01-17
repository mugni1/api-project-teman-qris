import expess, { Request, Response } from "express"
import cors from "cors"
import { response } from "./utils/response.js"

// init
const app = expess()
app.use(cors())

// routes
app.get("/", (_: Request, res: Response) => {
    response({ res, message: "Hello World", status: 200 })
})

// listen
const HOST = "0.0.0.0"
const PORT = 5051
app.listen(PORT, HOST, () => console.log("Server up and running on "))

export default app

