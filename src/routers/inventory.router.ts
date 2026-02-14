import { Router } from "express"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { exportInventoryController, getAllInventory, hardDeleteInventoryById, postCreateInventory, putUpdateInventoryByIdController } from "../controllers/inventory.controller"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { inventorySchema, updateInventorySchema } from "../validators/inventory.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user"]), getAllInventory)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(inventorySchema), postCreateInventory)
router.get("/export", verifyAuthToken, authorizeRole(["user"]), exportInventoryController)
router.put("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), validateBodyMiddleware(updateInventorySchema), putUpdateInventoryByIdController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteInventoryById)

export default router