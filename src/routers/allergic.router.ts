import { Router } from "express"
import { exportAllergicController, getAllAllergic, hardDeleteAllergicById, postCreateAllergic } from "../controllers/allergic.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { allergicSchema } from "../validators/allergic.validator"
import { templateIdParamSchema } from "../validators/template.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllAllergic)
router.get("/export", verifyAuthToken, authorizeRole(["admin"]), exportAllergicController)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(allergicSchema), postCreateAllergic)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteAllergicById)

export default router