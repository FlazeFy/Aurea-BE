import { exportToCSV } from "../helpers/converter.helper"
import { sendEmail } from "../helpers/mailer.helper"
import { findCareProductByIdRepo } from "../repositories/care_product.repository"
import { createInventoryRepo, findAllInventoryExportRepo, findAllInventoryRepo, findInventoryByIdRepo, hardDeleteInventoryByIdRepo, updateInventoryByIdRepo } from "../repositories/inventory.repository"
import { hardDeleteUsedScheduleByInventoryIdRepo } from "../repositories/used_schedule.repository"
import { findUserByIdRepo } from "../repositories/user.repository"
import { createInventoryEmailTemplate } from "../templates/create_inventory.template"

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

export const exportAllInventoryService = async (userId: string) => {
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

export const postCreateInventoryService = async (productId: string, qty: number | null, inventory_note: string | null, userId: string) => {
    // Validate : Check if care product exist
    const product = await findCareProductByIdRepo(productId)
    if (!product) throw { code: 404, message: 'Care product not found' }

    // Repo : Create inventory
    const inventory = await createInventoryRepo(productId, qty ?? 1, inventory_note, userId)

    // Repo : Find user for email broadcast
    const user = await findUserByIdRepo(userId)
    if (!user) throw { code: 404, message: 'User not found' } 
    
    // Broadcast email
    await sendEmail(
        user.email, "New Inventory added!",
        createInventoryEmailTemplate(user.username, product.product_name, product.brand, product.product_category, product.product_type, inventory.qty, inventory.inventory_note)
    )

    return inventory
}

export const putUpdateInventoryByIdService = async (id: string, qty: number, inventory_note: string | null, userId: string) => {
    // Validate : Check if inventory exist
    const isExist = await findInventoryByIdRepo(id, userId)
    if (!isExist) throw { code: 404, message: 'Inventory not found' }

    // Repo : Update inventory by id
    return await updateInventoryByIdRepo(id, qty, inventory_note, userId)
}