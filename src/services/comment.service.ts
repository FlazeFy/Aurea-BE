import { findCommentByProductIdRepo } from "../repositories/comment.repository"

export const getCommentByProductIdService = async (page: number, limit: number, productId: string) => {
    // Repo : Find all allergic
    const res = await findCommentByProductIdRepo(page, limit, productId)
    if (!res || res.data.length === 0) return null

    return res
}