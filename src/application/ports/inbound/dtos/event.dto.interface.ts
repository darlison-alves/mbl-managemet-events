import { EventStatusEnum } from "../../../domain/enums/event.status.enum";

export interface IEventCreateDTO {
    name: string;

    description: string;

    status: EventStatusEnum;

    price: number;

    show_date: Date;
}