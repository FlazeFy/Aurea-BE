import { prisma } from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export const findAllergicByIdRepo = async (id: string) => prisma.allergic.findUnique({ where: { id } })

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

export const createAllergicRepo = async (allergic_context: string, allergic_desc: string, userId: string) => {
    return prisma.allergic.create({
        data: {
            id: uuidv4(), allergic_context, allergic_desc, created_at: new Date(), created_by: userId,
        },
    })
}

export const findAllAllergicExportRepo = async () => {
    return prisma.allergic.findMany({
        orderBy: {
            created_at: 'desc'
        },
        select: {
            allergic_context: true, allergic_desc: true, created_at: true,
            user: {
                select: { username: true }
            } 
        }
    })
}