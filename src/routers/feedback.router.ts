import { Router } from "express"
import { getAllFeedback } from "../controllers/feedback.controller"

const router = Router()

router.get("/", getAllFeedback)

export default router