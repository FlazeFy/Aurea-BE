import { prisma } from "../lib/prisma"
import { randomUUID } from 'crypto'

export const dictionaryFactory = async (dictionary_type: string, dictionary_name?: string) => {
    return prisma.dictionary.create({
        data: {
            id: randomUUID(),
            dictionary_type,
            dictionary_name: dictionary_name ?? dictionary_type,
        },
    })
}