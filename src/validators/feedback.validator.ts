import { ValidatorSchema } from "../middlewares/validator.middleware";

export const feedbackSchema: ValidatorSchema = {
    feedback_rate: { required: true, min: 1, max: 10 },
    feedback_note: { required: true, max: 255 }
}
