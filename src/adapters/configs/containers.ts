import { Container } from "inversify";
import EventManagerService from "../../application/services/event-manager.service";
import EventRepository from "../persistence/event.repository";
import { EventsController } from "../rest/controllers/events.controller";
import { TYPES } from "./types";

const container = new Container();

container.bind<EventsController>(TYPES.EventsController).to(EventsController);
container.bind<EventRepository>(TYPES.EventRepository).to(EventRepository);
container.bind<EventManagerService>(TYPES.EventManagerService).to(EventManagerService);

export {
    container
}