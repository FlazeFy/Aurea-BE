import { prisma } from '../lib/prisma'

export const findScheduleMarkByIdRepo = async (id: string) => {
    return prisma.schedule_mark.findUnique({ where: { id } })
}

export const hardDeleteScheduleMarkByIdRepo = async (id: string, created_by: string | null) => {
    return prisma.schedule_mark.deleteMany({
        where: {
            id, ...(created_by !== null && {
                used_schedule: {
                    inventory: {
                        created_by
                    }
                }
            })
        }
    })      
}