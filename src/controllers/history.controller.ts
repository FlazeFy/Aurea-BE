import { NextFunction, Request, Response } from "express"
import { extractUserFromLocals } from "../helpers/auth.helper"
import { exportAllHistoryService, getAllHistoryService, hardDeleteAllHistoryService, hardDeleteHistoryByIdService } from "../services/history.service"

export const getAllHistoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Get user id
        const { userId, role } = extractUserFromLocals(res)

        // Service : Get all history
        const result = await getAllHistoryService(page, limit, role === "user" ? userId : null)
        if (!result) throw { code: 404, message: "History not found" }

        // Success response
        res.status(200).json({
            message: "Get history successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteHistoryByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Hard delete history by id
        const result = await hardDeleteHistoryByIdService(id, userId)
        if (!result) throw { code: 404, message: "History not found" }

        // Success response
        res.status(200).json({
            message: "Delete history successful"
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteAllHistoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Hard delete history by id
        const result = await hardDeleteAllHistoryService(userId)
        if (!result) throw { code: 404, message: "History not found" }

        // Success response
        res.status(200).json({
            message: "Delete all history successful"
        })
    } catch (error: any) {
        next(error)
    }
}

// Export dataset controller
export const exportHistoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user id
        const { userId, role } = extractUserFromLocals(res)

        // Service : Export history as CSV
        const result = await exportAllHistoryService(role === "user" ? userId : null)
        if (!result) throw { code: 404, message: "History not found" }

        // Success response
        res.header('Content-Type','text/csv')
        res.attachment(`history_export${role === 'admin' ? '_all':''}.csv`)
        return res.send(result)
    } catch (error: any) {
        next(error)
    }
}