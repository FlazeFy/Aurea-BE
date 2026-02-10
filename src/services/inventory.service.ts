import { findAllInventoryRepo, findInventoryByIdRepo, hardDeleteInventoryByIdRepo } from "../repositories/inventory.repository"
import { hardDeleteUsedScheduleByInventoryIdRepo } from "../repositories/used_schedule.repository"

export const getAllInventoryService = async (page: number, limit: number, search: string | null, product_category: string | null, product_type: string | null, userId: string) => {
    // Repo : Find all inventory
    const res = await findAllInventoryRepo(page, limit, search, product_category, product_type, userId)
    if (!res || res.data.length === 0) return null

    return res
}

export const hardDeleteInventoryByIdService = async (id: string, created_by: string) => {
    // Repo : Find inventory by id
    const inventory = await findInventoryByIdRepo(id, created_by)
    if (!inventory) return null

    // Repo : Delete used schedule by inventory id
    await hardDeleteUsedScheduleByInventoryIdRepo(id, created_by)

    // Repo : Delete inventory by id
    await hardDeleteInventoryByIdRepo(id, created_by)

    return inventory
}