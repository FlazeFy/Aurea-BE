import { Router } from "express"
import { hardDeleteScheduleMarkById } from "../controllers/schedule_mark.controller"

const router = Router()

router.delete("/:id", hardDeleteScheduleMarkById)

export default router