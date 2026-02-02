import { prisma } from '../lib/prisma'

export const findRandomCareProductRepo = async () => {
    const count = await prisma.care_product.count()
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.care_product.findFirst({skip, select: { id: true },})
}
