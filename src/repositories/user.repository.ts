import { prisma } from '../lib/prisma'

export const getRandomUser = async () => {
    const count = await prisma.user.count()

    if (count === 0) {
        throw new Error('No users found. Seed users first')
    }

    const skip = Math.floor(Math.random() * count)

    return prisma.user.findFirst({ skip, select: { id: true },})
}
