import { prisma } from '../lib/prisma'

export const findAdminByEmailRepo = async (email: string) => prisma.admin.findUnique({where: { email } })

export const findAdminByIdRepo = async (id: string) => prisma.admin.findUnique({ where: { id } })