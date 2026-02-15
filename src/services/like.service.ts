import { findLikeByProductIdAndUserIdRepo, findLikeByProductIdRepo, hardDeleteLikeByProductIdRepo } from "../repositories/like.repository"

export const getLikeByProductIdService = async (page: number, limit: number, productId: string) => {
    // Repo : Find all like
    const res = await findLikeByProductIdRepo(page, limit, productId)
    if (!res || res.data.length === 0) return null

    return res
}

export const hardDeleteLikeByProductIdService = async (product_id: string, created_by: string) => {
    // Repo : Find like by product id and user id
    const like = await findLikeByProductIdAndUserIdRepo(product_id, created_by)
    if (!like) return null

    // Repo : Delete like by product id
    return await hardDeleteLikeByProductIdRepo(product_id, created_by)
}