import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm"

export const options: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    entities: [
        `src/application/domain/entities/*.{ts,js}`
    ],
    migrations: [
        "src/migrations/**/*.ts"
    ],
    logging: true,
    synchronize: false,
    poolErrorHandler(err) {
        console.log('[ERROR]', err)
    }
}

export const dataSource = new DataSource(options)
