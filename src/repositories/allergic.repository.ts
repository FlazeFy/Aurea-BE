import { prisma } from '../lib/prisma'

export const findAllergicByIdRepo = async (id: string) => {
    return prisma.allergic.findUnique({ where: { id } })
}

export const findAllAllergicRepo = async (page: number, limit: number, userId: string | null) => {
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        prisma.allergic.findMany({
            skip,
            take: limit,
            where: userId ? { created_by: userId } : undefined,
            orderBy: {
                allergic_context: "asc",
            },
        }),
        prisma.allergic.count({
            where: userId ? { created_by: userId } : undefined,
        }),
    ])

    return { data, total }
}

export const hardDeleteAllergicByIdRepo = async (id: string, created_by: string | null) => {
    return prisma.allergic.deleteMany({
        where: { id, ...(created_by !== null && { created_by })},
    })
}
