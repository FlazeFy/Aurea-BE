import { Request, Response } from "express"
import { hardDeleteUsedScheduleByIdService } from "../services/used_schedule.service"

export const hardDeleteUsedScheduleById = async (req: Request, res: Response) => {
    try {
        // Param
        const { id } = req.params
        const created_by = null // for now

        // Service : Hard delete used schedule by id
        const result = await hardDeleteUsedScheduleByIdService(id, created_by)
        if (!result) {
            return res.status(404).json({
                message: "Used schedule not found"
            })
        }

        // Success response
        res.status(200).json({
            message: "Delete used schedule successful",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}
