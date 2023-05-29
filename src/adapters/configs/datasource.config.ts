import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm"
import Event from '../../application/domain/entities/event.entity';
import { Order } from '../../application/domain/entities/order.entity';

const { DATABASE_HOST = "localhost", DATABASE_PORT = "5432", DATABASE_USER = "postgres", DATABASE_PASSWORD = "root", DATABASE_NAME="postgres" } = process.env;

export const options: DataSourceOptions = {
    type: "postgres",
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT || "5432"),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [
        Event,
        Order
    ],    
    logging: true,
    synchronize: false,
    poolErrorHandler(err: any) {
        console.log('[ERROR]', err)
    }
}

export const dataSource = new DataSource(options)

