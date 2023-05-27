import { date, number, object, string } from "yup";
import { IEventCreateDTO } from "../../ports/inbound/dtos/event.dto.interface";
import { DateUtils } from "../../utils/date.utils";
import { EventStatusEnum } from "../enums/event.status.enum";

export const createEventSchema = object<IEventCreateDTO>({
    name: string().required(),
    description: string().optional(),
    status: string().oneOf([EventStatusEnum.AVAILABLE, EventStatusEnum.CANCELED]).required(),
    show_date: date().transform(function (value, orinal) {
        if(DateUtils.validateFormat(orinal))
            return value
    }).required("'show_date' allowed format: YYYY-MM-DD"),
    price: number().required().min(1)
});
