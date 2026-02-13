import { Router } from "express"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { exportInventoryController, getAllInventory, hardDeleteInventoryById } from "../controllers/inventory.controller"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user"]), getAllInventory)
router.get("/export", verifyAuthToken, authorizeRole(["user"]), exportInventoryController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteInventoryById)

export default router