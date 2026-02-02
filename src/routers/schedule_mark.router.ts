import { Router } from "express"
import { getAllScheduleMark, hardDeleteScheduleMarkById } from "../controllers/schedule_mark.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllScheduleMark)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteScheduleMarkById)

export default router