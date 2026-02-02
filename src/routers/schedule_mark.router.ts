import { Router } from "express"
import { getAllScheduleMark, hardDeleteScheduleMarkById, postCreateScheduleMark } from "../controllers/schedule_mark.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { scheduleMarkSchema } from "../validators/schedule_mark.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllScheduleMark)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(scheduleMarkSchema), postCreateScheduleMark)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteScheduleMarkById)

export default router