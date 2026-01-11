import { Router } from "express"
import { getAllDictionary } from "../controllers/dictionary.controller"

const router = Router()

router.get("/", getAllDictionary)

export default router