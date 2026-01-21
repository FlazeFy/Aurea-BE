import { prisma } from '../lib/prisma'

export const findAdminByEmailRepo = async (email: string) => {
    return prisma.admin.findUnique({
        where: { email }
    })
}