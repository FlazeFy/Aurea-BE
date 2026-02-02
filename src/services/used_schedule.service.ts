import { DayName, Time } from "../generated/prisma/enums"
import { findInventoryByIdRepo } from "../repositories/inventory.repository"
import { createUsedScheduleRepo, findUsedScheduleByIdRepo, findUsedScheduleByInventoryIdDayTime, hardDeleteUsedScheduleByIdRepo } from "../repositories/used_schedule.repository"

export const hardDeleteUsedScheduleByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find used schedule by id
    const used_schedule = await findUsedScheduleByIdRepo(id)
    if (!used_schedule) return null

    // Repo : Delete used schedule by id
    await hardDeleteUsedScheduleByIdRepo(id, created_by)

    return used_schedule
}

export const postCreateUsedScheduleService = async (inventory_id: string, day_name: string, time: string, schedule_note: string, userId: string) => {
    // Repo : Check if used schedule exist and based on user ownership
    const isExist = await findInventoryByIdRepo(inventory_id, userId)
    if (!isExist) return null

    const dayEnum = DayName[day_name as keyof typeof DayName]
    const timeEnum = Time[time as keyof typeof Time]
    
    if (!dayEnum) throw { code: 400, message: 'Invalid day_name' }
    if (!timeEnum) throw { code: 400, message: 'Invalid time' }

    // Repo : Check if inventory is still not used at the request day & time
    const isUsed = await findUsedScheduleByInventoryIdDayTime(inventory_id, dayEnum, timeEnum)
    if (isUsed) throw { code: 409, message: 'Inventory already being used at this specific time' }
      
    // Repo : Create schedule mark  
    return await createUsedScheduleRepo(inventory_id, dayEnum, timeEnum, schedule_note)
}