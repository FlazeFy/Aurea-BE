import { ValidatorSchema } from "../middlewares/validator.middleware";

export const inventorySchema: ValidatorSchema = {
    care_product_id: { required: true, min: 36, max: 36 },
    qty: { required: true, min: 1, max: 100 },
    inventory_note: { required: false, max: 255 }
}