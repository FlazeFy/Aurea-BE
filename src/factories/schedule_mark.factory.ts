import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { findRandomUsedScheduleByInventoryRepo } from '../repositories/used_schedule.repository'
import { findRandomInventoryWithUsedScheduleByUserRepo } from '../repositories/inventory.repository'
import { findRandomUserWithInventoryRepoAndUsedSchedule } from '../repositories/user.repository'
import { faker } from '@faker-js/faker'

type ScheduleMarkFactoryOverride = Partial<Prisma.schedule_markCreateInput>

export const scheduleMarkFactory = async (overrides: ScheduleMarkFactoryOverride = {}) => {
    // Get random user from repo
    const user = await findRandomUserWithInventoryRepoAndUsedSchedule()
    if (!user) {
        throw new Error('Inventory requires an user')
    }

    // Get random inventory from repo
    const inventory = await findRandomInventoryWithUsedScheduleByUserRepo(user.id)
    if (!inventory) {
        throw new Error('Used schedule requires inventory')
    }

    // Get random schedule from repo
    const usedSchedule = await findRandomUsedScheduleByInventoryRepo(inventory.id)

    // Build dummy
    const data: Prisma.schedule_markCreateInput = {
        id: faker.string.uuid(),
        used_schedule: { connect: { id: usedSchedule?.id },},
        ...overrides,
    }

    return prisma.schedule_mark.create({data})
}

export const scheduleMarkFactoryMany = async (count: number, overrides: ScheduleMarkFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await scheduleMarkFactory(overrides)
    }
}
