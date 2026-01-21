import { prisma } from '../lib/prisma'
import { Gender, Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { hashPassword } from '../helpers/auth.helper'

type UserFactoryOverride = Partial<Prisma.adminCreateInput>

export const adminFactory = async (overrides: UserFactoryOverride = {}) => {
    const password = "nopass123"

    // Build dummy
    const data: Prisma.adminCreateInput = {
        id: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email().toLowerCase(),
        password: await hashPassword(password), 
        telegram_user_id: null,
        telegram_is_valid: false,
        ...overrides,
    }

    return prisma.admin.create({data})
}

export const adminFactoryMany = async (count: number, overrides: UserFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await adminFactory(overrides)
    }
}
