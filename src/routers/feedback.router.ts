import { Router } from "express"
import { getAllFeedback, hardDeleteFeedbackById } from "../controllers/feedback.controller"

const router = Router()

router.get("/", getAllFeedback)
router.delete("/:id", hardDeleteFeedbackById)

export default router