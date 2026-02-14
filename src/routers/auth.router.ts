import { Router } from "express"
import { getMyProfileController, getRefreshTokenController, postLoginController } from "../controllers/auth.controller"
import { verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { authSchema } from "../validators/auth.validator"

const router = Router()

router.post("/login", validateBodyMiddleware(authSchema), postLoginController)
router.get("/refresh-token", verifyAuthToken, getRefreshTokenController)
router.get("/profile", verifyAuthToken, getMyProfileController)

export default router