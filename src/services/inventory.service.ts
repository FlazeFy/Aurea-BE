import { findAllInventoryRepo } from "../repositories/inventory.repository"

export const getAllInventoryService = async (page: number, limit: number, search: string | null, product_category: string | null, product_type: string | null, userId: string) => {
    // Repo : Find all inventory
    const res = await findAllInventoryRepo(page, limit, search, product_category, product_type, userId)
    if (!res || res.data.length === 0) return null

    return res
}