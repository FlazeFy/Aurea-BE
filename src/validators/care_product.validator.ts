import { ValidatorSchema } from "../middlewares/validator.middleware";

export const careProductSchema: ValidatorSchema = {
    product_name: { required: true, max: 255 },
    brand: { required: true, max: 100 },
    product_category: { required: true, max: 36 },
    product_type: { required: true, max: 36 },
    recommended_for: { required: false, max: 255 },
    suitable_skin: { required: false, max: 100 },
    usage_instruction: { required: false, max: 5000 },
    qty: { required: false, min: 1, max: 100 },
    inventory_note: { required: false, max: 255 }
}