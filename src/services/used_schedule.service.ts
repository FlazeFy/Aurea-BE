import { DayName, Time } from "../generated/prisma/enums"
import { sendEmail } from "../helpers/mailer.helper"
import { findInventoryByIdRepo } from "../repositories/inventory.repository"
import { createUsedScheduleRepo, findUsedScheduleByDayRepo, findUsedScheduleByIdRepo, findUsedScheduleByInventoryIdDayTimeRepo, findUsedScheduleByUserIdRepo, hardDeleteUsedScheduleByIdRepo, updateUsedScheduleByIdRepo } from "../repositories/used_schedule.repository"
import { findUserByIdRepo } from "../repositories/user.repository"
import { announcementEmailTemplate } from "../templates/announcement.template"

export const getUsedScheduleByDayService = async (day_name: string, userId: string) => {
    const dayEnum = DayName[day_name as keyof typeof DayName]    
    if (!dayEnum) throw { code: 400, message: 'Invalid day_name' }

    // Repo : Find used schedule by day
    const res = await findUsedScheduleByDayRepo(dayEnum, userId)
    if (!res || res.length === 0) return null

    return res
}

export const hardDeleteUsedScheduleByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find used schedule by id
    const used_schedule = await findUsedScheduleByIdRepo(id)
    if (!used_schedule) return null

    // Repo : Delete used schedule by id
    await hardDeleteUsedScheduleByIdRepo(id, created_by)

    return used_schedule
}

const showCurrentUsedScheduleService = async (userId: string) => {
    // Repo : Find user for email broadcast
    const user = await findUserByIdRepo(userId)
    if (!user) throw { code: 404, message: 'User not found' } 

    // Repo : Find created used schedule
    const usedSchedule = await findUsedScheduleByUserIdRepo(userId)
    let tbody = ''
    for (const dt of usedSchedule) {
        tbody += `
            <tr>
                <td>${dt.day_name}</td>
                <td>${dt.time}</td>
                <td>
                    <h6>${dt.inventory.care_product.product_name}</h6>
                    <p class="margin:0;">${dt.inventory.care_product.product_type} | ${dt.inventory.care_product.product_category}</p>
                </td>
            </tr>
        `
    }

    let table = `
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Product</th>
                </tr>
            </thead>
            <tbody>${tbody}</tbody>
        </table>
    `

    // Broadcast email
    await sendEmail(
        user.email, "New Schedule!",
        announcementEmailTemplate(
            user.email.split("@")[0],
            `Your used schedule are updated, here's the detail :\n${table}. <br>Thank you for being our beloved user.`
        )
    )
}

const validateDayTimeAndCheckUsedInventory = async (inventory_id: string, day_name: string, time: string) => {
    const dayEnum = DayName[day_name as keyof typeof DayName]
    const timeEnum = Time[time as keyof typeof Time]
    
    if (!dayEnum) throw { code: 400, message: 'Invalid day_name' }
    if (!timeEnum) throw { code: 400, message: 'Invalid time' }

    // Repo : Check if inventory is still not used at the request day & time
    const isUsed = await findUsedScheduleByInventoryIdDayTimeRepo(inventory_id, dayEnum, timeEnum)
    if (isUsed && isUsed.length > 0) throw { code: 409, message: 'Inventory already being used at this specific time' }

    return { dayEnum, timeEnum }
}

export const postCreateUsedScheduleService = async (inventory_id: string, day_name: string, time: string, schedule_note: string, userId: string) => {
    // Repo : Check if inventory exist and based on user ownership
    const isExist = await findInventoryByIdRepo(inventory_id, userId)
    if (!isExist) return null

    // Local service : Validate day & time, and check used inventory
    const { dayEnum, timeEnum } = await validateDayTimeAndCheckUsedInventory(inventory_id, day_name, time)

    // Repo : Create used schedule 
    const usedScheduleNew = await createUsedScheduleRepo(inventory_id, dayEnum, timeEnum, schedule_note)

    // Local service : Find current schedule and send to user
    await showCurrentUsedScheduleService(userId)

    return usedScheduleNew
}

export const putUpdateUsedScheduleByIdService = async (id: string, inventory_id: string, day_name: string, time: string, schedule_note: string, userId: string) => {
    // Repo : Check if used schedule exist and based on user ownership
    const isExist = await findUsedScheduleByIdRepo(id)
    if (!isExist || isExist.inventory.created_by !== userId) return null

    // Repo : Check if inventory exist and based on user ownership
    const isInventoryExist = await findInventoryByIdRepo(inventory_id, userId)
    if (!isInventoryExist) throw { code: 404, message: 'Inventory not found' }

    // Local service : Validate day & time, and check used inventory    
    const { dayEnum, timeEnum } = await validateDayTimeAndCheckUsedInventory(inventory_id, day_name, time)

    // Repo : Update used schedule
    const usedScheduleNew = await updateUsedScheduleByIdRepo(id, inventory_id, dayEnum, timeEnum, schedule_note)

    // Local service : Find current schedule and send to user
    await showCurrentUsedScheduleService(userId)

    return usedScheduleNew
}