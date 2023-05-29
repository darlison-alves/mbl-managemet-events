import Event from "../../domain/entities/event.entity";
import { IEventCreateDTO } from "./dtos/event.dto.interface";

export interface UpdateEventUserCase {
    remove(id: string, event: IEventCreateDTO): Promise<Event>;
}