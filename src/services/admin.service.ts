import { findAdminByIdRepo } from "../repositories/admin.repository"

export const getAdminByIdService = async (id: string) => {
    // Repo : Find admin by id
    return await findAdminByIdRepo(id)
}