import { prisma } from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid'

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

export const findFeedbackByIdRepo = async (id: string) => {
    return prisma.feedback.findUnique({ where: { id } })
}

export const createFeedbackRepo = async (feedback_rate: number, feedback_note: string, userId: string) => {
    return prisma.feedback.create({
        data: {
            id: uuidv4(), feedback_rate, feedback_note, created_at: new Date(), created_by: userId,
        },
    })
}

export const deleteFeedbackByIdRepo = async (id: string) => {
    return prisma.feedback.delete({ where: { id } })
}

export const findAllFeedbackExportRepo = async () => {
    return prisma.feedback.findMany({
        orderBy: {
            created_at: 'desc'
        },
        select: {
            feedback_rate: true, feedback_note: true, created_at: true,
            user: {
                select: { username: true }
            } 
        }
    })
}