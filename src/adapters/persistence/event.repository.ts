import { injectable } from "inversify";
import { Repository } from "typeorm";
import Event from "../../application/domain/entities/event.entity";
import { dataSource } from "./datasource.config";

@injectable()
export default class EventRepository {

    private _repo: Repository<Event>;

    constructor() {
        this._repo = dataSource.getRepository(Event)
    }

    public async findAll() {
        return this._repo.find({ });
    }

    public async save(event: Event) {
        return this._repo.save(event);
    }

    public async findById(id: string) {
        return this._repo.findOneBy({ id });
    }

}