import { Router } from "express"
import { exportScheduleMarkController, getAllScheduleMarkController, hardDeleteScheduleMarkByIdController, postCreateScheduleMarkController } from "../controllers/schedule_mark.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { scheduleMarkSchema } from "../validators/schedule_mark.validator"
import { templateIdParamSchema } from "../validators/template.validator"

const router = Router()

router.get("/", verifyAuthToken, authorizeRole(["user","admin"]), getAllScheduleMarkController)
router.get("/export", verifyAuthToken, authorizeRole(["user"]), exportScheduleMarkController)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(scheduleMarkSchema), postCreateScheduleMarkController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteScheduleMarkByIdController)

export default router