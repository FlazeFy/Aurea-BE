import { Router } from "express"
import { hardDeleteUsedScheduleById, postCreateUsedSchedule } from "../controllers/used_schedule.controller"
import { authorizeRole, verifyAuthToken } from "../middlewares/auth.middleware"
import { validateBodyMiddleware } from "../middlewares/validator.middleware"
import { usedScheduleSchema } from "../validators/used_schedule.validator"

const router = Router()

router.post("/", verifyAuthToken, authorizeRole(["user"]), validateBodyMiddleware(usedScheduleSchema), postCreateUsedSchedule)
router.delete("/:id", verifyAuthToken, authorizeRole(["user"]), hardDeleteUsedScheduleById)

export default router