import { Router } from "express"
import { getAllCareProduct, getCareProductById, postCreateCareProduct } from "../controllers/care_product.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { careProductSchema } from "../validators/care_product.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllCareProduct)
router.post("/", verifyAuthToken, authorizeRole(["user","admin"]), validateBodyMiddleware(careProductSchema), postCreateCareProduct)
router.get("/:id", verifyAuthToken, authorizeRole(["user","admin"]), validateParamMiddleware(templateIdParamSchema), getCareProductById)

export default router