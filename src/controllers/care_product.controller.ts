import { NextFunction, Request, Response } from "express"
import { getAllCareProductService } from "../services/care_product.service"

export const getAllCareProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14
        const search = typeof req.query.search === 'string' ? req.query.search.trim() : null
        const product_category = typeof req.query.product_category === 'string' ? req.query.product_category.trim() : null
        const product_type = typeof req.query.product_type === 'string' ? req.query.product_type.trim() : null

        // Service : Get all care product
        const result = await getAllCareProductService(page, limit, search, product_category !== 'all' ? product_category : null, product_type !== 'all' ? product_type : null)
        if (!result) throw { code: 404, message: "Care product not found" }

        // Success response
        res.status(200).json({
            message: "Get care product successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}