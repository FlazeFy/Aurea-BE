import { Router } from "express"
import { getAllCareProduct, getCareProductById } from "../controllers/care_product.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllCareProduct)
router.get("/:id", verifyAuthToken, authorizeRole(["user","admin"]), getCareProductById)

export default router