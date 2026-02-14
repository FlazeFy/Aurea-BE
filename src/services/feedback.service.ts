import { exportToCSV } from "../helpers/converter.helper"
import { deleteFeedbackByIdRepo, findFeedbackByIdRepo, findAllFeedbackRepo, createFeedbackRepo, findAllFeedbackExportRepo } from "../repositories/feedback.repository"

export const getAllFeedbackService = async (page: number,limit: number) => {
    // Repo : Find all feedback
    const res = await findAllFeedbackRepo(page, limit)
    if (!res || res.data.length === 0) return null

    return res
}

export const hardDeleteFeedbackByIdService = async (id: string) => {
    // Repo : Check if feedback exist
    const feedback = await findFeedbackByIdRepo(id)
    if (!feedback) return null

    // Repo : Delete by id
    await deleteFeedbackByIdRepo(id)

    return feedback
}

// Repo : Create feedback
export const postCreateFeedbackService = async (feedback_rate: number, feedback_note: string, userId: string) => await createFeedbackRepo(feedback_rate, feedback_note, userId)

export const  exportAllFeedbackService = async () => {
    // Repo : Find all feedback
    const res = await findAllFeedbackExportRepo()
    if (!res || res.length === 0) return null

    // Remap for nested object
    const mapped = res.map(item => ({
        feedback_rate: item.feedback_rate,
        feedback_note: item.feedback_note,
        created_at: item.created_at,
        ...({ created_by_username: item.user?.username })
    }))

    // Dataset headers
    const fields = ['feedback_rate','feedback_note','created_at','created_by_username']

    return exportToCSV(mapped, fields)
}