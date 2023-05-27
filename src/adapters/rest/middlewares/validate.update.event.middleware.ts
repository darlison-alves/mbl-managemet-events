import { NextFunction, Request, Response } from "express";
import { updateEventSchema } from "../../../application/domain/schemas/update.event.schema";
import { ValidateFieldException } from "../../../application/exceptions/validate.field.exception";
import { Logger } from "../../configs/logger";

export async function validateUpdateEventMiddleware(req: Request, res: Response, next: NextFunction) {
    Logger.info("[middleware]");
    try {
        await updateEventSchema.validate(req.body)    
    } catch (error) {
        Logger.error((error as Error).message)
        next(new ValidateFieldException((error as Error).message));
    }
    next();
}