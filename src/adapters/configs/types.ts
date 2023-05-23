import { EventsController } from "../rest/controllers/events.controller";

export const TYPES = {
    EventsController: Symbol.for(EventsController.name)
}