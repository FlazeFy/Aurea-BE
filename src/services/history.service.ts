import { findAllHistoryRepo, findHistoryByIdRepo, hardDeleteHistoryByIdRepo } from "../repositories/history.repository"

export const getAllHistoryService = async (page: number, limit: number, userId: string | null) => {
    // Repo : Find all allergic
    const res = await findAllHistoryRepo(page, limit, userId)
    if (!res || res.data.length === 0) return null

    return res
}

export const hardDeleteAllHistoryService = async (created_by: string) => {
    // Repo : Delete all history 
    return await hardDeleteHistoryByIdRepo(null, created_by)
}

export const hardDeleteHistoryByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find history by id
    const history = await findHistoryByIdRepo(id)
    if (!history) return null

    // Repo : Delete history by id
    await hardDeleteHistoryByIdRepo(id, created_by)

    return history
}