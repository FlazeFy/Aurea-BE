import { Router } from "express"
import { exportFeedbackController, getAllFeedback, hardDeleteFeedbackById, postCreateFeedback } from "../controllers/feedback.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { feedbackSchema } from "../validators/feedback.validator"
import { templateIdParamSchema } from "../validators/template.validator"

const router = Router()

router.get("/", getAllFeedback)
router.get("/export", verifyAuthToken, authorizeRole(["admin"]), exportFeedbackController)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(feedbackSchema), postCreateFeedback)
router.delete("/:id", verifyAuthToken, authorizeRole(["admin"]), validateParamMiddleware(templateIdParamSchema), hardDeleteFeedbackById)

export default router