import { Router } from "express"
import { getUsedScheduleByDay, hardDeleteUsedScheduleById, postCreateUsedSchedule, putUpdateUsedScheduleById, getAllUsedSchedule } from "../controllers/used_schedule.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { usedScheduleDayParamSchema, usedScheduleSchema } from "../validators/used_schedule.validator"
import { templateIdParamSchema } from "../validators/template.validator"

const router = Router()

router.get("/:day", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(usedScheduleDayParamSchema), getUsedScheduleByDay)
router.get("/", verifyAuthToken, authorizeRole(["user"]), getAllUsedSchedule)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(usedScheduleSchema), postCreateUsedSchedule)
router.put("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), validateBodyMiddleware(usedScheduleSchema), putUpdateUsedScheduleById)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteUsedScheduleById)

export default router