import "reflect-metadata";
import { Router } from "express";
import { container } from "../../configs/containers";
import { TYPES } from "../../configs/types";
import { EventsController } from "./events.controller";

const eventsController: EventsController = container.get<EventsController>(TYPES.EventsController)

const router = Router();

router.get('/', (req, res) => eventsController.findAll(req, res));

export default router;