import { prisma } from '../lib/prisma'

export const findHistoryByIdRepo = async (id: string) => {
    return prisma.history.findUnique({
        where: { id },
    })
}

export const findAllHistoryRepo = async (page: number, limit: number, userId: string | null) => {
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        prisma.history.findMany({
            skip,
            take: limit,
            where: userId ? { created_by: userId } : undefined,
            orderBy: {
                created_at: "desc",
            },
        }),
        prisma.history.count({
            where: userId ? { created_by: userId } : undefined,
        }),
    ])

    return { data, total }
}

export const hardDeleteHistoryByIdRepo = async (id: string | null, created_by: string) => {
    return prisma.history.deleteMany({
        where: { ...(id !== null && { id }), ...(created_by !== null && { created_by })},
    })
}

export const findAllHistoryExportRepo = async (userId: string | null) => {
    const where = userId ? { created_by: userId } : {}
    return prisma.history.findMany({
        where,
        orderBy: {
            created_at: 'desc'
        },
        select: {
            history_type: true, history_context: true, created_at: true,
            user: !userId ? {
                select: { username: true }
            } : {}
        }
    })
}