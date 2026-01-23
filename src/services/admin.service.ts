import { findAdminByIdRepo } from "../repositories/admin.repository"

export const getAdminByIdService = async (id: string) => {
    // Repo : Find admin by id
    const res = await findAdminByIdRepo(id)
    if (!res) {
        return null
    }

    return res
}