import { deleteDictionaryByIdRepo, findAllDictionaryRepo, findDictionaryByIdRepo } from "../repositories/dictionary.repository"

export const getAllDictionaryService = async (page: number, limit: number) => {
    // Repo : Find all dictionary
    const res = await findAllDictionaryRepo(page, limit)
    if (!res || res.data.length === 0) return null

    return res
}

export const hardDeleteDictionaryByIdService = async (id: string) => {
    // Repo : Check if dictionary exist
    const dictionary = await findDictionaryByIdRepo(id)
    if (!dictionary) return null

    // Repo : Delete by id
    await deleteDictionaryByIdRepo(id)

    return dictionary
}