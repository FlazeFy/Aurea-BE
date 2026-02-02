import { Router } from "express"
import { hardDeleteUsedScheduleById } from "../controllers/used_schedule.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"

const router = Router()

router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteUsedScheduleById)

export default router