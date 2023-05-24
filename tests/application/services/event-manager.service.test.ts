import { dataSource } from '../../../src/adapters/persistence/datasource.config';
import EventRepository from '../../../src/adapters/persistence/event.repository';
import EventManagerService from '../../../src/application/services/event-manager.service';

describe("[event.manager.service]", () => {

    beforeAll(() => {
        dataSource.getRepository = jest.fn().mockReturnValue({
            find: () => ([]),
        });
      });


    test("should return array empty", async() => {
        const eventRepository = new EventRepository();
        const eventManagerService = new EventManagerService(eventRepository);

        const somethingSpy = jest.spyOn(eventRepository, "findAll");

        const result = await eventManagerService.findAll("");

        expect(0).toEqual(result.length)
        expect(somethingSpy).toBeCalled()
    })
})
