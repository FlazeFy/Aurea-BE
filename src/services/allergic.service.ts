import { createAllergicRepo, findAllAllergicRepo, findAllergicByIdRepo, hardDeleteAllergicByIdRepo } from "../repositories/allergic.repository"

export const getAllAllergicService = async (page: number, limit: number, userId: string | null) => {
    // Repo : Find all allergic
    const res = await findAllAllergicRepo(page, limit, userId)
    if (!res || res.data.length === 0) {
        return null
    }

    return res
}

export const hardDeleteAllergicByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find allergic by id
    const allergic = await findAllergicByIdRepo(id)
    if (!allergic) {
        return null
    }

    // Repo : Delete allergic by id
    await hardDeleteAllergicByIdRepo(id, created_by)

    return allergic
}

export const postCreateAllergicService = async (allergic_context: string, allergic_desc: string, userId: string) => {
    // Repo : Create feedback
    return await createAllergicRepo(allergic_context, allergic_desc, userId)
}