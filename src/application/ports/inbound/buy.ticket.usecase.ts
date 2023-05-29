import { Order } from "../../domain/entities/order.entity";
import { IBuyDTO } from "./dtos/buy.dto.interface";

export interface BuyTicketEventUserCase {
    buy(event_id: string, payload: IBuyDTO): Promise<Order>;
}