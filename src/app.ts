import express, { Application } from 'express';
import { Logger } from './adapters/configs/logger';
import { dataSource } from './adapters/persistence/datasource.config';
import router from './adapters/rest/controllers/routes';

function configDependencies(app: Application) {
    app.use("/management-events", router)
}

async function connection() {
    dataSource.initialize()
    .then(db => {
        Logger.info("connected database!")
    })
}

function bootstrap() {
    const app = express();
    configDependencies(app);
    connection()
    app.listen(3000, () => {
        console.log('running 3000');
    });
}
bootstrap();

