import { createCommentRepo, findCommentByIdRepo, findCommentByProductIdRepo, hardDeleteCommentByIdRepo } from "../repositories/comment.repository"

export const getCommentByProductIdService = async (page: number, limit: number, productId: string) => {
    // Repo : Find all comment
    const res = await findCommentByProductIdRepo(page, limit, productId)
    if (!res || res.data.length === 0) return null

    return res
}

export const hardDeleteCommentByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find comment by id
    const comment = await findCommentByIdRepo(id)
    if (!comment || (created_by && comment.created_by !== created_by)) return null

    // Repo : Delete comment by id
    await hardDeleteCommentByIdRepo(id, created_by)

    return comment
}

// Repo : Create comment
export const postCreateCommentService = async (care_product_id: string, comment_body: string, userId: string) => await createCommentRepo(care_product_id, comment_body, userId)
