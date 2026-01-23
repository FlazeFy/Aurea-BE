import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { findRandomUserRepo} from '../repositories/user.repository'
import { buildRandomArray, randomEnumValue } from '../helpers/generator.helper'

type CareProductFactoryOverride = Partial<Prisma.care_productCreateInput>

const randomIngredient = (isNull: boolean): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput => {
    return isNull ? Prisma.JsonNull : buildRandomArray(['water', 'glycerin', 'niacinamide', 'aloe'], 2, 4)
}

const randomKeyIngredient = (isNull: boolean): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput => {
    return isNull ? Prisma.JsonNull : buildRandomArray(['niacinamide', 'ceramide', 'hyaluronic acid'], 1, 2)
}

const randomSuitableSkin = (): string => {
    return randomEnumValue(Object.values(['acne-prone', 'dry skin', 'oily skin', 'all skin types']))
}

const randomRecommendedFor = (): string => {
    return randomEnumValue(Object.values(['dry', 'oily', 'combination', 'normal']))
}

export const careProductFactory = async (overrides: CareProductFactoryOverride = {}) => {
    // Get random user from repo
    const user = await findRandomUserRepo()

    // Build dummy
    const data: Prisma.care_productCreateInput = {
        id: faker.string.uuid(),
        product_name: faker.commerce.productName(),
        brand: faker.company.name(),
        product_category: faker.word.words(1),
        product_type: faker.word.words(1),
        ingredients: randomIngredient(faker.datatype.boolean()),
        key_ingredients: randomKeyIngredient(faker.datatype.boolean()),
        alcohol_free: faker.datatype.boolean(),
        fragrance_free: faker.datatype.boolean(),
        paraben_free: faker.datatype.boolean(),
        recommended_for: randomRecommendedFor(),
        suitable_skin: randomSuitableSkin(),
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
