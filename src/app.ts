import bodyParser from 'body-parser';
import express, { Application } from 'express';
import swaggerUi from "swagger-ui-express";

import { Logger } from './adapters/configs/logger';
import { dataSource } from './adapters/configs/datasource.config';
import router from './adapters/rest/controllers/routes';
import errorMiddleware from './adapters/rest/middlewares/error.middleware';
import morgan from 'morgan';

function configDependencies(app: Application) {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use("/event-management", router);
    app.use(errorMiddleware);

    app.use(morgan("tiny"))
    app.use(express.static("public"))

    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
          swaggerOptions: {
            url: "/swagger.json",
          },
        })
      );
}

async function connection() {
    return dataSource.initialize();
}

function bootstrap() {
    const app = express();
    configDependencies(app);
    connection().then(async db => {
        Logger.info("connected database!")
        app.listen(3000, () => {
            console.log('running 3000');
        });
    })
}
bootstrap();

