import { prisma } from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export const findAllCareProductRepo = async (page: number, limit: number, search: string | null, product_category: string | null, product_type: string | null) => {
    const skip = (page - 1) * limit
    const whereClause: any = {}

    if (search) {
        whereClause.OR = [
            { product_name: { contains: search } },
            { brand: { contains: search } },
            { recommended_for: { contains: search } }
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

export const findCareProductByProductNameAndBrandRepo = async (product_name: string, brand: string) => {
    return prisma.care_product.findFirst({ where: { product_name, brand } })
}

export const createCareProductRepo = async (
    product_name: string, brand: string, product_category: string, product_type: string, ingredients: string[] | undefined, 
    key_ingredients: string[] | undefined, alcohol_free: boolean, fragrance_free: boolean, paraben_free: boolean, recommended_for: string, 
    suitable_skin: string, usage_instruction: string, userId: string | null) => {

    return prisma.care_product.create({
        data: {
            id: uuidv4(), product_name, brand, product_category, product_type, ingredients, key_ingredients, 
            alcohol_free, fragrance_free, paraben_free, recommended_for, suitable_skin, usage_instruction, 
            created_at: new Date(), created_by: userId,
        },
    })
}

export const findCareProductByIdRepo = async (id: string) => {
    return await prisma.care_product.findUnique({
        select: {
            id: true, product_name: true, brand: true, product_category: true, product_type: true, ingredients: true, 
            key_ingredients: true, alcohol_free: true, fragrance_free: true, paraben_free: true, recommended_for: true, suitable_skin: true, 
            created_at: true, updated_at: true, usage_instruction: true,
            comments: {
                select: {
                    user: {
                        select: { username: true }
                    },
                    comment_body: true,
                    created_at: true
                }
            },
            likes: {
                select: {
                    user: {
                        select: { username: true }
                    }
                }
            },
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
        where: { id },
    })
}

export const findRandomCareProductRepo = async () => {
    const count = await prisma.care_product.count()
    if (count === 0) return null

    const skip = Math.floor(Math.random() * count)

    return prisma.care_product.findFirst({skip, select: { id: true },})
}
