import { Request, Response } from "express"
import { hardDeleteScheduleMarkByIdService } from "../services/schedule_mark.service"

export const hardDeleteScheduleMarkById = async (req: Request, res: Response) => {
    try {
        // Param
        const { id } = req.params
        const created_by = null // for now

        // Service : Hard delete schedule mark by id
        const result = await hardDeleteScheduleMarkByIdService(id, created_by)
        if (!result) {
            return res.status(404).json({
                message: "Schedule mark not found"
            })
        }

        // Success response
        res.status(200).json({
            message: "Delete schedule mark successful",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}
