import { prisma } from '../lib/prisma'

export const findLikeByProductIdRepo = async (page: number, limit: number, productId: string) => {
    const where = { care_product_id: productId }
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        prisma.like.findMany({
            skip,
            take: limit,
            where,
            orderBy: {
                created_at: "desc",
            },
            select: {
                user: {
                    select: {
                        username: true, id: true
                    }
                }
            }
        }),
        prisma.like.count({ where }),
    ])

    return { data, total }
}