import { Router } from "express"
import { getRefreshToken, postLogin } from "../controllers/auth.controller"

const router = Router()

router.post("/login", postLogin)
router.get("/refresh-token", getRefreshToken)

export default router