import { Router } from "express"
import { getAllHistory, hardDeleteAllHistory, hardDeleteHistoryById } from "../controllers/history.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { templateIdParamSchema } from "../validators/template.validator"
import { validateParamMiddleware } from "../middlewares/validator.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllHistory)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteHistoryById)
router.delete("/", verifyAuthToken, authorizeRole(["user"]), hardDeleteAllHistory)

export default router