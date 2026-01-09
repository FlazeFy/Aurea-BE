import 'dotenv/config'
import { prisma } from '../lib/prisma'
import { dictionaryFactory } from './dictionary.factory'
import { userFactoryMany } from './user.factory'

const seedDictionary = async () => {
    const dct = [
        { dictionary_type: 'gender', dictionary_name: 'male' },
        { dictionary_type: 'gender', dictionary_name: 'female' },
    ]
    for (const dt of dct) {
        await dictionaryFactory(dt.dictionary_type, dt.dictionary_name)
    }    
}

const main = async () => {
    try {
        // Define seeder
        await seedDictionary()
        await userFactoryMany(20)
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
