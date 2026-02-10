import { Router } from "express"
import { getUsedScheduleByDay, hardDeleteUsedScheduleById, postCreateUsedSchedule, putUpdateUsedScheduleById, getAllUsedSchedule } from "../controllers/used_schedule.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { usedScheduleSchema } from "../validators/used_schedule.validator"

const router = Router()

router.get("/:day", verifyAuthToken, authorizeRole(["user"]), getUsedScheduleByDay)
router.get("/", verifyAuthToken, authorizeRole(["user"]), getAllUsedSchedule)
router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(usedScheduleSchema), postCreateUsedSchedule)
router.put("/:id", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(usedScheduleSchema), putUpdateUsedScheduleById)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteUsedScheduleById)

export default router