import { Router } from "express"
import { getAllCareProductController, getCareProductByIdController, postCreateCareProductController } from "../controllers/care_product.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { careProductSchema } from "../validators/care_product.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllCareProductController)
router.post("/", verifyAuthToken, authorizeRole(["user","admin"]), validateBodyMiddleware(careProductSchema), postCreateCareProductController)
router.get("/:id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateIdParamSchema), getCareProductByIdController)

export default router