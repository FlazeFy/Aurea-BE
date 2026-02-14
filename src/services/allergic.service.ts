import { exportToCSV } from "../helpers/converter.helper"
import { createAllergicRepo, findAllAllergicExportRepo, findAllAllergicRepo, findAllergicByIdRepo, hardDeleteAllergicByIdRepo } from "../repositories/allergic.repository"

export const getAllAllergicService = async (page: number, limit: number, userId: string | null) => {
    // Repo : Find all allergic
    const res = await findAllAllergicRepo(page, limit, userId)
    if (!res || res.data.length === 0) return null

    return res
}

export const hardDeleteAllergicByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find allergic by id
    const allergic = await findAllergicByIdRepo(id)
    if (!allergic) return null

    // Repo : Delete allergic by id
    await hardDeleteAllergicByIdRepo(id, created_by)

    return allergic
}

export const postCreateAllergicService = async (allergic_context: string, allergic_desc: string, userId: string) => {
    // Repo : Create allergic
    return await createAllergicRepo(allergic_context, allergic_desc, userId)
}

export const  exportAllAllergicService = async () => {
    // Repo : Find all allergic
    const res = await findAllAllergicExportRepo()
    if (!res || res.length === 0) return null

    // Remap for nested object
    const mapped = res.map(item => ({
        allergic_context: item.allergic_context,
        allergic_desc: item.allergic_desc,
        created_at: item.created_at,
        ...({ created_by_username: item.user?.username })
    }))

    // Dataset headers
    const fields = ['allergic_context','allergic_desc','created_at','created_by_username']

    return exportToCSV(mapped, fields)
}