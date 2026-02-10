import { Router } from "express"
import { getAllCareProduct, getCareProductById } from "../controllers/care_product.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllCareProduct)
router.get("/:id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateIdParamSchema), getCareProductById)

export default router