import { dataSource } from "../../../src/adapters/configs/datasource.config";
import EventRepository from "../../../src/adapters/persistence/event.repository";
import OrderRepository from "../../../src/adapters/persistence/order.repository";
import Event from "../../../src/application/domain/entities/event.entity";
import { Order } from "../../../src/application/domain/entities/order.entity";
import { EventStatusEnum } from "../../../src/application/domain/enums/event.status.enum";
import { OrderStatusEnum } from "../../../src/application/domain/enums/order.status.enum";
import { PaymentMethodEnum } from "../../../src/application/domain/enums/payment.method.enum";
import { EventNotAvailable } from "../../../src/application/exceptions/event.not.available.exception";
import { BuyTickethandler } from '../../../src/application/handles/buy.ticket.handler'
import EventManagerService from "../../../src/application/services/event-manager.service";
describe('buy ticket', () => {

    beforeAll(() => {
        dataSource.getRepository = jest.fn().mockReturnValue({
            find: () => ([]),
        });
    });


    test('should buy ticket with credit', async () => {
        const eventRepository = new EventRepository();
        const eventManagerService = new EventManagerService(eventRepository);
        const orderRepository = new OrderRepository();
        const buyTickethandler = new BuyTickethandler(eventManagerService, orderRepository);

        const event = new Event();
        event.id ="12245";
        event.status = EventStatusEnum.AVAILABLE;
        event.show_date = new Date(2023, 10, 12);
        
        jest.spyOn(eventManagerService, "findById").mockResolvedValue(event)
        jest.spyOn(orderRepository, "save").mockImplementation((payload) => {
            expect(payload.event.id).toBe("12245")

            return Promise.resolve(payload)
        })

        const result = await buyTickethandler.buy("12245", {
            customer: {
                email: "teste@tes.com",
                document: "000000000"
            },
            event_id: "111111",
            payment_method: PaymentMethodEnum.CREDIT
        })

        expect(result.status).toEqual(OrderStatusEnum.PAID)
    })

    test('should buy ticket with bankSlip', async () => {
        const eventRepository = new EventRepository();
        const eventManagerService = new EventManagerService(eventRepository);
        const orderRepository = new OrderRepository();
        const buyTickethandler = new BuyTickethandler(eventManagerService, orderRepository);

        const event = new Event();
        event.id ="12245";
        event.status = EventStatusEnum.AVAILABLE;
        event.show_date = new Date(2023, 10, 12);
        
        jest.spyOn(eventManagerService, "findById").mockResolvedValue(event)
        jest.spyOn(orderRepository, "save").mockImplementation((payload) => {
            expect(payload.event.id).toBe("12245")

            return Promise.resolve(payload)
        })

        const result = await buyTickethandler.buy("12245", {
            customer: {
                email: "teste@tes.com",
                document: "000000000"
            },
            event_id: "111111",
            payment_method: PaymentMethodEnum.BOL
        })

        expect(result.status).toEqual(OrderStatusEnum.PENDING)
        expect(result.bank_slip_url).not.toBeNull()
    })


    test('should throw exception because of show_date', async () => {
        const eventRepository = new EventRepository();
        const eventManagerService = new EventManagerService(eventRepository);
        const orderRepository = new OrderRepository();
        const buyTickethandler = new BuyTickethandler(eventManagerService, orderRepository);

        const event = new Event();
        event.id ="12245";
        event.status = EventStatusEnum.AVAILABLE;
        event.show_date = new Date(2022, 10, 12);
        
        jest.spyOn(eventManagerService, "findById").mockResolvedValue(event)
        jest.spyOn(orderRepository, "save").mockImplementation((payload) => {
            expect(payload.event.id).toBe("12245")

            return Promise.resolve(payload)
        })
  

        try {
            await buyTickethandler.buy("12245", {
                customer: {
                    email: "teste@tes.com",
                    document: "000000000"
                },
                event_id: "111111",
                payment_method: PaymentMethodEnum.BOL
            })
        } catch (error) {
            expect(error).toBeInstanceOf(EventNotAvailable);
        }           
    })

    test('should throw exception because was CANCELED', async () => {
        const eventRepository = new EventRepository();
        const eventManagerService = new EventManagerService(eventRepository);
        const orderRepository = new OrderRepository();
        const buyTickethandler = new BuyTickethandler(eventManagerService, orderRepository);

        const event = new Event();
        event.id ="12245";
        event.status = EventStatusEnum.CANCELED;
        event.show_date = new Date(2022, 10, 12);
        
        jest.spyOn(eventManagerService, "findById").mockResolvedValue(event)
        jest.spyOn(orderRepository, "save").mockImplementation((payload) => {
            expect(payload.event.id).toBe("12245")

            return Promise.resolve(payload)
        })
  

        try {
            await buyTickethandler.buy("12245", {
                customer: {
                    email: "teste@tes.com",
                    document: "000000000"
                },
                event_id: "111111",
                payment_method: PaymentMethodEnum.BOL
            })
        } catch (error) {
            expect(error).toBeInstanceOf(EventNotAvailable);
        }           
    })

})