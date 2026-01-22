import { Request, Response } from "express"
import { getAllDictionaryService, hardDeleteDictionaryByIdService } from "../services/dictionary.service"

export const getAllDictionary = async (req: Request, res: Response) => {
    try {
        // Query params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 14

        // Service : Get all dictionary
        const result = await getAllDictionaryService(page, limit)
        if (!result) {
            return res.status(404).json({
                message: "Dictionary not found"
            })
        }

        // Success response
        res.status(200).json({
            message: "Get dictionary successful",
            data: result.data,
            meta: {
                page, limit, total: result.total, total_page: Math.ceil(result.total / limit),
            },
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}

export const hardDeleteDictionaryByIdController = async (req: Request, res: Response) => {
    try {
        // Param
        const { id } = req.params

        // Service : Hard delete dictionary by id
        const result = await hardDeleteDictionaryByIdService(id)
        if (!result) {
            return res.status(404).json({
                message: "Dictionary not found"
            })
        }

        // Success response
        res.status(200).json({
            message: "Delete dictionary successful",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}