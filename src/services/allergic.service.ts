import { fetchAllergicByIdRepo, hardDeleteAllergicByIdRepo } from "../repositories/allergic.repository"

export const hardDeleteAllergicByIdService = async (id: string, created_by: string | null) => {
    // Query
    const allergic = await fetchAllergicByIdRepo(id)

    // Validation
    if (!allergic) {
        return null
    }

    // Query
    await hardDeleteAllergicByIdRepo(id, created_by)

    return allergic
}