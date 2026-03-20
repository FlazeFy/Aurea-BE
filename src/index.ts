import express, { Application, Request, Response, NextFunction } from 'express'
import cors from "cors"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./lib/swagger"

// Router
import feedbackRouter from "./routers/feedback.router"
import historyRouter from "./routers/history.router"
import dictionaryRouter from "./routers/dictionary.router"
import allergicRouter from "./routers/allergic.router"
import usedScheduleRouter from "./routers/used_schedule.router"
import scheduleMarkRouter from "./routers/schedule_mark.router"
import authRouter from './routers/auth.router'
import careProductRouter from './routers/care_product.router'
import inventoryRouter from './routers/inventory.router'
import commentRouter from './routers/comment.router'
import likeRouter from './routers/like.router'
import { auditError } from './helpers/audit.helper'

// Load env
dotenv.config()
const PORT = process.env.PORT

// Initialize express
const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello world")
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/feedbacks", feedbackRouter)
app.use("/api/v1/histories", historyRouter)
app.use("/api/v1/dictionaries", dictionaryRouter)
app.use("/api/v1/allergics", allergicRouter)
app.use("/api/v1/used_schedules", usedScheduleRouter)
app.use("/api/v1/schedule_marks", scheduleMarkRouter)
app.use("/api/v1/care_products", careProductRouter)
app.use("/api/v1/inventories", inventoryRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)

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
