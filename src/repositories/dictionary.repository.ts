import { prisma } from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid'

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

export const findDictionaryByNameAndTypeRepo = async (dictionary_name: string, dictionary_type: string) => {
    return prisma.dictionary.findFirst({
        where: { dictionary_name, dictionary_type }
    })
}

export const createDictionaryRepo = async (dictionary_name: string, dictionary_type: string) => {
    return prisma.dictionary.create({
        data: {
            id: uuidv4(), dictionary_name, dictionary_type
        },
    })
}