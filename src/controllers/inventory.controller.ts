import { NextFunction, Request, Response } from "express"
import { getAllInventoryService, hardDeleteInventoryByIdService } from "../services/inventory.service"
import { extractUserFromLocals } from "../helpers/auth.helper"

export const getAllInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14
        const search = typeof req.query.search === 'string' ? req.query.search.trim() : null
        const product_category = typeof req.query.product_category === 'string' ? req.query.product_category.trim() : null
        const product_type = typeof req.query.product_type === 'string' ? req.query.product_type.trim() : null

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Get all inventory
        const result = await getAllInventoryService(page, limit, search, product_category !== 'all' ? product_category : null, product_type !== 'all' ? product_type : null, userId)
        if (!result) throw { code: 404, message: "Inventory not found" }

        // Success response
        res.status(200).json({
            message: "Get inventory successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteInventoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string

        // Get user id
        const { userId } = extractUserFromLocals(res)

        // Service : Hard delete inventory by id
        const result = await hardDeleteInventoryByIdService(id, userId)
        if (!result) throw { code: 404, message: "Inventory not found" }

        // Success response
        res.status(200).json({
            message: "Delete inventory successful",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}