import { NextFunction, Request, Response } from "express"
import { getLikeByProductIdService } from "../services/like.service"

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