import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { findRandomUserRepo} from '../repositories/user.repository'
import { findRandomCareProductRepo } from '../repositories/care_product.repository'

type CommentFactoryOverride = Partial<Prisma.commentCreateInput>

export const commentFactory = async (overrides: CommentFactoryOverride = {}) => {
    // Get random user
    const user = await findRandomUserRepo()
    if (!user) {
        throw new Error('Comment requires an user')
    }

    // Get random care product
    const careProduct = await findRandomCareProductRepo()
    if (!careProduct) {
        throw new Error('Comment requires a care product')
    }

    // Build dummy
    const data: Prisma.commentCreateInput = {
        id: faker.string.uuid(),
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
