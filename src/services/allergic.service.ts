import { fetchAllergicByIdRepo, hardDeleteAllergicByIdRepo } from "../repositories/allergic.repository"

export const hardDeleteAllergicByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find allergic by id
    const allergic = await fetchAllergicByIdRepo(id)

    // Validation
    if (!allergic) {
        return null
    }

    // Repo : Delete allergic by id
    await hardDeleteAllergicByIdRepo(id, created_by)

    return allergic
}