import express, { Application, Request, Response } from 'express'
import cors from "cors"
import dotenv from "dotenv"

// Router
import feedbackRouter from "./routers/feedback.router"
import historyRouter from "./routers/history.router"

// Load env
dotenv.config()
const PORT: string = process.env.PORT || "5555"

// Initialize express
const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello world")
})

app.use("/api/feedbacks", feedbackRouter)
app.use("/api/histories", historyRouter)

// Start Server
app.listen(PORT, () => {
    console.log(`Apps at http://localhost:${PORT}`)
})
