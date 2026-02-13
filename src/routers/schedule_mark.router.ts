import { Router } from "express"
import { exportScheduleMarkController, getAllScheduleMark, hardDeleteScheduleMarkById, postCreateScheduleMark } from "../controllers/schedule_mark.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { scheduleMarkSchema } from "../validators/schedule_mark.validator"
import { templateIdParamSchema } from "../validators/template.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllScheduleMark)
router.get("/export", verifyAuthToken, authorizeRole(["user"]), exportScheduleMarkController)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(scheduleMarkSchema), postCreateScheduleMark)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteScheduleMarkById)

export default router