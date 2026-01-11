import { Request, Response } from "express"
import { hardDeleteHistoryByIdService } from "../services/history.service"

export const hardDeleteHistoryById = async (req: Request, res: Response) => {
    try {
        // Param
        const { id } = req.params
        const created_by = null // for now

        // Service : Hard delete history by id
        const result = await hardDeleteHistoryByIdService(id, created_by)
        if (!result) {
            return res.status(404).json({
                message: "History not found"
            })
        }

        // Success response
        res.status(200).json({
            message: "Delete history successful",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}
