import { prisma } from '../lib/prisma'

export const fetchHistoryByIdRepo = async (id: string) => {
    return prisma.history.findUnique({
        where: { id },
    })
}

export const hardDeleteHistoryByIdRepo = async (id: string, created_by: string | null) => {
    return prisma.history.deleteMany({
        where: { id, ...(created_by !== null && { created_by })},
    })
}
