import { prisma } from '../lib/prisma'

export const findRandomCareProductRepo = async () => {
    const count = await prisma.care_product.count()

    if (count === 0) {
        throw new Error('No care products found. Seed care products first.')
    }

    const skip = Math.floor(Math.random() * count)

    return prisma.care_product.findFirst({skip, select: { id: true },})
}
