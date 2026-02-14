import { NextFunction, Request, Response } from "express"
import { getAllDictionaryService, hardDeleteDictionaryByIdService, postCreateDictionaryService } from "../services/dictionary.service"

export const getAllDictionaryController = async (req: Request, res: Response, next: NextFunction) => {
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

export const postCreateDictionaryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Request body
        const { dictionary_name, dictionary_type } = req.body

        // Service : Create dictionary
        const result = await postCreateDictionaryService(dictionary_name, dictionary_type)
        if (!result) throw { code: 500, message: "Something went wrong" }

        // Success response
        return res.status(201).json({
            message: "Dictionary created"
        })
    } catch (error: any) {
        next(error)
    }
}

export const hardDeleteDictionaryByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Param
        const id = req.params.id as string

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