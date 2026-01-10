import { prisma } from '../lib/prisma'

export const getRandomUsedScheduleByInventory = async (inventoryId: string) => {
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
