import Event from "../../domain/entities/event.entity";

export interface CreateEventUserCase {
    create(event: Event): Promise<Event>;
}