import { ValidatorSchema } from "../middlewares/validator.middleware";
import { ParamValidatorSchema } from "../middlewares/validator.middleware";

export const usedScheduleDayParamSchema: ParamValidatorSchema = {
    day: { required: true, min: 3, max: 3, alloweds: ['sun','mon','tue','wed','thu','fri','sat'] }
}

export const usedScheduleSchema: ValidatorSchema = {
    inventory_id: { required: true, min: 36, max: 36 },
    day_name: { required: true },
    time: { required: true },
    schedule_note: { required: false, max: 255 }  
}
