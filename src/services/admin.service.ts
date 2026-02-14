import { findAdminByIdRepo } from "../repositories/admin.repository"

// Repo : Find admin by id
export const getAdminByIdService = async (id: string) => await findAdminByIdRepo(id)
