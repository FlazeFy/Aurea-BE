import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { getRandomUser } from '../repositories/user.repository'

type HistoryFactoryOverride = Partial<Prisma.historyCreateInput>

export const historyFactory = async (overrides: HistoryFactoryOverride = {}) => {
    // Get random user from repo
    const user = await getRandomUser()

    // Build dummy
    const data: Prisma.historyCreateInput = {
        id: faker.string.uuid(),
        history_type: faker.word.words(1),
        history_context: faker.word.words(2),
        user: user ? { connect: { id: user.id } } : undefined,
        ...overrides,
    }

    return prisma.history.create({data})
}

export const historyFactoryMany = async (count: number,overrides: HistoryFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await historyFactory(overrides)
    }
}
