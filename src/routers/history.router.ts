import { Router } from "express"
import { getAllHistory, hardDeleteHistoryById } from "../controllers/history.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllHistory)
router.delete("/:id", verifyAuthToken, authorizeRole(["user","admin"]), hardDeleteHistoryById)

export default router