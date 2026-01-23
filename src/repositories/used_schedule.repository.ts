import { prisma } from '../lib/prisma'

export const findRandomUsedScheduleByInventoryRepo = async (inventoryId: string) => {
    const count = await prisma.used_schedule.count({
        where: { inventory_id: inventoryId },
    })

    if (count === 0) {
        throw new Error('No used schedules found for this inventory')
    }

    const skip = Math.floor(Math.random() * count)

    return prisma.used_schedule.findFirst({
        where: { inventory_id: inventoryId },
        skip,
        select: { id: true },
    })
}

export const findUsedScheduleByIdRepo = async (id: string) => {
    return prisma.used_schedule.findUnique({ where: { id } })
}

export const hardDeleteUsedScheduleByIdRepo = async (id: string, created_by: string | null) => {
    return prisma.used_schedule.deleteMany({
        where: {
            id, ...(created_by !== null && {
                inventory: {
                    created_by
                }
            })
        }
    })
}