import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import EventManagerService from "../../../application/services/event-manager.service";
import { TYPES } from "../../configs/types";

@injectable()
export class EventsController {

    constructor(
        @inject(TYPES.EventManagerService) private eventRepository: EventManagerService
    ) { }

    public async findAll(req: Request, res: Response) {
        const events = await this.eventRepository.findAll(req.params.name)
        return res.json(events)
    }
}