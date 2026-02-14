import 'dotenv/config'
import { prisma } from '../lib/prisma'
import { allergicFactoryMany } from './allergic.factory'
import { careProductFactoryMany } from './care_product.factory'
import { commentFactoryMany } from './comment.factory'
import { dictionaryFactory } from './dictionary.factory'
import { feedbackFactoryMany } from './feedback.factory'
import { historyFactoryMany } from './history.factory'
import { inventoryFactoryMany } from './inventory.factory'
import { likeFactoryMany } from './like.factory'
import { scheduleMarkFactoryMany } from './schedule_mark.factory'
import { usedScheduleFactoryMany } from './used_schedule.factory'
import { userFactoryMany } from './user.factory'
import { adminFactoryMany } from './admin.factory'

const seedDictionary = async () => {
    // Manual defined dictionary
    const dct = [
        // Gender
        { dictionary_type: 'gender', dictionary_name: 'male' },
        { dictionary_type: 'gender', dictionary_name: 'female' },
        // Product Category
        { dictionary_type: 'product_category', dictionary_name: 'cleanser' },
        { dictionary_type: 'product_category', dictionary_name: 'toner' },
        { dictionary_type: 'product_category', dictionary_name: 'serum' },
        { dictionary_type: 'product_category', dictionary_name: 'moisturizer' },
        { dictionary_type: 'product_category', dictionary_name: 'sunscreen' },
        { dictionary_type: 'product_category', dictionary_name: 'exfoliator' },
        { dictionary_type: 'product_category', dictionary_name: 'mask' },
        { dictionary_type: 'product_category', dictionary_name: 'treatment' },
        { dictionary_type: 'product_category', dictionary_name: 'eye_care' },
        { dictionary_type: 'product_category', dictionary_name: 'lip_care' },
        { dictionary_type: 'product_category', dictionary_name: 'body_care' },
        // Product Type
        { dictionary_type: 'product_type', dictionary_name: 'gel' },
        { dictionary_type: 'product_type', dictionary_name: 'cream' },
        { dictionary_type: 'product_type', dictionary_name: 'lotion' },
        { dictionary_type: 'product_type', dictionary_name: 'foam' },
        { dictionary_type: 'product_type', dictionary_name: 'oil' },
        { dictionary_type: 'product_type', dictionary_name: 'balm' },
        { dictionary_type: 'product_type', dictionary_name: 'essence' },
        { dictionary_type: 'product_type', dictionary_name: 'ampoule' },
        { dictionary_type: 'product_type', dictionary_name: 'stick' },
        { dictionary_type: 'product_type', dictionary_name: 'spray' },
        { dictionary_type: 'product_type', dictionary_name: 'powder' },
        { dictionary_type: 'product_type', dictionary_name: 'wash_off' },
        { dictionary_type: 'product_type', dictionary_name: 'peel_off' },
        { dictionary_type: 'product_type', dictionary_name: 'sheet_mask' },
        { dictionary_type: 'product_type', dictionary_name: 'sleeping_mask' },
    ]
    for (const dt of dct) {
        await dictionaryFactory(dt.dictionary_type, dt.dictionary_name)
    }    
}

const clearAllTables = async () => {
    await prisma.schedule_mark.deleteMany()
    await prisma.used_schedule.deleteMany()
    await prisma.inventory.deleteMany()
    await prisma.comment.deleteMany()
    await prisma.like.deleteMany()
    await prisma.feedback.deleteMany()
    await prisma.care_product.deleteMany()
    await prisma.history.deleteMany()
    await prisma.allergic.deleteMany()
    await prisma.user.deleteMany()
    await prisma.dictionary.deleteMany()
    await prisma.admin.deleteMany()
}

const main = async () => {
    try {
        // Empty all table
        await clearAllTables()

        // Define seeder
        await seedDictionary()
        await userFactoryMany(20)
        await adminFactoryMany(5)
        await allergicFactoryMany(10)
        await historyFactoryMany(60)
        await careProductFactoryMany(80)
        await inventoryFactoryMany(60)
        await usedScheduleFactoryMany(50)
        await scheduleMarkFactoryMany(250)
        await feedbackFactoryMany(15)
        await commentFactoryMany(160)
        await likeFactoryMany(200)
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
