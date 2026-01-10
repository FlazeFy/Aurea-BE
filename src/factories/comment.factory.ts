import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { getRandomUser } from '../repositories/user.repository'
import { getRandomCareProduct } from '../repositories/care_product.repository'

type CommentFactoryOverride = Partial<Prisma.commentCreateInput>

export const commentFactory = async (overrides: CommentFactoryOverride = {}) => {
    // Get random user
    const user = await getRandomUser()
    if (!user) {
        throw new Error('Cannot create comment without users')
    }

    // Get random care product
    const careProduct = await getRandomCareProduct()
    if (!careProduct) {
        throw new Error('Cannot create comment without care products')
    }

    // Build dummy
    const data: Prisma.commentCreateInput = {
        id: randomUUID(),
        comment_body: faker.lorem.sentences(2),
        care_product_comment: { connect: { id: careProduct.id } },
        user: { connect: { id: user.id } },
        ...overrides,
    }

    return prisma.comment.create({data})
}

export const commentFactoryMany = async (count: number, overrides: CommentFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await commentFactory(overrides)
    }
}
