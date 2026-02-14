import { Router } from "express"
import { exportAllergicController, getAllAllergicController, hardDeleteAllergicByIdController, postCreateAllergicController } from "../controllers/allergic.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { allergicSchema } from "../validators/allergic.validator"
import { templateIdParamSchema } from "../validators/template.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllAllergicController)
router.get("/export", verifyAuthToken, authorizeRole(["admin"]), exportAllergicController)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(allergicSchema), postCreateAllergicController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteAllergicByIdController)

export default router