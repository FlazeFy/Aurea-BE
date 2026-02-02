import { prisma } from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import { DayName, Time } from '../generated/prisma/enums'

export const findRandomUsedScheduleByInventoryRepo = async (inventoryId: string) => {
    const count = await prisma.used_schedule.count({
        where: { inventory_id: inventoryId },
    })
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.used_schedule.findFirst({
        where: { inventory_id: inventoryId },
        skip,
        select: { id: true },
    })
}

export const findUsedScheduleByIdRepo = async (id: string) => {
    return prisma.used_schedule.findUnique({ 
        where: { id },
        select: {
            id: true,
            inventory: {
                select: { id: true, created_by: true }
            }
        } 
    })
}

export const findUsedScheduleByUserIdRepo = async (userId: string) => {
    return prisma.used_schedule.findMany({ 
        where: { 
            inventory: { created_by: userId } 
        },
        select: {
            day_name: true, time: true, inventory: {
                select: {
                    care_product: {
                        select: {
                            product_name: true, product_type: true, product_category: true 
                        }
                    }
                }
            }
        }
    })
}

export const findUsedScheduleByInventoryIdDayTimeRepo = async (inventory_id: string, day_name: DayName, time: Time) => {
    return prisma.used_schedule.findMany({
        where: { inventory_id, day_name, time }
    })
}

export const findUsedScheduleByDayRepo = async (day_name: DayName, userId: string) => {
    const schedules = await prisma.used_schedule.findMany({
        where: { 
            day_name,
            inventory: { created_by: userId }
        },
        select: {
            time: true,
            inventory: {
                select: {
                    care_product: {
                        select: { id: true, product_name: true, product_type: true, product_category: true }
                    }
                }
            }
        }
    })
  
    // Custom sort order
    const order = ["morning", "afternoon", "night"]
    return schedules.sort((a, b) => order.indexOf(a.time) - order.indexOf(b.time))
} 

export const hardDeleteUsedScheduleByIdRepo = async (id: string, created_by: string | null) => {
    return prisma.used_schedule.deleteMany({
        where: {
            id, ...(created_by !== null && {
                inventory: {
                    created_by
                }
            })
        }
    })
}

export const createUsedScheduleRepo = async (inventory_id: string, day_name: DayName, time: Time, schedule_note: string) => {
    return prisma.used_schedule.create({
        data: {
            id: uuidv4(), inventory_id, day_name, time, schedule_note
        }
    })
}