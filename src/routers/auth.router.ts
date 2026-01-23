import { Router } from "express"
import { getMyProfile, getRefreshToken, postLogin } from "../controllers/auth.controller"
import { verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.post("/login", postLogin)
router.get("/refresh-token", verifyAuthToken, getRefreshToken)
router.get("/profile", verifyAuthToken, getMyProfile)

export default router