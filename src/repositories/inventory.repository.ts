import { prisma } from '../lib/prisma'

export const findAllInventoryRepo = async (page: number, limit: number, search: string | null, product_category: string | null, product_type: string | null, userId: string) => {
    const skip = (page - 1) * limit
    const whereClause: any = {}

    if (search) {
        whereClause.OR = [
            { product_name: { contains: search } },
            { brand: { contains: search } },
            { recommended_for: { contains: search } },
            {
                inventories: {
                    some: {
                        inventory_note: { contains: search }
                    }
                }
            }
        ]
    }
    if (product_category) whereClause.product_category = product_category
    if (product_type) whereClause.product_type = product_type
    whereClause.is_active = true
    whereClause.inventories = { some: { created_by : userId } }

    const [data, total] = await Promise.all([
        prisma.care_product.findMany({
            select: {
                id: true, product_name: true, brand: true, product_category: true, product_type: true, 
                key_ingredients: true, recommended_for: true, suitable_skin: true, created_at: true,
                inventories: {
                    select: {
                        inventory_note: true,
                        _count: {
                            select: {
                                used_schedules: true,
                            }
                        },
                        used_schedules: {
                            select: {
                                day_name: true, time: true
                            }
                        }
                    }
                }
            },
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                created_at: "desc"
            }
        }),
        prisma.care_product.count({where: whereClause}),
    ])

    return { data, total }
}

export const findRandomInventoryByUserRepo = async (userId: string) => {
    const count = await prisma.inventory.count({
        where: { created_by: userId },
    })
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.inventory.findFirst({
        where: { created_by: userId },
        skip,
        select: { id: true },
    })
}

export const findInventoryByIdRepo = async (id: string, created_by: string) => {
    return prisma.inventory.findUnique({ 
        where: { id, created_by },
    })
}

export const findRandomInventoryWithUsedScheduleByUserRepo = async (userId: string) => {
    const count = await prisma.inventory.count({
        where: { created_by: userId, used_schedules: { some: {} } },
    })
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.inventory.findFirst({
        where: { created_by: userId, used_schedules: { some: {} } },
        skip,
        select: { id: true },
    })
}
