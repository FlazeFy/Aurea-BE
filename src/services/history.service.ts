import { exportToCSV } from "../helpers/converter.helper"
import { findAllHistoryExportRepo, findAllHistoryRepo, findHistoryByIdRepo, hardDeleteHistoryByIdRepo } from "../repositories/history.repository"

export const getAllHistoryService = async (page: number, limit: number, userId: string | null) => {
    // Repo : Find all allergic
    const res = await findAllHistoryRepo(page, limit, userId)
    if (!res || res.data.length === 0) return null

    return res
}

// Repo : Delete all history 
export const hardDeleteAllHistoryService = async (created_by: string) => await hardDeleteHistoryByIdRepo(null, created_by)

export const hardDeleteHistoryByIdService = async (id: string, created_by: string) => {
    // Repo : Find history by id
    const history = await findHistoryByIdRepo(id)
    if (!history) return null

    // Repo : Delete history by id
    await hardDeleteHistoryByIdRepo(id, created_by)

    return history
}

export const  exportAllHistoryService = async (userId: string | null) => {
    // Repo : Find all history
    const res = await findAllHistoryExportRepo(userId)
    if (!res || res.length === 0) return null

    // Remap for nested object
    const mapped = res.map(item => ({
        history_context: item.history_context,
        history_type: item.history_type,
        created_at: item.created_at,
        ...(userId ? {} : { created_by_username: item.user?.username })
    }))

    // Dataset headers
    const fields = userId ? ['history_context','history_type','created_at'] : ['history_context','history_type','created_at','created_by_username']

    return exportToCSV(mapped, fields)
}