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

export const findLikeByProductIdAndUserIdRepo = async (care_product_id: string, created_by: string) => {
    return prisma.like.findFirst({
        where: { care_product_id, created_by },
    })
}

export const hardDeleteLikeByProductIdRepo = async (care_product_id: string, created_by: string) => {
    return prisma.like.deleteMany({
        where: { care_product_id, created_by },
    })
}