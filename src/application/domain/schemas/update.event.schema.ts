import { date, object, string } from "yup";
import { IEventCreateDTO } from "../../ports/inbound/dtos/event.dto.interface";
import { DateUtils } from "../../utils/date.utils";
import { EventStatusEnum } from "../enums/event.status.enum";

export const updateEventSchema = object<IEventCreateDTO>({
    name: string().optional(),
    description: string().optional(),
    status: string().oneOf([EventStatusEnum.AVAILABLE, EventStatusEnum.CANCELED, EventStatusEnum.SOLD_OFF]).optional(),
    show_date: date().transform(function (value, orinal) {
        console.log('orinal', orinal)
        if(DateUtils.validateFormat(orinal))
            return value
        
        this.required("'show_date' allowed format: YYYY-MM-DD")
    }).optional()
});
