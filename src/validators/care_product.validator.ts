import { ValidatorSchema } from "../middlewares/validator.middleware";

export const careProductSchema: ValidatorSchema = {
    product_name: { required: true, min: 1, max: 255 },
    brand: { required: true, min: 1, max: 100 },
    product_category: { required: true, min: 1, max: 36 },
    product_type: { required: true, min: 1, max: 36 },
    recommended_for: { required: false, min: 1, max: 255 },
    suitable_skin: { required: false, min: 1, max: 100 },
    usage_instruction: { required: false, min: 1, max: 5000 }
}