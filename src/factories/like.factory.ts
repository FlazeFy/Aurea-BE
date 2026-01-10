import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { getRandomUser } from '../repositories/user.repository'
import { getRandomCareProduct } from '../repositories/care_product.repository'

type LikeFactoryOverride = Partial<Prisma.likeCreateInput>

export const likeFactory = async (overrides: LikeFactoryOverride = {}) => {
    // Get random user
    const user = await getRandomUser()
    if (!user) {
        throw new Error('Cannot create like without users')
    }

    // Get random care product
    const careProduct = await getRandomCareProduct()
    if (!careProduct) {
        throw new Error('Cannot create like without care products')
    }

    // Check if like already exists
    const exists = await prisma.like.findFirst({
        where: { created_by: user.id, care_product_id: careProduct.id },
    })
    if (exists) {
        return exists
    }

    // Build dummy
    const data: Prisma.likeCreateInput = {
        id: faker.string.uuid(),
        care_product: { connect: { id: careProduct.id } },
        user: { connect: { id: user.id } },
        ...overrides,
    }

    return prisma.like.create({data})
}

export const likeFactoryMany = async (count: number, overrides: LikeFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await likeFactory(overrides)
    }
}
