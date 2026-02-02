import { ValidatorSchema } from "../middlewares/validator.middleware";

export const scheduleMarkSchema: ValidatorSchema = {
    used_schedule_id: { required: true, min: 36, max: 36 },
}
