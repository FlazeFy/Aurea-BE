import { Router } from "express"
import { getAllDictionary, hardDeleteDictionaryByIdController, postCreateDictionaryController } from "../controllers/dictionary.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { dictionarySchema } from "../validators/dictionary.validator"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"

const router = Router()

router.get("/", getAllDictionary)
router.post("/", verifyAuthToken, authorizeRole(["admin"]), validateBodyMiddleware(dictionarySchema), postCreateDictionaryController)
router.delete("/:id", verifyAuthToken, authorizeRole(["admin"]), hardDeleteDictionaryByIdController)

export default router