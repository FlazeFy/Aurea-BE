import { Router } from "express"
import { exportHistoryController, getAllHistoryController, hardDeleteAllHistoryController, hardDeleteHistoryByIdController } from "../controllers/history.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllHistoryController)
router.get("/export", verifyAuthToken, authorizeRole(["admin","user"]), exportHistoryController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteHistoryByIdController)
router.delete("/", verifyAuthToken, authorizeRole(["user"]), hardDeleteAllHistoryController)

export default router