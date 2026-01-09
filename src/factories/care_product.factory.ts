import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { getRandomUser } from '../repositories/user.repository'

type CareProductFactoryOverride = Partial<Prisma.care_productCreateInput>

export const careProductFactory = async (overrides: CareProductFactoryOverride = {}) => {
    // Get random user from repo
    const user = await getRandomUser()

    // Build dummy
    const data: Prisma.care_productCreateInput = {
        id: randomUUID(),
        product_name: faker.commerce.productName(),
        brand: faker.company.name(),
        product_category: faker.word.words(1),
        product_type: faker.word.words(1),
        ingredients: faker.datatype.boolean() ? faker.helpers.arrayElements(['water', 'glycerin', 'niacinamide', 'aloe'], { min: 2, max: 4 }) : null,
        key_ingredients: faker.datatype.boolean() ? faker.helpers.arrayElements(['niacinamide', 'ceramide', 'hyaluronic acid'], { min: 1, max: 2 }) : null,
        alcohol_free: faker.datatype.boolean(),
        fragrance_free: faker.datatype.boolean(),
        paraben_free: faker.datatype.boolean(),
        recommended_for: faker.helpers.arrayElement(['acne-prone', 'dry skin', 'oily skin', 'all skin types']),
        suitable_skin: faker.helpers.arrayElement(['dry', 'oily', 'combination', 'normal']),
        usage_instruction: faker.lorem.sentences(2),
        is_active: true,
        creator: user ? { connect: { id: user.id } } : undefined,
        ...overrides,
    }

    return prisma.care_product.create({data})
}

export const careProductFactoryMany = async (count: number, overrides: CareProductFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await careProductFactory(overrides)
    }
}
