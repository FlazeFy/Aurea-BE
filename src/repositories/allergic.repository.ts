import { prisma } from '../lib/prisma'

export const fetchAllergicByIdRepo = async (id: string) => {
    return prisma.allergic.findUnique({ where: { id } })
}

export const hardDeleteAllergicByIdRepo = async (id: string, created_by: string | null) => {
    return prisma.allergic.deleteMany({
        where: { id, ...(created_by !== null && { created_by })},
    })
}
