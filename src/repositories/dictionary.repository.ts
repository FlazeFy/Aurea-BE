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
        prisma.feedback.count(),
    ])

    return {data, total}
}