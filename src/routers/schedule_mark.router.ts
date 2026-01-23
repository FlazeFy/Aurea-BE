import { Router } from "express"
import { getAllScheduleMark, hardDeleteScheduleMarkById } from "../controllers/schedule_mark.controller"

const router = Router()

router.get("/", getAllScheduleMark)
router.delete("/:id", hardDeleteScheduleMarkById)

export default router