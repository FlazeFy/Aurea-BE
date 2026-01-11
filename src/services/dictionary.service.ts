import { findAllDictionaryRepo } from "../repositories/dictionary.repository"

export const getAllDictionaryService = async (page: number, limit: number) => {
    // Repo : Find all dictionary
    const res = await findAllDictionaryRepo(page, limit)
    if (!res || res.data.length === 0) {
        return null
    }

    return res
}
