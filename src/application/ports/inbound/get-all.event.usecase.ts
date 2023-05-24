import Event from "../../domain/entities/event.entity";

export interface GetAllEventUserCase {
    findAll(name: string): Promise<Event[]>;
}