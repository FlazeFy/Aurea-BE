import { Router } from "express"
import { getMyProfile, getRefreshToken, postLogin } from "../controllers/auth.controller"
import { verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { authSchema } from "../validators/auth.validator"

const router = Router()

router.post("/login", validateBodyMiddleware(authSchema), postLogin)
router.get("/refresh-token", verifyAuthToken, getRefreshToken)
router.get("/profile", verifyAuthToken, getMyProfile)

export default router