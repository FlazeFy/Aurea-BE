import { ValidatorSchema } from "../middlewares/validator.middleware"

export const dictionarySchema: ValidatorSchema = {
    dictionary_name: { required: true, max: 36 },
    dictionary_type: { required: true, max: 36, alloweds: ["gender"] },
}