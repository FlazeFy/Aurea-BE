import { Router } from "express"
import { getAllHistory, hardDeleteAllHistory, hardDeleteHistoryById } from "../controllers/history.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllHistory)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteHistoryById)
router.delete("/", verifyAuthToken, authorizeRole(["user"]), hardDeleteAllHistory)

export default router