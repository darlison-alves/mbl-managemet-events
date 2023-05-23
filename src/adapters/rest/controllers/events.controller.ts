import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class EventsController {

    public async findAll(req: Request, res: Response) {
        return res.json([])
    }
}