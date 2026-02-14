import { Router } from "express"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { exportInventoryController, getAllInventory, hardDeleteInventoryById, postCreateInventory } from "../controllers/inventory.controller"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { inventorySchema } from "../validators/inventory.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user"]), getAllInventory)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(inventorySchema), postCreateInventory)
router.get("/export", verifyAuthToken, authorizeRole(["user"]), exportInventoryController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteInventoryById)

export default router