import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { getRandomUser } from '../repositories/user.repository'

type FeedbackFactoryOverride = Partial<Prisma.feedbackCreateInput>

export const feedbackFactory = async (overrides: FeedbackFactoryOverride = {}) => {
    // Get random user from repo
    const user = await getRandomUser()
    if (!user) {
        throw new Error('Feedback requires an user')
    }

    // Build dummy
    const data: Prisma.feedbackCreateInput = {
        id: faker.string.uuid(),
        feedback_rate: faker.number.int({ min: 1, max: 5 }),
        feedback_note: faker.lorem.sentence(),
        user: { connect: { id: user.id } },
        ...overrides,
    }

    return prisma.feedback.create({data})
}

export const feedbackFactoryMany = async (count: number, overrides: FeedbackFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await feedbackFactory(overrides)
    }
}
