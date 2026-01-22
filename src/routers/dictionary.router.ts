import { Router } from "express"
import { getAllDictionary, hardDeleteDictionaryByIdController } from "../controllers/dictionary.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.get("/", getAllDictionary)
router.delete("/:id", verifyAuthToken, authorizeRole(["admin"]), hardDeleteDictionaryByIdController)

export default router