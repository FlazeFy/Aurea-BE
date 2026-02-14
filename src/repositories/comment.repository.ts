import { prisma } from '../lib/prisma'

export const findCommentByProductIdRepo = async (page: number, limit: number, productId: string) => {
    const where = { care_product_id: productId }
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        prisma.comment.findMany({
            skip,
            take: limit,
            where,
            orderBy: {
                created_at: "desc",
            },
            select: {
                comment_body: true, created_at: true,
                user: {
                    select: {
                        username: true, id: true
                    }
                }
            }
        }),
        prisma.comment.count({ where }),
    ])

    return { data, total }
}