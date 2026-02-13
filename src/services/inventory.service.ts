import { exportToCSV } from "../helpers/converter.helper"
import { findAllInventoryExportRepo, findAllInventoryRepo, findInventoryByIdRepo, hardDeleteInventoryByIdRepo } from "../repositories/inventory.repository"
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

export const  exportAllInventoryService = async (userId: string) => {
    // Repo : Find all inventory
    const res = await findAllInventoryExportRepo(userId)
    if (!res || res.length === 0) return null

    // Remap for nested object
    const mapped = res.map(item => ({
        product_name: item.care_product.product_name,
        product_category: item.care_product.product_category,
        product_type: item.care_product.product_type,
        brand: item.care_product.brand,
        qty: item.qty,
        inventory_note: item.inventory_note, 
        created_at: item.created_at
    }))

    // Dataset headers
    const fields = ['product_name', 'product_category', 'product_type', 'brand', 'qty', 'inventory_note', 'created_at']

    return exportToCSV(mapped, fields)
}