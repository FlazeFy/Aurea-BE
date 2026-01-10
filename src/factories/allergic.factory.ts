import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { getRandomUser } from '../repositories/user.repository'

type AllergicFactoryOverride = Partial<Prisma.allergicCreateInput>

export const allergicFactory = async (overrides: AllergicFactoryOverride = {}) => {
    // Get random user from repo
    const user = await getRandomUser()

    if (!user) {
        throw new Error('Allergic requires a user')
    }

    // Build dummy
    const data: Prisma.allergicCreateInput = {
        id: faker.string.uuid(),
        allergic_context: faker.word.words(1),
        allergic_desc: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        user: { connect: { id: user.id }},
        ...overrides,
    }

    return prisma.allergic.create({data})
}

export const allergicFactoryMany = async (count: number,overrides: AllergicFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await allergicFactory(overrides)
    }
}
