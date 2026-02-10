import { Router } from "express"
import { getAllCareProduct } from "../controllers/care_product.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllCareProduct)

export default router