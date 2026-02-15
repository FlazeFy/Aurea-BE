import { NextFunction, Request, Response } from "express"
import { getLikeByProductIdService, hardDeleteLikeByProductIdService } from "../services/like.service"
import { extractUserFromLocals } from "../helpers/auth.helper"

export const getLikeByProductIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const product_id = req.params.product_id as string

        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 25

        // Service : Get all like
        const result = await getLikeByProductIdService(page, limit, product_id)
        if (!result) throw { code: 404, message: "Like not found" }

        // Success response
        res.status(200).json({
            message: "Get like successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteLikeByProductIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const product_id = req.params.product_id as string

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Hard delete like by product id
        const result = await hardDeleteLikeByProductIdService(product_id, userId)
        if (!result) throw { code: 404, message: "Like not found" }

        // Success response
        res.status(200).json({
            message: "Delete like successful"
        })
    } catch (error: any) {
        next(error)
    }
}