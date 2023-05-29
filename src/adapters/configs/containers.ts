import { Container } from "inversify";
import { BuyTickethandler } from "../../application/handles/buy.ticket.handler";
import EventManagerService from "../../application/services/event-manager.service";
import EventRepository from "../persistence/event.repository";
import OrderRepository from "../persistence/order.repository";
import { EventsController } from "../rest/controllers/events.controller";
import { TYPES } from "./types";

const container = new Container();

container.bind<EventsController>(TYPES.EventsController).to(EventsController);
container.bind<EventRepository>(TYPES.EventRepository).to(EventRepository);
container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepository);
container.bind<EventManagerService>(TYPES.EventManagerService).to(EventManagerService);
container.bind(TYPES.BuyTickethandler).to(BuyTickethandler);

export {
    container
}