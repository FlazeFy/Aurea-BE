import { fetchScheduleMarkByIdRepo, hardDeleteScheduleMarkByIdRepo } from "../repositories/schedule_mark.repository"

export const hardDeleteScheduleMarkByIdService = async (id: string, created_by: string | null) => {
    // Repo : Find schedule mark by id
    const used_schedule = await fetchScheduleMarkByIdRepo(id)
    if (!used_schedule) {
        return null
    }

    // Repo : Delete schedule mark by id
    await hardDeleteScheduleMarkByIdRepo(id, created_by)

    return used_schedule
}