import { Router } from "express"
import { getUsedScheduleByDayController, hardDeleteUsedScheduleByIdController, postCreateUsedScheduleController, putUpdateUsedScheduleByIdController, getAllUsedScheduleController } from "../controllers/used_schedule.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware, validateParamMiddleware } from "../middlewares/validator.middleware"
import { usedScheduleDayParamSchema, usedScheduleSchema } from "../validators/used_schedule.validator"
import { templateIdParamSchema } from "../validators/template.validator"

const router = Router()

router.get("/:day", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(usedScheduleDayParamSchema), getUsedScheduleByDayController)
router.get("/", verifyAuthToken, authorizeRole(["user"]), getAllUsedScheduleController)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(usedScheduleSchema), postCreateUsedScheduleController)
router.put("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), validateBodyMiddleware(usedScheduleSchema), putUpdateUsedScheduleByIdController)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), validateParamMiddleware(templateIdParamSchema), hardDeleteUsedScheduleByIdController)

export default router