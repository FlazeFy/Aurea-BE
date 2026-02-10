import { findAllCareProductRepo } from "../repositories/care_product.repository"

export const getAllCareProductService = async (page: number, limit: number, search: string | null, product_category: string | null, product_type: string | null) => {
    // Repo : Find all care product
    const res = await findAllCareProductRepo(page, limit, search, product_category, product_type)
    if (!res || res.data.length === 0) return null

    return res
}