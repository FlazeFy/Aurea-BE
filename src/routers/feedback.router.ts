import { Router } from "express"
import { getAllFeedback, hardDeleteFeedbackById, postCreateFeedback } from "../controllers/feedback.controller"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { feedbackSchema } from "../validators/feedback.validator"

const router = Router()

router.get("/", getAllFeedback)
router.post("/", validateBodyMiddleware(feedbackSchema), postCreateFeedback)
router.delete("/:id", hardDeleteFeedbackById)

export default router