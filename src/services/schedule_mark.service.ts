import { findAllScheduleMarkRepo, findScheduleMarkByIdRepo, hardDeleteScheduleMarkByIdRepo } from "../repositories/schedule_mark.repository"

export const getAllScheduleMarkService = async (page: number, limit: number, userId: string | null) => {
    // Repo : Find all schedule mark
    const res = await findAllScheduleMarkRepo(page, limit, userId)
    if (!res || res.data.length === 0) {
        return null
    }

    return res
}

export const hardDeleteScheduleMarkByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find schedule mark by id
    const used_schedule = await findScheduleMarkByIdRepo(id)
    if (!used_schedule) {
        return null
    }

    // Repo : Delete schedule mark by id
    await hardDeleteScheduleMarkByIdRepo(id, created_by)

    return used_schedule
}