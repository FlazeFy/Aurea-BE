import { Router } from "express"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { getAllInventory } from "../controllers/inventory.controller"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user"]), getAllInventory)

export default router