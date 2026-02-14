import { NextFunction, Request, Response } from "express"
import { extractUserFromLocals } from "../helpers/auth.helper"
import { exportAllFeedbackService, getAllFeedbackService, hardDeleteFeedbackByIdService, postCreateFeedbackService } from "../services/feedback.service"

export const getAllFeedbackController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Service : Get all feedback
        const result = await getAllFeedbackService(page, limit)
        if (!result) throw { code: 404, message: "Feedback not found" }

        // Success response
        res.status(200).json({
            message: "Get feedback successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}

export const postCreateFeedbackController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Request body
        const { feedback_rate, feedback_note } = req.body

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Create feedback
        const result = await postCreateFeedbackService(feedback_rate, feedback_note, userId)
        if (!result) throw { code: 500, message: "Something went wrong" }

        // Success response
        return res.status(201).json({
            message: "Feedback sended"
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteFeedbackByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string

        // Service : Hard delete feedback by id
        const result = await hardDeleteFeedbackByIdService(id)
        if (!result) throw { code: 404, message: "Feedback not found" }

        // Success response
        res.status(200).json({
            message: "Delete feedback successful",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}

// Export dataset controller
export const exportFeedbackController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Service : Export history as CSV
        const result = await exportAllFeedbackService()
        if (!result) throw { code: 404, message: "Feedback not found" }

        // Success response
        res.header('Content-Type','text/csv')
        res.attachment('feedback_export_all.csv')
        return res.send(result)
    } catch (error: any) {
        next(error)
    }
}