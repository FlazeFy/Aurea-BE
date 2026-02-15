import { findLikeByProductIdRepo } from "../repositories/like.repository"

export const getLikeByProductIdService = async (page: number, limit: number, productId: string) => {
    // Repo : Find all like
    const res = await findLikeByProductIdRepo(page, limit, productId)
    if (!res || res.data.length === 0) return null

    return res
}