import { Request, Response } from "express"
import { extractUserFromAuthHeader } from "../helpers/auth.helper"
import { getAllHistoryService, hardDeleteHistoryByIdService } from "../services/history.service"

export const getAllHistory = async (req: Request, res: Response) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Get user id
        const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)

        // Service : Get all history
        const result = await getAllHistoryService(page, limit, role === "user" ? userId : null)
        if (!result) {
            return res.status(404).json({
                message: "History not found"
            })
        }

        // Success response
        res.status(200).json({
            message: "Get history successful",
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

export const hardDeleteHistoryById = async (req: Request, res: Response) => {
    try {
        // Param
        const { id } = req.params

        // Get user id
        const { userId } = extractUserFromAuthHeader(req.headers.authorization)

        // Service : Hard delete history by id
        const result = await hardDeleteHistoryByIdService(id, userId)
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
