import { findUserByIdRepo } from "../repositories/user.repository"

export const getUserByIdService = async (id: string) => {
    // Repo : Find user by id
    const res = await findUserByIdRepo(id)
    if (!res) {
        return null
    }

    return res
}