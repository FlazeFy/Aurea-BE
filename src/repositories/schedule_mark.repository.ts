import { prisma } from '../lib/prisma'

export const findAllScheduleMarkRepo = async (page: number, limit: number, userId: string | null) => {
    const skip = (page - 1) * limit
  
    const whereClause = userId ? { used_schedule: { inventory: { created_by: userId } } } : undefined
  
    const [data, total] = await Promise.all([
        prisma.schedule_mark.findMany({
            skip,
            take: limit,
            where: whereClause,
            orderBy: { created_at: "desc" },
            select: {
                id: true, created_at: true,
                used_schedule: {
                    select: {
                        day_name: true, time: true, schedule_note: true,
                        inventory: {
                            select: {
                                inventory_note: true, id: true,
                                care_product: {
                                    select: {
                                        product_name: true, product_category: true, product_type: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }),
        prisma.schedule_mark.count({ where: whereClause }),
    ])
  
    return { data, total }
}  

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