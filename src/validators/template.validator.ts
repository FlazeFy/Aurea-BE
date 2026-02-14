import { ParamValidatorSchema } from "../middlewares/validator.middleware";

export const templateIdParamSchema: ParamValidatorSchema = {
    id: { required: true, min: 36, max: 36 }
}

export const templateProductIdParamSchema: ParamValidatorSchema = {
    product_id: { required: true, min: 36, max: 36 }
}
