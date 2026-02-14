import { Router } from "express"
import { exportFeedbackController, getAllFeedbackController, hardDeleteFeedbackByIdController, postCreateFeedbackController } from "../controllers/feedback.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { feedbackSchema } from "../validators/feedback.validator"
import { templateIdParamSchema } from "../validators/template.validator"

const router = Router()

router.get("/", getAllFeedbackController)
router.get("/export", verifyAuthToken, authorizeRole(["admin"]), exportFeedbackController)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(feedbackSchema), postCreateFeedbackController)
router.delete("/:id", verifyAuthToken, authorizeRole(["admin"]), validateParamMiddleware(templateIdParamSchema), hardDeleteFeedbackByIdController)

export default router