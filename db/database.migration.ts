import { DataSource } from "typeorm";
import { options } from "../src/adapters/configs/datasource.config";

const opt = {
    ...options,
    migrations: [
        `db/migrations/**/*.ts`
    ]
}    

export const dataSource = new DataSource(opt)