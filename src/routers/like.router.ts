import { Router } from "express"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateProductIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"
import { getLikeByProductIdController } from "../controllers/like.controller"

const router = Router()

router.get("/:product_id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateProductIdParamSchema), getLikeByProductIdController)

export default router