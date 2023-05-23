import { Container } from "inversify";
import { EventsController } from "../rest/controllers/events.controller";
import { TYPES } from "./types";

const container = new Container();

container.bind<EventsController>(TYPES.EventsController).to(EventsController);

export {
    container
}