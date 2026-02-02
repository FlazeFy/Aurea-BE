import { prisma } from '../lib/prisma'

export const findRandomInventoryByUserRepo = async (userId: string) => {
    const count = await prisma.inventory.count({
        where: { created_by: userId },
    })
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.inventory.findFirst({
        where: { created_by: userId },
        skip,
        select: { id: true },
    })
}

export const findInventoryByIdRepo = async (id: string, created_by: string) => {
    return prisma.inventory.findUnique({ 
        where: { id, created_by },
    })
}

export const findRandomInventoryWithUsedScheduleByUserRepo = async (userId: string) => {
    const count = await prisma.inventory.count({
        where: { created_by: userId, used_schedules: { some: {} } },
    })
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.inventory.findFirst({
        where: { created_by: userId, used_schedules: { some: {} } },
        skip,
        select: { id: true },
    })
}
