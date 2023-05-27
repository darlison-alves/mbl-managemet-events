import "reflect-metadata";
import { Router } from "express";
import { container } from "../../configs/containers";
import { TYPES } from "../../configs/types";
import { EventsController } from "./events.controller";
import { validateCreateEventMiddleware } from "../middlewares/validate.create.event.middleware";
import { validateUpdateEventMiddleware } from "../middlewares/validate.update.event.middleware";

const eventsController: EventsController = container.get<EventsController>(TYPES.EventsController)

const router = Router();

router.get('/', (req, res) => eventsController.findAll(req, res));
router.post('/', validateCreateEventMiddleware, (req, res, next) => eventsController.create(req, res, next));
router.patch('/:id', validateUpdateEventMiddleware, (req, res, next) => eventsController.update(req, res, next));

export default router;