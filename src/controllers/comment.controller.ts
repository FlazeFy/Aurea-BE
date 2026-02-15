import { NextFunction, Request, Response } from "express"
import { getCommentByProductIdService, hardDeleteCommentByIdService, postCreateCommentService } from "../services/comment.service"
import { extractUserFromLocals } from "../helpers/auth.helper"

export const getCommentByProductIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const product_id = req.params.product_id as string

        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Service : Get all comment
        const result = await getCommentByProductIdService(page, limit, product_id)
        if (!result) throw { code: 404, message: "Comment not found" }

        // Success response
        res.status(200).json({
            message: "Get comment successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}

export const postCreateCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Request body
        const { care_product_id, comment_body } = req.body

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Create comment
        const result = await postCreateCommentService(comment_body, care_product_id, userId)
        if (!result) throw { code: 500, message: "Something went wrong" }

        // Success response
        return res.status(201).json({
            message: "Comment created"
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteCommentByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string

        // Get user id
        const { userId, role } = extractUserFromLocals(res)

        // Service : Hard delete comment by id
        const result = await hardDeleteCommentByIdService(id, role === "admin" ? null : userId)
        if (!result) throw { code: 404, message: "Comment not found" }

        // Success response
        res.status(200).json({
            message: "Delete comment successful",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}