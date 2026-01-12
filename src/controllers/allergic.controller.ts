import { Request, Response } from "express"
import { hardDeleteAllergicByIdService } from "../services/allergic.service"

export const hardDeleteAllergicById = async (req: Request, res: Response) => {
    try {
        // Param
        const { id } = req.params
        const created_by = null // for now

        // Service : Hard delete allergic by id
        const result = await hardDeleteAllergicByIdService(id, created_by)
        if (!result) {
            return res.status(404).json({
                message: "Allergic not found"
            })
        }

        // Success response
        res.status(200).json({
            message: "Delete allergic successful",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}
