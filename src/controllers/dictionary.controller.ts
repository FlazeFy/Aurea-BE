import { NextFunction, Request, Response } from "express"
import { getAllDictionaryService, hardDeleteDictionaryByIdService } from "../services/dictionary.service"

export const getAllDictionary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Service : Get all dictionary
        const result = await getAllDictionaryService(page, limit)
        if (!result) throw { code: 404, message: "Dictionary not found" }

        // Success response
        res.status(200).json({
            message: "Get dictionary successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteDictionaryByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const { id } = req.params

        // Service : Hard delete dictionary by id
        const result = await hardDeleteDictionaryByIdService(id)
        if (!result) throw { code: 404, message: "Dictionary not found" }

        // Success response
        res.status(200).json({
            message: "Delete dictionary successful",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}