import { inject, injectable } from "inversify";
import { TYPES } from "../../adapters/configs/types";
import Event from "../domain/entities/event.entity";
import { BuyTicketEventUserCase } from "../ports/inbound/buy.ticket.usecase";
import EventManagerService from "../services/event-manager.service";
import { IBuyDTO } from "../ports/inbound/dtos/buy.dto.interface";
import { Order } from "../domain/entities/order.entity";
import { EventStatusEnum } from "../domain/enums/event.status.enum";
import { EventNotAvailable } from "../exceptions/event.not.available.exception";
import OrderRepository from "../../adapters/persistence/order.repository";
import { PaymentMethodEnum } from "../domain/enums/payment.method.enum";
import { OrderStatusEnum } from "../domain/enums/order.status.enum";

@injectable()
export class BuyTickethandler implements BuyTicketEventUserCase {

    constructor(
        @inject(TYPES.EventManagerService) private eventManagerService: EventManagerService,
        @inject(TYPES.OrderRepository) private orderRepository: OrderRepository
    ) { }

    async buy(event_id: string, payload: IBuyDTO): Promise<Order> {
        const event = await this.eventManagerService.findById(event_id);
        this.availabilityCheck(event);
        const order = Order.of(event, payload);

        this.defineMethodPay(order, payload);

        return this.orderRepository.save(order);
    }

    private defineMethodPay(order: Order, payload: IBuyDTO) {
        if(payload.payment_method === PaymentMethodEnum.BOL) {
            order.status = OrderStatusEnum.PENDING;
            order.bank_slip_url = "https://url_fake_boleto"
        }
    }

    private availabilityCheck(event: Event): void {
        if(event.status !== EventStatusEnum.AVAILABLE || event.show_date < new Date())
            throw new EventNotAvailable()
    }    

}