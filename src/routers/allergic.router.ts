import { Router } from "express"
import { hardDeleteAllergicById } from "../controllers/allergic.controller"

const router = Router()

router.delete("/:id", hardDeleteAllergicById)

export default router