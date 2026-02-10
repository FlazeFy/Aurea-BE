import { NextFunction, Request, Response } from "express"
import { extractUserFromLocals } from "../helpers/auth.helper"
import { getAllUsedScheduleService, getUsedScheduleByDayService, hardDeleteUsedScheduleByIdService, postCreateUsedScheduleService, putUpdateUsedScheduleByIdService } from "../services/used_schedule.service"

export const hardDeleteUsedScheduleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string
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

export const getUsedScheduleByDay = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Params
        const day = req.params.day as string

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Get used schedule by day
        const result = await getUsedScheduleByDayService(day, userId)
        if (!result) throw { code: 404, message: "Used schedule not found" }

        // Success response
        return res.status(200).json({
            message: "Get used schedule successful",
            data: result
        })
    } catch (error: any) {
        next(error)
    }
}

export const getAllUsedSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Get all used schedule
        const result = await getAllUsedScheduleService(userId)
        if (!result) throw { code: 404, message: "Used schedule not found" }

        // Success response
        return res.status(200).json({
            message: "Get used schedule successful",
            data: result
        })
    } catch (error: any) {
        next(error)
    }
}

export const postCreateUsedSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Request body
        const { inventory_id, day_name, time, schedule_note } = req.body

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Create used schedule
        const result = await postCreateUsedScheduleService(inventory_id, day_name, time, schedule_note, userId)
        if (!result) throw { code: 404, message: "Inventory id not found" }

        // Success response
        return res.status(201).json({
            message: "Used schedule created"
        })
    } catch (error: any) {
        next(error)
    }
}

export const putUpdateUsedScheduleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string

        // Request body
        const { inventory_id, day_name, time, schedule_note } = req.body

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Create used schedule
        const result = await putUpdateUsedScheduleByIdService(id, inventory_id, day_name, time, schedule_note, userId)
        if (!result) throw { code: 404, message: "Used schedule not found" }

        // Success response
        return res.status(200).json({
            message: "Used schedule updated"
        })
    } catch (error: any) {
        next(error)
    }
}