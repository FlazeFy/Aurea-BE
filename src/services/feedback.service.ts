import { findAllFeedbackRepo } from "../repositories/feedback.repository"

export const getAllFeedbackService = async (page: number,limit: number) => {
    // Repo : Find all feedback
    const res = await findAllFeedbackRepo(page, limit)

    if (!res || res.data.length === 0) {
        return null
    }

    return res
}
