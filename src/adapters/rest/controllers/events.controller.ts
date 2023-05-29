import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BuyTickethandler } from "../../../application/handles/buy.ticket.handler";
import EventManagerService from "../../../application/services/event-manager.service";
import { Logger } from "../../configs/logger";
import { TYPES } from "../../configs/types";

@injectable()
export class EventsController {

    constructor(
        @inject(TYPES.EventManagerService) private eventManagerService: EventManagerService,
        @inject(TYPES.BuyTickethandler) private buyTickethandler: BuyTickethandler
    ) { }

    public async findAll(req: Request, res: Response) {
        const events = await this.eventManagerService.findAll(req.params.name)
        return res.json(events)
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const event = await this.eventManagerService.create(req.body);
            return res.json(event)
        } catch (error) {
            Logger.info((error as Error).message)
            next(error)
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const event = await this.eventManagerService.update(req.params.id, req.body);
            return res.json(event)
        } catch (error) {
            Logger.info((error as Error).message)
            next(error)
        }
    }

    public async buyTicket(req: Request, res: Response, next: NextFunction) {
        try {
            const order = await this.buyTickethandler.buy(req.params.id, req.body);
            return res.json(order);
        } catch (error) {
            Logger.info((error as Error).message)
            next(error)
        }
    }
}