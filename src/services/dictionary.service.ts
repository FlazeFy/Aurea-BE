import { createDictionaryRepo, deleteDictionaryByIdRepo, findAllDictionaryRepo, findDictionaryByIdRepo, findDictionaryByNameAndTypeRepo } from "../repositories/dictionary.repository"

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

export const postCreateDictionaryService = async (dictionary_name: string, dictionary_type: string) => {
    // Repo : Find dictionary by dictionary name and dictionary type
    const isExist = await findDictionaryByNameAndTypeRepo(dictionary_name, dictionary_type)
    if (isExist) throw { code: 409, message: 'Dictionary is already exist' }
    
    // Repo : Create dictionary
    return await createDictionaryRepo(dictionary_name, dictionary_type)
}