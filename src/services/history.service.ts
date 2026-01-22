import { findHistoryByIdRepo, hardDeleteHistoryByIdRepo } from "../repositories/history.repository"

export const hardDeleteHistoryByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find history by id
    const history = await findHistoryByIdRepo(id)
    if (!history) {
        return null
    }

    // Repo : Delete history by id
    await hardDeleteHistoryByIdRepo(id, created_by)

    return history
}