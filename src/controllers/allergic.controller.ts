import { Request, Response } from "express"
import { extractUserFromAuthHeader } from "../helpers/auth.helper"
import { getAllAllergicService, hardDeleteAllergicByIdService } from "../services/allergic.service"

export const getAllAllergic = async (req: Request, res: Response) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Get user id
        const { userId } = extractUserFromAuthHeader(req.headers.authorization)

        // Service : Get all allergic
        const result = await getAllAllergicService(page, limit, userId)
        if (!result) {
            return res.status(404).json({
                message: "Allergic not found"
            })
        }

        // Success response
        res.status(200).json({
            message: "Get allergic successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}

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
