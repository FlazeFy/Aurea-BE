import { deleteFeedbackByIdRepo, findFeedbackByIdRepo, findAllFeedbackRepo, createFeedbackRepo } from "../repositories/feedback.repository"

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

export const postCreateFeedbackService = async (feedback_rate: number, feedback_note: string, userId: string) => {
    // Repo : Create feedback
    return await createFeedbackRepo(feedback_rate, feedback_note, userId)
}
