import { dataSource } from '../../../src/adapters/persistence/datasource.config';
import EventRepository from '../../../src/adapters/persistence/event.repository';
import Event from '../../../src/application/domain/entities/event.entity';
import EventManagerService from '../../../src/application/services/event-manager.service';

const EVENT_MOCK_ID = "1111111";

describe("[event.manager.service]", () => {

    beforeAll(() => {
        dataSource.getRepository = jest.fn().mockReturnValue({
            find: () => ([]),
        });
    });


    test("should return array empty", async () => {
        const eventRepository = new EventRepository();
        const eventManagerService = new EventManagerService(eventRepository);

        const somethingSpy = jest.spyOn(eventRepository, "findAll");

        const result = await eventManagerService.findAll("");

        expect(0).toEqual(result.length)
        expect(somethingSpy).toBeCalled()
    })

    test("should create event with success", async () => {
        const event = new Event();

        event.description = "duwidgwiudgw ddwd";
        event.name = "duwhdiuwhiuwgd";

        dataSource.getRepository = jest.fn().mockReturnValue({
            save: (payload: Event) => {
                expect(event).toMatchObject(payload);
                payload.id = EVENT_MOCK_ID;
                return payload
            }
        });

        const eventRepository = new EventRepository();
        const eventManagerService = new EventManagerService(eventRepository);

        const result = await eventManagerService.create(event)

        expect(EVENT_MOCK_ID).toEqual(result.id);
    })

    test("should update event with success", async () => {
        const event = new Event();
        event.id = EVENT_MOCK_ID
        event.description = "duwidgwiudgw ddwd";
        event.name = "duwhdiuwhiuwgd";

        dataSource.getRepository = jest.fn().mockReturnValue({
            save: (payload: Event) => {
                expect(event.description).toEqual("Muitos shows");
                return payload
            },
            findOneBy(payload: any) {
                expect(EVENT_MOCK_ID).toEqual(payload.id);
                return event
            }
            
        });

        const eventRepository = new EventRepository();
        const eventManagerService = new EventManagerService(eventRepository);

        const result = await eventManagerService.update(EVENT_MOCK_ID, { description: "Muitos shows" })

        expect(EVENT_MOCK_ID).toEqual(result.id);
    })
    
})
