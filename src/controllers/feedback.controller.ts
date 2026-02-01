import { NextFunction, Request, Response } from "express"
import { getAllFeedbackService, hardDeleteFeedbackByIdService } from "../services/feedback.service"

export const getAllFeedback = async (req: Request, res: Response, next: NextFunction) => {
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

export const hardDeleteFeedbackById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const { id } = req.params

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
