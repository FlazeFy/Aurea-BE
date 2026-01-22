import { Router } from "express"
import { getAllAllergic, hardDeleteAllergicById } from "../controllers/allergic.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllAllergic)
router.delete("/:id", verifyAuthToken, authorizeRole(["user","admin"]), hardDeleteAllergicById)

export default router