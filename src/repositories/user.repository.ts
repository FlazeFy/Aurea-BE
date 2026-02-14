import { prisma } from '../lib/prisma'

export const findUserByEmailRepo = async (email: string) => prisma.user.findUnique({ where: { email }})

export const findUserByIdRepo = async (id: string) => prisma.user.findUnique({ where: { id } })

export const findRandomUserRepo = async () => {
    const count = await prisma.user.count()
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.user.findFirst({ skip, select: { id: true },})
}

export const findRandomUserWithInventoryRepo = async () => {
    // Count users that have at least one inventory
    const count = await prisma.user.count({
        where: { inventories: { some: {} } },
    })
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.user.findFirst({
        skip,
        where: { inventories: { some: {} } },
        select: {
            id: true,
        },
    })
}

export const findRandomUserWithInventoryRepoAndUsedSchedule = async () => {
    // Count users that have at least one inventory
    const count = await prisma.user.count({
        where: { inventories: { some: { used_schedules: { some: {} } } } },
    })
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.user.findFirst({
        skip,
        where: { inventories: { some: { used_schedules: { some: {} } } } },
        select: {
            id: true,
        },
    })
}
