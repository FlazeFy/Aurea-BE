import { Router } from "express"
import { getAllFeedback, hardDeleteFeedbackById, postCreateFeedback } from "../controllers/feedback.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { feedbackSchema } from "../validators/feedback.validator"

const router = Router()

router.get("/", getAllFeedback)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(feedbackSchema), postCreateFeedback)
router.delete("/:id", verifyAuthToken, authorizeRole(["admin"]), hardDeleteFeedbackById)

export default router