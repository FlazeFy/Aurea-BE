import { Router } from "express"
import { getCommentByProductIdController, hardDeleteCommentByIdController, postCreateCommentController } from "../controllers/comment.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema, templateProductIdParamSchema } from "../validators/template.validator"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { commentSchema } from "../validators/comment.validator"

const router = Router()

router.get("/:product_id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateProductIdParamSchema), getCommentByProductIdController)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(commentSchema), postCreateCommentController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateIdParamSchema), hardDeleteCommentByIdController)

export default router