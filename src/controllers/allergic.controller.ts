import { NextFunction, Request, Response } from "express"
import { extractUserFromLocals } from "../helpers/auth.helper"
import { exportAllAllergicService, getAllAllergicService, hardDeleteAllergicByIdService, postCreateAllergicService } from "../services/allergic.service"

export const getAllAllergic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Get all allergic
        const result = await getAllAllergicService(page, limit, userId)
        if (!result) throw { code: 404, message: "Allergic not found" }

        // Success response
        res.status(200).json({
            message: "Get allergic successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}

export const postCreateAllergic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Request body
        const { allergic_context, allergic_desc } = req.body

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Create allergic
        const result = await postCreateAllergicService(allergic_context, allergic_desc, userId)
        if (!result) throw { code: 500, message: "Something went wrong" }

        // Success response
        return res.status(201).json({
            message: "Allergic created"
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteAllergicById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string
        const created_by = null // for now

        // Service : Hard delete allergic by id
        const result = await hardDeleteAllergicByIdService(id, created_by)
        if (!result) throw { code: 404, message: "Allergic not found" }

        // Success response
        res.status(200).json({
            message: "Delete allergic successful",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}

// Export dataset controller
export const exportAllergicController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Service : Export history as CSV
        const result = await exportAllAllergicService()
        if (!result) throw { code: 404, message: "Allergic not found" }

        // Success response
        res.header('Content-Type','text/csv')
        res.attachment('allergic_export_all.csv')
        return res.send(result)
    } catch (error: any) {
        next(error)
    }
}