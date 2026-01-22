import { findUsedScheduleByIdRepo, hardDeleteUsedScheduleByIdRepo } from "../repositories/used_schedule.repository"

export const hardDeleteUsedScheduleByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find used schedule by id
    const used_schedule = await findUsedScheduleByIdRepo(id)
    if (!used_schedule) {
        return null
    }

    // Repo : Delete used schedule by id
    await hardDeleteUsedScheduleByIdRepo(id, created_by)

    return used_schedule
}