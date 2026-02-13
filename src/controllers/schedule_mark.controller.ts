import { NextFunction, Request, Response } from "express"
import { extractUserFromLocals } from "../helpers/auth.helper"
import { exportAllScheduleMarkService, getAllScheduleMarkService, hardDeleteScheduleMarkByIdService, postCreateScheduleMarkService } from "../services/schedule_mark.service"

export const getAllScheduleMark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Get user id
        const { userId, role } = extractUserFromLocals(res)

        // Service : Get all schedule mark
        const result = await getAllScheduleMarkService(page, limit, role === "user" ? userId : null)
        if (!result) throw { code: 404, message: "Schedule mark not found" }

        // Success response
        res.status(200).json({
            message: "Get schedule mark successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteScheduleMarkById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Hard delete schedule mark by id
        const result = await hardDeleteScheduleMarkByIdService(id, userId)
        if (!result) throw { code: 404, message: "Schedule mark not found" }

        // Success response
        res.status(200).json({
            message: "Delete schedule mark successful",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}

export const postCreateScheduleMark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Request body
        const { used_schedule_id } = req.body

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Create used schedule
        const result = await postCreateScheduleMarkService(used_schedule_id, userId)
        if (!result) throw { code: 404, message: "Used schedule not found" }

        // Success response
        return res.status(201).json({
            message: "Schedule mark created"
        })
    } catch (error: any) {
        next(error)
    }
}

// Export dataset controller
export const exportScheduleMarkController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Export history as CSV
        const result = await exportAllScheduleMarkService(userId)
        if (!result) throw { code: 404, message: "Schedule mark not found" }

        // Success response
        res.header('Content-Type','text/csv')
        res.attachment(`schedule_mark_export.csv`)
        return res.send(result)
    } catch (error: any) {
        next(error)
    }
}