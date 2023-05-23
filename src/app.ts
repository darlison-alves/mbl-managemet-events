import express, { Application } from 'express';
import router from './adapters/rest/controllers/routes';

function configDependencies(app: Application) {
    app.use("/management-events", router)
}

function bootstrap() {
    const app = express();
    configDependencies(app);
    app.listen(3000, () => {
        console.log('running 3000');
    });
}
bootstrap();

