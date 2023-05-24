
import { inject, injectable } from "inversify";
import { TYPES } from "../../adapters/configs/types";
import EventRepository from "../../adapters/persistence/event.repository";
import Event from "../domain/entities/event.entity";
import { CreateEventUserCase } from "../ports/inbound/create.event.usecase";
import { GetAllEventUserCase } from "../ports/inbound/get-all.event.usecase";

@injectable()
export default class EventManagerService implements CreateEventUserCase, GetAllEventUserCase {
    constructor(
        @inject(TYPES.EventRepository) private eventRepository: EventRepository
    ) { }
    

    public async create(event: Event): Promise<Event> {
        return this.eventRepository.save(event);
    }


    public async findAll(name: string): Promise<Event[]> {
        return this.eventRepository.findAll();
    }
}
