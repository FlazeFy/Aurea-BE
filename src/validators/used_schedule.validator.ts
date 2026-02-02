import { ValidatorSchema } from "../middlewares/validator.middleware";

export const usedScheduleSchema: ValidatorSchema = {
    inventory_id: { required: true, min: 36, max: 36 },
    day_name: { required: true },
    time: { required: true },
    schedule_note: { required: false, max: 255 }  
}
