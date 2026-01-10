import { prisma } from '../lib/prisma'

export const getRandomInventoryByUser = async (userId: string) => {
    const count = await prisma.inventory.count({
        where: { created_by: userId },
    })

    if (count === 0) {
        throw new Error('No inventories found for this user')
    }

    const skip = Math.floor(Math.random() * count)

    return prisma.inventory.findFirst({
        where: { created_by: userId },
        skip,
        select: { id: true },
    })
}

export const getRandomInventoryWithUsedScheduleByUser = async (userId: string) => {
    const count = await prisma.inventory.count({
        where: { created_by: userId, used_schedules: { some: {} } },
    })

    if (count === 0) {
        throw new Error('No inventories found for this user')
    }

    const skip = Math.floor(Math.random() * count)

    return prisma.inventory.findFirst({
        where: { created_by: userId, used_schedules: { some: {} } },
        skip,
        select: { id: true },
    })
}
