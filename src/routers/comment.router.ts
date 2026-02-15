import { Router } from "express"
import { getCommentByProductIdController, hardDeleteCommentByIdController } from "../controllers/comment.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema, templateProductIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"

const router = Router()

router.get("/:product_id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateProductIdParamSchema), getCommentByProductIdController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateIdParamSchema), hardDeleteCommentByIdController)

export default router