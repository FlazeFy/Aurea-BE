import { NextFunction, Request, Response } from "express"
import { extractUserFromAuthHeader } from "../helpers/auth.helper"
import { getAllScheduleMarkService, hardDeleteScheduleMarkByIdService, postCreateScheduleMarkService } from "../services/schedule_mark.service"

export const getAllScheduleMark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Get user id
        const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)

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
        const { id } = req.params
        const created_by = null // for now

        // Service : Hard delete schedule mark by id
        const result = await hardDeleteScheduleMarkByIdService(id, created_by)
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
        const { userId } = extractUserFromAuthHeader(req.headers.authorization)

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