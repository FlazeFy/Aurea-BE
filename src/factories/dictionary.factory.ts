import { faker } from "@faker-js/faker"
import { prisma } from "../lib/prisma"

export const dictionaryFactory = async (dictionary_type: string, dictionary_name?: string) => {
    return prisma.dictionary.create({
        data: {
            id: faker.string.uuid(),
            dictionary_type,
            dictionary_name: dictionary_name ?? dictionary_type,
        },
    })
}