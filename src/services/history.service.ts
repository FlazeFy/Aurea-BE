import { fetchHistoryByIdRepo, hardDeleteHistoryByIdRepo } from "../repositories/history.repository"

export const hardDeleteHistoryByIdService = async (id: string, created_by: string | null) => {
    // Query
    const history = await fetchHistoryByIdRepo(id)

    // Validation
    if (!history) {
        return null
    }

    // Query
    await hardDeleteHistoryByIdRepo(id, created_by)

    return history
}