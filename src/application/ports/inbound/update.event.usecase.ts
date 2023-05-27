import Event from "../../domain/entities/event.entity";
import { IEventCreateDTO } from "./dtos/event.dto.interface";

export interface UpdateEventUserCase {
    update(id: string, event: IEventCreateDTO): Promise<Event>;
}