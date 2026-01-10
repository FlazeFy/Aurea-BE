import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { DayName, Time } from '../generated/prisma/client'
import { randomEnumValue } from '../helpers/generator.helper'
import { getRandomInventoryByUser } from '../repositories/inventory.repository'
import { getRandomUserWithInventory } from '../repositories/user.repository'

type UsedScheduleFactoryOverride =Partial<Prisma.used_scheduleCreateInput>

export const randomDayName = (): DayName => {
    return randomEnumValue(Object.values(DayName))
}

export const randomTime = (): Time => {
    return randomEnumValue(Object.values(Time))
}

export const usedScheduleFactory = async (overrides: UsedScheduleFactoryOverride = {}) => {
    // Get random user from repo
    const user = await getRandomUserWithInventory()
    if (!user) {
        throw new Error('Inventory requires user')
    }

    // Get random inventory from repo
    const inventory = await getRandomInventoryByUser(user.id)

    // Build dummy
    const data: Prisma.used_scheduleCreateInput = {
        id: faker.string.uuid(),
        inventory: { connect: { id: inventory?.id }},
        day_name: randomDayName(),
        time: randomTime(),
        schedule_note: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        ...overrides,
    }

    return prisma.used_schedule.create({data})
}

export const usedScheduleFactoryMany = async (count: number, overrides: UsedScheduleFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await usedScheduleFactory(overrides)
    }
}
