import { Router } from "express"
import { getCommentByProductIdController } from "../controllers/comment.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateProductIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"

const router = Router()

router.get("/:product_id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateProductIdParamSchema), getCommentByProductIdController)

export default router