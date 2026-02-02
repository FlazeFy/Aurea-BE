import { DayName, Time } from "../generated/prisma/enums"
import { sendEmail } from "../helpers/mailer.helper"
import { findInventoryByIdRepo } from "../repositories/inventory.repository"
import { createUsedScheduleRepo, findUsedScheduleByIdRepo, findUsedScheduleByInventoryIdDayTime, findUsedScheduleByUserIdRepo, hardDeleteUsedScheduleByIdRepo } from "../repositories/used_schedule.repository"
import { findUserByIdRepo } from "../repositories/user.repository"
import { announcementEmailTemplate } from "../templates/announcement.template"

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
    if (isUsed && isUsed.length > 0) throw { code: 409, message: 'Inventory already being used at this specific time' }

    // Repo : Find user for email broadcast
    const user = await findUserByIdRepo(userId)
    if (!user) throw { code: 404, message: 'User not found' } 

    // Repo : Create schedule mark  
    const usedScheduleNew = await createUsedScheduleRepo(inventory_id, dayEnum, timeEnum, schedule_note)

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

    return usedScheduleNew
}