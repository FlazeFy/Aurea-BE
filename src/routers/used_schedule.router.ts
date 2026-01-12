import { Router } from "express"
import { hardDeleteUsedScheduleById } from "../controllers/used_schedule.controller"

const router = Router()

router.delete("/:id", hardDeleteUsedScheduleById)

export default router