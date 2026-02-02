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

export const findUsedScheduleByInventoryIdDayTime = async (inventory_id: string, day_name: DayName, time: Time) => {
    return prisma.used_schedule.findMany({
        where: { inventory_id, day_name, time }
    })
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