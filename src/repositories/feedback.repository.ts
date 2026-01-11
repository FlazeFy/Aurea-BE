import { prisma } from '../lib/prisma'

export const findAllFeedbackRepo = async (page: number, limit: number) => {
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        prisma.feedback.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: "desc",
            },
            select: {
                id: true, feedback_rate: true, feedback_note: true, created_at: true,
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        }),
        prisma.feedback.count(),
    ])

    return {data, total}
}

export const fetchFeedbackByIdRepo = async (id: string) => {
    return prisma.feedback.findUnique({ where: { id } })
}

export const deleteFeedbackByIdRepo = async (id: string) => {
    return prisma.feedback.delete({ where: { id } })
}
