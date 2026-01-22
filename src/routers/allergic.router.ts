import { Router } from "express"
import { getAllAllergic, hardDeleteAllergicById } from "../controllers/allergic.controller"

const router = Router()

router.get("/", getAllAllergic)
router.delete("/:id", hardDeleteAllergicById)

export default router