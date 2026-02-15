import { ValidatorSchema } from "../middlewares/validator.middleware";

export const commentSchema: ValidatorSchema = {
    care_product_id: { required: true, min: 36, max: 36 },
    comment_body: { required: true, max: 500 },
}