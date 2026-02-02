import { NextFunction, Request, Response } from "express"
import { hardDeleteUsedScheduleByIdService } from "../services/used_schedule.service"

export const hardDeleteUsedScheduleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const { id } = req.params
        const created_by = null // for now

        // Service : Hard delete used schedule by id
        const result = await hardDeleteUsedScheduleByIdService(id, created_by)
        if (!result) throw { code: 404, message: "Used schedule not found" }

        // Success response
        res.status(200).json({
            message: "Delete used schedule successful",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}