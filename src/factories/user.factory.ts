import { prisma } from '../lib/prisma'
import { Gender, Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { randomEnumValue } from '../helpers/generator.helper'
import { hashPassword } from '../helpers/auth.helper'

type UserFactoryOverride = Partial<Prisma.userCreateInput>

const randomGender = (): Gender => {
    return randomEnumValue(Object.values([Gender.male, Gender.female]))
}

export const userFactory = async (overrides: UserFactoryOverride = {}) => {
    const password = "nopass123"

    // Build dummy
    const data: Prisma.userCreateInput = {
        id: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email().toLowerCase(),
        password: await hashPassword(password), 
        gender: randomGender(),
        bio: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
        born_at: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }),
        profile_image: null,
        telegram_user_id: null,
        telegram_is_valid: false,
        ...overrides,
    }

    return prisma.user.create({data})
}

export const userFactoryMany = async (count: number, overrides: UserFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await userFactory(overrides)
    }
}
