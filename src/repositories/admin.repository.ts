import { prisma } from '../lib/prisma'

export const findAdminByEmailRepo = async (email: string) => {
    return prisma.admin.findUnique({
        where: { email }
    })
}

export const findAdminByIdRepo = async (id: string) => {
    return prisma.admin.findUnique({
        where: { id }
    })
}