import { prisma } from '../lib/prisma'

export const findRandomUsedScheduleByInventoryRepo = async (inventoryId: string) => {
    const count = await prisma.used_schedule.count({
        where: { inventory_id: inventoryId },
    })
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.used_schedule.findFirst({
        where: { inventory_id: inventoryId },
        skip,
        select: { id: true },
    })
}

export const findUsedScheduleByIdRepo = async (id: string) => {
    return prisma.used_schedule.findUnique({ 
        where: { id },
        select: {
            id: true,
            inventory: {
                select: { id: true, created_by: true }
            }
        } 
    })
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