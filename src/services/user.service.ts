import { findUserByIdRepo } from "../repositories/user.repository"

export const getUserByIdService = async (id: string) => {
    // Repo : Find user by id
    return await findUserByIdRepo(id)
}