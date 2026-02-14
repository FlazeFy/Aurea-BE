import { findAllCareProductRepo, findCareProductByIdRepo, findCareProductByProductNameAndBrandRepo, createCareProductRepo } from "../repositories/care_product.repository"
import { findDictionaryByNameAndTypeRepo } from "../repositories/dictionary.repository"

export const getAllCareProductService = async (page: number, limit: number, search: string | null, product_category: string | null, product_type: string | null) => {
    // Repo : Find all care product
    const res = await findAllCareProductRepo(page, limit, search, product_category, product_type)
    if (!res || res.data.length === 0) return null

    return res
}

export const getCareProductByIdService = async (id: string) => {
    // Repo : Find care product by id
    const res = await findCareProductByIdRepo(id)
    if (!res) return null

    return res
}

export const postCreateCareProductService = async (
    product_name: string, brand: string, product_category: string, product_type: string, ingredients: string[] | undefined, key_ingredients: string[] | undefined, alcohol_free: boolean, 
    fragrance_free: boolean, paraben_free: boolean, recommended_for: string, suitable_skin: string, usage_instruction: string, userId: string | null) => {
    // Validate dictionary
    const isProductCategoryExist = await findDictionaryByNameAndTypeRepo(product_category, 'product_category')
    if (!isProductCategoryExist) throw { code: 400, message: "Product category not found" }

    const isProductTypeExist = await findDictionaryByNameAndTypeRepo(product_type, 'product_type')
    if (!isProductTypeExist) throw { code: 400, message: "Product type not found" }

    // Validate product name avaibility
    const isProductNameUsed = await findCareProductByProductNameAndBrandRepo(product_name, brand)
    if (isProductNameUsed) throw { code: 409, message: "Product name already being used in the same brand" }
    
    // Boolean sanization
    const alcoholFree = alcohol_free === true
    const fragranceFree = fragrance_free === true
    const parabenFree = paraben_free === true

    // Array validation
    if (ingredients && !ingredients.every(i => typeof i === "string")) throw { code: 400, message: "Ingredients must be array of strings" }
    if (key_ingredients && !key_ingredients.every(i => typeof i === "string")) throw { code: 400, message: "Key ingredients must be array of strings" }

    // Repo : Create care product
    const product = await createCareProductRepo(product_name, brand, product_category, product_type, ingredients, key_ingredients, alcoholFree, fragranceFree, parabenFree, recommended_for, suitable_skin, usage_instruction, userId)

    return product
}