import { prisma } from '../lib/prisma'
import { Prisma } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import { findRandomUserRepo} from '../repositories/user.repository'
import { findRandomCareProductRepo } from '../repositories/care_product.repository'

type InventoryFactoryOverride = Partial<Prisma.inventoryCreateInput>

export const inventoryFactory = async (overrides: InventoryFactoryOverride = {}) => {
    // Get random user from repo
    const user = await findRandomUserRepo()
    // Get random product from repo
    const careProduct = await findRandomCareProductRepo()

    if (!user || !careProduct) {
        throw new Error('Inventory requires user and care product')
    }

    // Build dummy
    const data: Prisma.inventoryCreateInput = {
        id: faker.string.uuid(),
        qty: faker.number.int({ min: 1, max: 10 }),
        inventory_note: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        care_product: { connect: { id: careProduct.id }},
        user: { connect: { id: user.id }},
        ...overrides,
    }

    return prisma.inventory.create({data})
}

export const inventoryFactoryMany = async (count: number, overrides: InventoryFactoryOverride = {}) => {
    for (let i = 0; i < count; i++) {
        await inventoryFactory(overrides)
    }
}
