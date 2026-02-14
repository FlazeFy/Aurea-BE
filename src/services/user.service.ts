import { findUserByIdRepo } from "../repositories/user.repository"

// Repo : Find user by id
export const getUserByIdService = async (id: string) => await findUserByIdRepo(id)