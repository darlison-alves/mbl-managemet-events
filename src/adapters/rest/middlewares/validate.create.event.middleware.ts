import { NextFunction, Request, Response } from "express";
import { createEventSchema } from "../../../application/domain/schemas/create.event.schema";
import { ValidateFieldException } from "../../../application/exceptions/validate.field.exception";
import { Logger } from "../../configs/logger";

export async function validateCreateEventMiddleware(req: Request, res: Response, next: NextFunction) {
    Logger.info("[middleware]");
    try {
        await createEventSchema.validate(req.body)    
    } catch (error) {
        Logger.error((error as Error).message)
        next(new ValidateFieldException((error as Error).message));
    }
    next();
}