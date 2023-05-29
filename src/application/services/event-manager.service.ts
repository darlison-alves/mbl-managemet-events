
import { inject, injectable } from "inversify";
import { TYPES } from "../../adapters/configs/types";
import EventRepository from "../../adapters/persistence/event.repository";
import Event from "../domain/entities/event.entity";
import { NotFoundEntityException } from "../exceptions/notfound.exception";
import { CreateEventUserCase } from "../ports/inbound/create.event.usecase";
import { IEventCreateDTO } from "../ports/inbound/dtos/event.dto.interface";
import { GetAllEventUserCase } from "../ports/inbound/get-all.event.usecase";
import { UpdateEventUserCase } from "../ports/inbound/update.event.usecase";


@injectable()
export default class EventManagerService implements CreateEventUserCase, GetAllEventUserCase, UpdateEventUserCase {
    constructor(
        @inject(TYPES.EventRepository) private eventRepository: EventRepository
    ) { }

    public async create(event: Event): Promise<Event> {
        return this.eventRepository.save(event);
    }

    public async findAll(name: string): Promise<Event[]> {
        return this.eventRepository.findAll();
    }

    public async update(id: string, payload: IEventCreateDTO): Promise<Event> {
        
        const event = await this.findById(id);

        event.name = payload.name || event.name;
        event.description = payload.description || event.description;
        event.show_date = payload.show_date || event.show_date;
        event.status = payload.status  || event.status;

        event.updated_at = new Date()
        return this.eventRepository.save(event)
    }

    public async findById(id: string): Promise<Event> {
        const event = await this.eventRepository.findById(id)
        if (!event) throw new NotFoundEntityException("Not found Event")
        return event;
    }
}
