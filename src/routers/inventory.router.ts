import { Router } from "express"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { getAllInventory, hardDeleteInventoryById } from "../controllers/inventory.controller"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user"]), getAllInventory)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteInventoryById)

export default router