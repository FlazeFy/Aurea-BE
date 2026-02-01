import express, { Application, Request, Response, NextFunction } from 'express'
import cors from "cors"
import dotenv from "dotenv"

// Router
import feedbackRouter from "./routers/feedback.router"
import historyRouter from "./routers/history.router"
import dictionaryRouter from "./routers/dictionary.router"
import allergicRouter from "./routers/allergic.router"
import usedScheduleRouter from "./routers/used_schedule.router"
import scheduleMarkRouter from "./routers/schedule_mark.router"
import authRouter from './routers/auth.router'
import { auditError } from './helpers/audit.helper'

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

app.use("/api/auth", authRouter)
app.use("/api/feedbacks", feedbackRouter)
app.use("/api/histories", historyRouter)
app.use("/api/dictionaries", dictionaryRouter)
app.use("/api/allergics", allergicRouter)
app.use("/api/used_schedule", usedScheduleRouter)
app.use("/api/schedule_mark", scheduleMarkRouter)

app.use(( err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.code || err.status || 500

    if (statusCode === 500) {
        auditError(err, req)

        return res.status(500).json({
            message: "Something went wrong",
        })
    }

    return res.status(statusCode).json({
        message: err.message,
    })
})


// Start Server
app.listen(PORT, () => {
    console.log(`Apps at http://localhost:${PORT}`)
})
