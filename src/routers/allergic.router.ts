import { Router } from "express"
import { getAllAllergic, hardDeleteAllergicById, postCreateAllergic } from "../controllers/allergic.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { allergicSchema } from "../validators/allergic.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllAllergic)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(allergicSchema), postCreateAllergic)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteAllergicById)

export default router