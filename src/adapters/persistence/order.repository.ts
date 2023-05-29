import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Order } from "../../application/domain/entities/order.entity";
import { dataSource } from "../configs/datasource.config";

@injectable()
export default class OrderRepository {

    private _repo: Repository<Order>;

    constructor() {
        this._repo = dataSource.getRepository(Order)
    }

    public async findAll() {
        return this._repo.find({ });
    }

    public async save(order: Order) {
        return await this._repo.save(order);
    }

    public async findById(id: string) {
        return this._repo.findOneBy({ id });
    }

}