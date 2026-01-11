import { Router } from "express"
import { hardDeleteHistoryById } from "../controllers/history.controller"

const router = Router()

router.delete("/:id", hardDeleteHistoryById)

export default router