import 'dotenv/config'
import { prisma } from '../lib/prisma'
import { allergicFactoryMany } from './allergic.factory'
import { careProductFactoryMany } from './care_product.factory'
import { dictionaryFactory } from './dictionary.factory'
import { historyFactoryMany } from './history.factory'
import { inventoryFactoryMany } from './inventory.factory'
import { scheduleMarkFactoryMany } from './schedule_mark.factory'
import { usedScheduleFactoryMany } from './used_schedule.factory'
import { userFactoryMany } from './user.factory'

const seedDictionary = async () => {
    // Manual defined dictionary
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
        await allergicFactoryMany(10)
        await historyFactoryMany(60)
        await careProductFactoryMany(80)
        await inventoryFactoryMany(60)
        await usedScheduleFactoryMany(50)
        await scheduleMarkFactoryMany(250)
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
