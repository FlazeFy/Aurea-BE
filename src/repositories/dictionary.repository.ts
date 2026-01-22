import { prisma } from '../lib/prisma'

export const findAllDictionaryRepo = async (page: number, limit: number) => {
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
        prisma.dictionary.findMany({
            skip,
            take: limit,
            orderBy: {
                dictionary_name: "asc",
            }
        }),
        prisma.dictionary.count(),
    ])

    return {data, total}
}

export const findDictionaryByIdRepo = async (id: string) => {
    return prisma.dictionary.findUnique({ where: { id } })
}

export const deleteDictionaryByIdRepo = async (id: string) => {
    return prisma.dictionary.delete({ where: { id } })
}