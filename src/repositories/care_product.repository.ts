import { prisma } from '../lib/prisma'

export const findAllCareProductRepo = async (page: number, limit: number, search: string | null, product_category: string | null, product_type: string | null) => {
    const skip = (page - 1) * limit
    const whereClause: any = {}

    if (search) {
        whereClause.OR = [
            { product_name: { contains: search, mode: "insensitive" } },
            { brand: { contains: search, mode: "insensitive" } },
            { ingredients: { contains: search, mode: "insensitive" } },
            { key_ingredients: { contains: search, mode: "insensitive" } },
            { recommended_for: { contains: search, mode: "insensitive" } }
        ]
    }
    if (product_category) whereClause.product_category = product_category
    if (product_type) whereClause.product_type = product_type
    whereClause.is_active = true

    const [data, total] = await Promise.all([
        prisma.care_product.findMany({
            select: {
                id: true, product_name: true, brand: true, product_category: true, product_type: true, 
                key_ingredients: true, recommended_for: true, suitable_skin: true, created_at: true,
                creator: {
                    select: {
                        username: true, id: true
                    }
                },
                _count: { 
                    select: { 
                        inventories: true, 
                        comments: true, 
                        likes: true 
                    } 
                }
            },
            where: whereClause,
            skip,
            take: limit,
            orderBy: [
                { inventories: { _count: "desc" } },
                { likes: { _count: "desc" } },
                { created_at: "desc" }
            ]
        }),
        prisma.care_product.count({where: whereClause}),
    ])

    return { data, total }
}

export const findRandomCareProductRepo = async () => {
    const count = await prisma.care_product.count()
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.care_product.findFirst({skip, select: { id: true },})
}
